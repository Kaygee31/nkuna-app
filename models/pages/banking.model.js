var mongoose = require('mongoose');

var bankingPageSchema = mongoose.Schema({
  accountName: {
    type: String,
  },
  accountNumber: {
    type: String,
  },
  bankName: {
    type: String
  },
  reference: {
    type: String,
    required: true
  }
});

var bankingPage = mongoose.model("banking", bankingPageSchema);
module.exports = bankingPage;
