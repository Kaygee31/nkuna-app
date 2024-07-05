var mongoose = require('mongoose');

var donationSchema = mongoose.Schema({
  donorName: {
    type: String,
  },
  email: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
  contact: {
    type: String
  },
  amount: {
    type: Number,
    required: true
  }
});

var Donation = mongoose.model("donations", donationSchema);
module.exports = Donation;
