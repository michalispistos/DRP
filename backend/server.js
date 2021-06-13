function makeServer(db, port) {
  const express = require('express');
  const cors = require('cors');
  const app = express();
  const multer = require('multer');

  app.use('*', cors());
  app.use(express.json());

  async function initialize_database() {
    try {
      await db.Project.create({
        name:"Healthcare App",
        description:"App to stop obesity",
        leader: "emily",
        members:[{name:"emily",link:"http://www.google.com"},{name:"charles", link:"http://www.google.com"}],
        looking_for:"a computing student to code our app",
        duration:"12 weeks",
        email:"example1@gmail.com",
        tags:["java","obesity","healthcare"],
        image_filepath: "default.jpg",
        amount_to_be_paid: "£0",
        location: "Remote",
      });
      await db.Project.create({
        name: "Local delivery app",
        description:"App where people can volunteer to deliver for local businesses",
        leader: "mark",
        members:[{name: "mark", link:"http://www.google.com"},{name:"carolyn", link:"http://www.google.com"}],
        looking_for:"a business student to help with viability and marketing of app",
        paid:true,
        email: "example2@gmail.com",
        duration:"6 weeks",
        tags:["marketing","delivery","local business"],
        image_filepath: "default.jpg",
        amount_to_be_paid: "£100 a week",
        location: "Imperial College Main Campus",
      });
      await db.Project.create({
        name:"Algorithmic Trading",
        description:"App which allows people with no coding knowledge to do algorithmic trading",
        leader: "bob",
        members:[{name:"bob", link:"http://www.google.com"},{name:"eva", link:"http://www.google.com"}],
        looking_for:"a finance or economics student knowledgable in trading strategies",
        paid:true,
        email: "example3@gmail.com",
        duration:"8 weeks",
        tags:["algorithmic trading","stocks","finances"],
        image_filepath: "default.jpg",
        amount_to_be_paid: "£7 an hour",
        location: "China"
      });
      await db.User.create({
        username: "john123",
        email: "johnappleseed@gmail.com",
        firstname: "john",
        lastname: "appleseed",
        password: "hashedpassword",
        bio: "I am John and this is my bio",
        degree: "Mathematics",
        degree_level: "Msc",
        skills: ["problem-solving", "logic"],
      });
      await db.User.create({
        username: "ianwright",
        email: "ianwright999@gmail.com",
        firstname: "ian",
        lastname: "wright",
        password: "hashedpassword2",
        bio: "I am Ian and this is my bio",
        degree: "Computing",
        degree_level: "BEng",
        skills: ["java", "coding", "web-dev"],
      });
      await db.User.create({
        username: "fiona13",
        email: "fiona@yahoo.com",
        firstname: "fiona",
        lastname: "adeola",
        password: "hashedpassword3",
        bio: "I am Fiona and this is my bio",
        degree: "Business",
        degree_level: "MBA",
        skills: ["marketing", "business"],
      });

    } catch (err) {
      console.log(err.message);
    }
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './images/project');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

  db.sequelize.sync({ force: true }).then(() => {
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

app.get("/users", async(req, res) => {
  try {
    const users = await db.User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (err) {
    console.error(err.message);
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
    const { id, name, description, looking_for, paid, leader, members, tags, duration, email, image_filepath, location, amount_to_be_paid } = req.body;
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

const upload = multer({storage:storage});


app.post('/upload', function (req, res) {
  upload.single('project_picture')(req, res, function (err) {
    if (err) {
      console.log(err.message);
      return
    }
    res.status(200).send("success");
  })
});

app.get('/upload/:filename', function (req, res) {
  const { filename } = req.params;
  const filePath = `./images/project/${filename}`;
  res.sendFile(filePath, { root: __dirname});
});


return app.listen(port, () => {
      console.log(`Server has started on port ${port}`);
  });

}
module.exports = makeServer;