const { Router } = require("express");

makeProjectRouter = (db) => {
  const projectRouter = Router();
  
  projectRouter
    .route("/")
    .get(async (req, res) => {
      try {
        const projects = await db.Project.findAll();
        res.json(projects);
      } catch (err) {
        console.error(err.message);
      }
    })
    .post(async (req, res) => {
      try {
        const {
          name,
          description,
          looking_for,
          paid,
          leader,
          members,
          leader_id,
          tags,
          duration,
          email,
          image_filepath,
          location,
          amount_to_be_paid,
        } = req.body;
        const project = await db.Project.create({
          name,
          description,
          looking_for,
          paid,
          leader,
          members,
          leader_id,
          tags,
          duration,
          email,
          image_filepath,
          location,
          amount_to_be_paid,
        });
        res.json(project);
      } catch (err) {
        console.log(err.message);
      }
    });

  // GET A PROJECT
  projectRouter.route("/:id").get(async (req, res) => {
    try {
      const { id } = req.params;
      const project = await db.Project.findOne({
        where: {
          id,
        },
      });
      res.json(project);
    } catch (err) {
      console.error(err.message);
    }
  }).put(async (req, res) => {
    const { id } = req.params;
    const {
      name,
      description,
      looking_for,
      paid,
      leader,
      members,
      tags,
      duration,
      email,
      image_filepath,
      location,
      amount_to_be_paid,
    } = req.body;
    await db.Project.update(
      {
        name,
        description,
        looking_for,
        paid,
        leader,
        members,
        tags,
        duration,
        email,
        image_filepath,
        location,
        amount_to_be_paid,
      },
      {where: {id,},},
    ).then(rowsUpdated => res.json(rowsUpdated)).catch(err => console.log(err));

  });
  return projectRouter;
};

module.exports = makeProjectRouter;
