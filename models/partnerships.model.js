var mongoose = require("mongoose");

const partnershipSchema = mongoose.Schema ({
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
  partnershipType: {
    type: String,
    enum: ['Indivisual', 'Business'],
    default: 'Indivisual'
  },
  projectName: {
    type: String,
    required: true
  }
})

var Partnerhsip = mongoose.model("partnerhsip", partnershipSchema);

module.exports = Partnerhsip;

