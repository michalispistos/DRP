function makeServer(db, port) {
  const express = require('express');
  const cors = require('cors');
  const app = express();

  app.use('*', cors());
  app.use(express.json());

  async function initialize_database() {
    try {
      await db.Project.create({
        name:"Healthcare App",
        description:"App to stop obesity",
        leader: "emily",
        members:["emily","charles"],
        looking_for:"a computing student to code our app",
        duration:"12 weeks",
        tags:["java","obesity","healthcare"]
      });
      await db.Project.create({
        name: "Local delivery app",
        description:"App where people can volunteer to deliver for local businesses",
        leader: "mark",
        members:["mark","carolyn"],
        looking_for:"a business student to help with viability and marketing of app",
        paid:true,
        duration:"6 weeks",
        tags:["marketing","delivery","local business"]
      });
      await db.Project.create({
        name:"Algorithmic Trading",
        description:"App which allows people with no coding knowledge to do algorithmic trading",
        leader: "bob",
        members:["bob","eva"],
        looking_for:"a finance or economics student knowledgable in trading strategies",
        paid:true,
        duration:"8 weeks",
        tags:["algorithmic trading","stocks","finances"]
      });

    } catch (err) {
      console.log(err.message);
    }
  }

  db.Project.sync({ force: true }).then(() => {
    console.log('dropped and resynced database');
    initialize_database();
  });

    //ROUTES
  // GET ALL PROJECTS
  app.get("/projects", async (req, res) => {
    try {
        const projects = await db.Project.findAll();
        res.json(projects);
    } catch (err) {
        console.error(err.message)
    }
});

// GET A PROJECT 
app.get("/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const project = await db.Project.findOne({
        where: {
          id,
        }
      });
      res.json(project);
    } catch (err) {
      console.error(err.message);
    }
  });

app.post("/projects", async (req, res) => {
  try {
    const { id, name, description, looking_for, paid, leader, members, tags, duration } = req.body;
    const project = await db.Project.create({
      id,
      name,
      description,
      looking_for,
      paid,
      leader, 
      members,
      tags,
      duration,
    });
    res.json(project);

  } catch (err) {
    console.log(err.message);
  }
});


  return app.listen(port, () => {
      console.log(`Server has started on port ${port}`);
  });
}

module.exports = makeServer;