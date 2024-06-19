const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const { SMTP_HOST, SMTP_PORT, MAIL_USER, MAIL_PASSWORD } = process.env;

async function sendMail({ from, to, subject, text, html }) {
  let transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false, // false for TLS - as you are using port 587
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: `FileNexa <${from}>`,
    to: to,
    subject: subject,
    text: text,
    html: html,
  });
  console.log(info);
}

module.exports = sendMail;
