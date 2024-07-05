var mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },

  token: {
    type: String
  },

  dateCreated: {
    type: Date,
    default: Date.now,
    expires: 3600
  }
})

var Token = mongoose.model("token",tokenSchema);
module.exports = Token;



