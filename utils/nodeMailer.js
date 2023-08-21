/*{const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "your_email@gmail.com",
    pass: "your_email_password",
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP error:", error);
  } else {
    console.log("SMTP connection is ready");
  }
});

module.exports = transporter;
}*/
