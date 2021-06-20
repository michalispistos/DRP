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
