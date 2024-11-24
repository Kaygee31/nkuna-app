const { required } = require('joi');
var mongoose = require('mongoose');

var statementsPageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  }
});

var statementPage = mongoose.model("statement", statementsPageSchema);
module.exports = statementPage;
