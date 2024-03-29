function makeServer(db, port) {
  const express = require("express");
  const cors = require("cors");
  const app = express();
  const jwt = require('jsonwebtoken');
  const secret = process.env.SECRET || "testing";
  const makeProjectRouter = require("./routes/project-routes");
  const makeUploadRouter = require("./routes/upload-routes");
  const makeUserRouter = require("./routes/user-routes");
  const makeAuthRouter = require("./routes/auth-routes");
  const makeMetricRouter = require("./routes/metric-routes");
  const makeMailRouter = require("./routes/mail-routes");
  const makeMessageRouter = require("./routes/message-routes");


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

  const messageRouter = makeMessageRouter(db);
  app.use("/messages", messageRouter);

  // START SERVER

  const server = app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
  });

  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("No token provided"));
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return next(new Error(err));
      }
      socket.username = decoded.username;
    });
    next();
  });

  io.on('connection', async (socket) => {
    console.log("A user has connected");

    socket.on('join', room => {
      socket.join(room);
    });
    socket.on('leave', room => {
      socket.leave(room);
    });

    socket.on("private message", ({ content, room, from, to }) => {
      io.sockets.in(room).emit("private message", {content, room, from, to});
      io.sockets.in(to).emit("new chat", from);
    });
  });



  return server;
}

module.exports = makeServer;
