var ejs = require('ejs');
var nodemailer = require('nodemailer');
const path = require("path");
require('dotenv').config();

//console.log(path.join(__dirname, "../views"));

const sendEmail = async(from,email, subject, payload, template) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SMTP_EMAIL,
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.PASS,
      }
    })

    const source = path.join(__dirname, template);
    // console.log(payload);
    const renderView = await ejs.renderFile(source,payload);

    await transporter.sendMail({
      from: from,
      to: email,
      subject: subject,
      // text: {payload.link},
      html: renderView
    });
    return;
  }
  catch(err) {
    res.locals.emailError = "Email not sent"
  }
}

module.exports = sendEmail;
