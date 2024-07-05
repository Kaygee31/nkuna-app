var ejs = require('ejs');
var nodemailer = require('nodemailer');
const path = require("path");

//console.log(path.join(__dirname, "../views"));

const sendEmail = async(from,email, subject, payload, template) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      auth: {
        user:"kaygeeklaas@gmail.com",
        pass: "pofj goze zxrb dkal",
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
