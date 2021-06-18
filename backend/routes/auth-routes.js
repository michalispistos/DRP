const { Router } = require('express');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const makeSignUpVerificationMiddleware = require('../middleware/verifySignUp');

const secret = process.env.SECRET || "testing";


makeAuthRouter = (db) => {
    const authRouter = Router();

    const User = db.User;

    const verifySignUp = makeSignUpVerificationMiddleware(db);

    authRouter.route('/signup').post(verifySignUp.usernameAndEmailAreUnique, async (req, res) => {
        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: await argon2.hash(req.body.password, {
                type: argon2.argon2id,
            }),
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            bio: req.body.bio,
            degree: req.body.degree,
            degree_level: req.body.degree_level,
            skills: req.body.skills,
            image_filepath: "default.jpeg",
            is_public: req.body.is_public,
            projects: [],
            applications: [],
        }).then(res.send({message: "Registration Successful"})).catch(err => {
            res.status(500).send({message: err.message});
        });
    })

    authRouter.route('/signin').post(async (req, res) => {
        await User.findOne({
            where: {
                username: req.body.username,
            }
        }).then(async user => {
            if (!user) {
                return res.status(404).send({message: "User does not exist"});
            }

            const isPasswordValid = await argon2.verify(user.password, req.body.password, {
                type: argon2.argon2id,
            });

            if (isPasswordValid) {

                const token = jwt.sign({id: user.id}, secret, {
                    expiresIn: 86400,
                });

                return res.status(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    bio: user.bio,
                    degree: user.degree,
                    degree_level: user.degree_level,
                    skills: user.skills,
                    accessToken: token,
                });

            } else {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password",
                });
            } 
        }).catch(err => {
            return res.status(500).send({message: err.message});
        });
    });

    return authRouter;

};

module.exports = makeAuthRouter;