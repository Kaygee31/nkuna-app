const { contactUsSchema } = require('../middleware/validationSchema');
var Message = require('../models/messages.model');
const sendEmail = require('../utils/sendEmail');
require('dotenv').config();

const message = async(req,res) => {
  let arr = [];
  const contactMessage = new Message({
    name: req.body.name,
    surname: req.body.surname,
    contact: req.body.telephone,
    email: req.body.email,
    inquery: req.body.inquery,
    message: req.body.messages
  });

  const {error, value} = contactUsSchema.validate(req.body,{abortEarly: false});
  if(error){
    error.details.forEach((err) => {
      arr.push(err.message)
    })
    return res.json({errorMessage: arr})
  }
  try {
    sendEmail(contactMessage.email,
              process.env.EMAIL,
              contactMessage.inquery,
              contactMessage.message,
              "../views/pages/emailMessageTemplate.ejs"
            );
    await contactMessage.save();
    return res.json({sucess: true})
  } catch (error) {
    res.json({error})
  }

}

const deleteMessage = (id) = async(req,res) => {
  try {
    const deleteMessage = await Message.findByIdAndDelete(req.params.id);
    return res.json({success: true, deleteMessage})
  } catch (error) {
    return res.render('partials/error')
  }
}

module.exports = {message, deleteMessage};
