const { Router } = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || "testing";

makeUserRouter = (db) => {
    const userRouter = Router();

    userRouter.route('/').get(async (req, res) => {
        try {
          const users = await db.User.findAll({
            where : {is_public: true},
            attributes: { exclude: ["password"] },
          });
          res.json(users);
        } catch (err) {
          console.error(err.message);
        }
      });

      userRouter.route('/:id').put(async (req, res) => {
        const { id } = req.params;
        const { firstname, lastname, bio, skills, is_public, email, degree, degree_level, project, application } = req.body;
        await db.User.update(
            {projects: Sequelize.fn("array_append", Sequelize.col("projects"),  project),
            applications: Sequelize.fn("array_append", Sequelize.col("applications"),application),
            firstname,
            lastname,
            bio,
            skills,
            is_public,
            email,
            degree,
            degree_level
            },
            {where: {id,}}
        ).then(rowsUpdated => res.json(rowsUpdated)).catch(err => console.log(err));
    
      }).get(authenticateToken, async (req, res) => {
          const { id } = req.params;
          await db.User.findOne({
            where: {
              id, 
            },
            attributes: { exclude: ["password"] },
          }).then(user => res.json(user)).catch(err => console.log(error));
      });

      userRouter.route('/:id/rm-project').put(async (req, res) => {
          const { id } = req.params;
          const { project } = req.body;
          await db.User.update(
            {projects: Sequelize.fn("array_remove", Sequelize.col("projects"), project)},
            {where: {id,}},
          ).then(rowsUpdated=> res.json(rowsUpdated)).catch(err => console.log(err));
      });

      userRouter.route('/username/:username/rm-project').put(async (req, res) => {
        const { username } = req.params;
        const { project } = req.body;
        await db.User.update(
          {projects: Sequelize.fn("array_remove", Sequelize.col("projects"), project)},
          {where: {username,}},
        ).then(rowsUpdated=> res.json(rowsUpdated)).catch(err => console.log(err));
    });

      userRouter.route('/username/:username').put(async (req, res) => {
        const { username } = req.params;
        const { project } = req.body;
        await db.User.update(
          {projects: Sequelize.fn("array_append", Sequelize.col("projects"), project)},
          {where: {username}}
        ).then(rowsUpdated => res.json(rowsUpdated)).catch(err => console.log(err));
      }).get(async (req, res) => {
        const { username } = req.params;
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        const user = await db.User.findOne({
          where: {
            username, 
          },
          attributes: { exclude: ["password"] },
        });
        if (!user) {
          res.status(404).send({message: "User not found!"});
        } else {
          jwt.verify(token, secret, (err, decoded) => {
            if (!user.is_public && (err || req.params.username != decoded.username)) {
                res.status(401).send({
                    message: "Unauthorized! Profile not public.",
                });
            } else {
              res.json(user);
            }
          });
        }
      });

    return userRouter;
}

module.exports = makeUserRouter;