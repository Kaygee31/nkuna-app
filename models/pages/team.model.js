var mongoose = require('mongoose');

const teamPageSchema = mongoose.Schema({
  position: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
  }
});

var teamPage = mongoose.model("team", teamPageSchema);
module.exports = teamPage;
