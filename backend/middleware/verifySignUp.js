makeSignUpVerificationMiddleware = (db) => {
    usernameAndEmailAreUnique = async (req, res, next) => {
        const User = db.User;
        
        await User.findOne({
            where: {
                username: req.body.username,
            },
        }).then(async user => {
            if (user) {
                res.status(400).send({
                    message: "Failed! Username is already in use!",
                });
                return;
            }
            await User.findOne({
                where: {
                    email: req.body.email,
                },
            }).then(user => {
                if (user) {
                    res.status(400).send({
                        message: "Failed! Email is already in use!",
                    });
                    return;
                }
                next();
            });
        });
    };

    return { usernameAndEmailAreUnique };
}

module.exports = makeSignUpVerificationMiddleware;