var mongoose = require('mongoose');

const volunteerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contact: {
    type: String
  },
})

const Volunteer = mongoose.model('volunteer', volunteerSchema);

module.exports = Volunteer;

