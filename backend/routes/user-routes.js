const { Router } = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const Sequelize = require('sequelize');

makeUserRouter = (db) => {
    const userRouter = Router();

    userRouter.route('/').get(async (req, res) => {
        try {
          const users = await db.User.findAll({attributes: { exclude: ["password"] },});
          res.json(users);
        } catch (err) {
          console.error(err.message);
        }
      });

      userRouter.route('/:id').put(async (req, res) => {
        const { id } = req.params;
        const { project } = req.body;
        await db.User.update(
            {projects: Sequelize.fn("array_append", Sequelize.col("projects"),  project)},
            {where: {id,}}
        ).then(rowsUpdated => res.json(rowsUpdated)).catch(err => console.log(err));
    
      }).get(authenticateToken, async (req, res) => {
          const { id } = req.params;
          await db.User.findOne({
            where: {
              id,
            }
          }).then(user => {
            res.json(user.projects);
          }).catch(err => console.log(error));
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
      });

    return userRouter;
}

module.exports = makeUserRouter;