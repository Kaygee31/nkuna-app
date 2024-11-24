var mongoose = require('mongoose');

var contactPageSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  }
});

var contactPage = mongoose.model("contacts", contactPageSchema);
module.exports = contactPage;
