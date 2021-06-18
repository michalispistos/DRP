const { Router } = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const Sequelize = require('sequelize');

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
        await db.User.findOne({
          where: {
            username, 
          },
          attributes: { exclude: ["password"] },
        }).then(user => {
            if (!user) {
              res.status(404).json({message: "User not found!"});
            } else if (user.is_public) {
              res.json(user);
            } else {
              res.status(404).json({message: "Profile not public!"});
            }
        }).catch(err => console.log(err));
      });

    return userRouter;
}

module.exports = makeUserRouter;