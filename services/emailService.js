const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendMail({ from, to, subject, text, html }) {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: `FileNexa <${from}>`,
    to: to,
    subject: subject,
    text: text,
    html: html
  });
  console.log(info);
}

module.exports = sendMail;
