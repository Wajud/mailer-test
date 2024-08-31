const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

const PORT = 5500;

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

function sendEmail({ email, subject, message }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "wajudkareem757@gmail.com",
        pass: "wdcarpfbyufsdebz",
      },
    });

    const mail_config = {
      from: email,
      to: "kareemwajud@yahoo.com",
      subject,
      html: `
      <p>New Mail From ${email}</p>
      <br/> <br/>
      <p>${message}</p>
      `,
    };

    transporter.sendMail(mail_config, function (err, info) {
      if (err) {
        console.log(err);
        return reject({ message: "An error occurred" });
      }

      return resolve({ message: "Email sent successfully" });
    });
  });
}

app.get("/mailingport", (req, res) => {
  sendEmail(req.query)
    .then((response) => response.send(response.message))
    .catch((err) => res.status(500).send(err.message));
});

app.listen(PORT, () => {
  console.log(`Nodemailer is running on PORT: ${PORT}`);
});
