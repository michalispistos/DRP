const { Router } = require("express");
const multer = require("multer");


makeUploadRouter = (db) => {
  const uploadRouter = Router();

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./images/project");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./images/profile");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });


  const upload = multer({ storage: storage });

  const profileUpload = multer({ storage: profileStorage });

  uploadRouter.route("/").post(function (req, res) {
    upload.single("project_picture")(req, res, function (err) {
      if (err) {
        console.log(err.message);
        return;
      }
      res.status(200).send("success");
    });
  });

  uploadRouter.route("/:filename").get(function (req, res) {
    const { filename } = req.params;
    const filePath = `./images/project/${filename}`;
    res.sendFile(filePath, { root: `${__dirname}/../` });
  });

  uploadRouter.route("/profiles").post(function (req, res) {
    profileUpload.single("profile_picture")(req, res, function (err) {
      if (err) {
        console.log(err.message);
        return;
      }
      res.status(200).send("success");
    });
  });

  uploadRouter.route("/profiles/:filename").get(function (req, res) {
    const { filename } = req.params;
    const filePath = `./images/profile/${filename}`;
    res.sendFile(filePath, { root: `${__dirname}/../` });
  });

  return uploadRouter;
};

module.exports = makeUploadRouter;
