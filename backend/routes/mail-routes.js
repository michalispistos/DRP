var express = require("express");
const nodemailer = require("nodemailer");

makeMailRouter = (db) => {
  (mailRouter = express.Router()),
    (smtpTransport = require("nodemailer-smtp-transport"));

  const email = process.env.EMAIL || "testing";
  const password = process.env.PASSWORD || "testing";

  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: email,
        pass: password,
      },
    })
  );

  mailRouter.post("/send", function (req, res) {
    const {to, subject, message} = req.body;
    const mailOptions = {
      from: email,
      to: to,
      subject: subject,
      html: message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).send("FAILED");
      } else {
        res.send({message: "Email sent: " + info.response});
      }
    });
  });

  return mailRouter;
};

module.exports = makeMailRouter;
