var mongoose = require('mongoose');

const inqueryType = Object.freeze({
  GENERAL: "General Inquery",
  PARTNERSHIP: "Partnership",
  VOLUNTEER: "Volunteer"
})

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  inquery: {
    type: String,
    enum: ['General Inquery', 'Partnership', 'Volunteer'],
    default: 'General Inquery'
  },
  message: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true,
    maxlength: 10,
  },
})

var Message = mongoose.model('message', contactSchema);
module.exports = Message;


