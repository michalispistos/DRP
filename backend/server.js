function makeServer(db, port) {
  const express = require("express");
  const cors = require("cors");
  const app = express();
  const makeProjectRouter = require("./routes/project-routes");
  const makeUploadRouter = require("./routes/upload-routes");
  const makeUserRouter = require("./routes/user-routes");
  const makeAuthRouter = require("./routes/auth-routes");
  const makeMetricRouter = require("./routes/metric-routes");
  const makeMailRouter = require("./routes/mail-routes");


  // MIDDLEWARE

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended:true }));

  async function initialize_database() {
    try {
      await db.Project.create({
        name: "Healthcare App",
        description: "App to stop obesity",
        leader: "emily",
        members: [
          { name: "emily", link: "http://www.google.com" },
          { name: "charles", link: "http://www.google.com" },
        ],
        looking_for: "a computing student to code our app",
        duration: "12 weeks",
        email: "example1@gmail.com",
        tags: ["java", "obesity", "healthcare"],
        image_filepath: "default.jpg",
        amount_to_be_paid: "£0",
        location: "Remote",
      });
      await db.Project.create({
        name: "Local delivery app",
        description:
          "App where people can volunteer to deliver for local businesses",
        leader: "mark",
        members: [
          { name: "mark", link: "http://www.google.com" },
          { name: "carolyn", link: "http://www.google.com" },
        ],
        looking_for:
          "a business student to help with viability and marketing of app",
        paid: true,
        email: "example2@gmail.com",
        duration: "6 weeks",
        tags: ["marketing", "delivery", "local business"],
        image_filepath: "default.jpg",
        amount_to_be_paid: "£100 a week",
        location: "Imperial College Main Campus",
      });
      await db.Project.create({
        name: "Algorithmic Trading",
        description:
          "App which allows people with no coding knowledge to do algorithmic trading",
        leader: "bob",
        members: [
          { name: "bob", link: "http://www.google.com" },
          { name: "eva", link: "http://www.google.com" },
        ],
        looking_for:
          "a finance or economics student knowledgable in trading strategies",
        paid: true,
        email: "example3@gmail.com",
        duration: "8 weeks",
        tags: ["algorithmic trading", "stocks", "finances"],
        image_filepath: "default.jpg",
        amount_to_be_paid: "£7 an hour",
        location: "China",
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  db.models.sync().then(() => {
    console.log("resynced database");
  });

  //ROUTES

  const projectRouter = makeProjectRouter(db);
  app.use("/projects", projectRouter);

  const uploadRouter = makeUploadRouter(db);
  app.use("/upload", uploadRouter);

  const userRouter = makeUserRouter(db);
  app.use("/users", userRouter); 


  const authRouter = makeAuthRouter(db);
  app.use("/auth", authRouter);

  const metricRouter = makeMetricRouter(db);
  app.use("/metrics", metricRouter);

  const mailRouter = makeMailRouter(db);
  app.use("/mail", mailRouter);

  // START SERVER

  return app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
  });
}

module.exports = makeServer;
