var User = require("../models/user.model");
var jwt = require('jsonwebtoken');

const adminUserIndex = async(req,res) => {
  try {
    const users = await User.find();
    return res.render("pages/admin/Users/index", {
      users: users,
      loggedin: res.locals.isAuthenticated,
      user: res.locals.user.payload
    })
  } catch (error) {
    console.log(error);
  }
}

const deleteUser = async(req,res) => {
  const {id} = req.params;
  return await User.findByIdAndDelete(id);
}

module.exports = {
  adminUserIndex,
  deleteUser
}
