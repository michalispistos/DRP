const { Router } = require('express');

makeUserRouter = (db) => {
    const userRouter = Router();

    userRouter.route('/').get(async (req, res) => {
        try {
          const users = await db.User.findAll(/*{
            attributes: { exclude: ["password"] },
          }*/);
          res.json(users);
        } catch (err) {
          console.error(err.message);
        }
      });

    return userRouter;
}

module.exports = makeUserRouter;