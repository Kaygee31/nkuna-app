var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var Message = require("../models/messages.model");
var User = require("../models/user.model");
var {loginSchema, registerSchema} = require("../middleware/validationSchema");
require('dotenv').config();

const adminIndex = async (req,res) => {
  try {
    const messages = await Message.find();

    if(res.locals.isAuthenticated !== "undefined" && res.locals.user.payload !== "undefined") {
      return res.render("pages/admin/index", {
        messages: messages,
        loggedin: res.locals.isAuthenticated,
        user: res.locals.user.payload
      })
    }
    return res.render("pages/admin/index");

  } catch (error) {
    return res.render('partials/error')
  }
}

const renderAdminLogin = (req,res) => {
  try {
    return res.render("pages/admin/login");
  } catch (error) {
    return res.render('partials/error')
  }
}

const renderAdminRegister = (req,res) => {
  try {
    return res.render("pages/admin/register");
  } catch (error) {
    return res.render('partials/error')
  }
}

const adminRegister = async(req,res) => {
  let arr = []

  const user = await User.findOne({email: req.body.email});
  if(user) {
    return res.render('pages/admin/register', {
      warning: `${user.email} already exists, try logging in`
    })
  }

  const newUser = new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    admin: 1
  })
  try {
    const {error, value} = registerSchema.validate(req.body,{abortEarly: false});
    if(error){
      error.details.forEach((err) => {
        arr.push(err.message)
      })

      return res.render("pages/admin/register", {
        formErrors: arr
      })
    }

    await newUser.save();
    res.status(200).redirect("/admin/login");

  } catch (error) {
    res.render("pages/register", {
      warning: "Something went wrong, please try again later"
    })
  }
}

const adminLogin = async(req,res) => {
  let arr = [];
  try {
    const {error, value} = loginSchema.validate(req.body,{abortEarly: false});
    if(error){
      error.details.forEach((err) => {
        arr.push(err.message)
      })

      return res.render("pages/admin/login", {
        formErrors: arr
      })
    }
    const user = await User.findOne({email: req.body.email});
    if(user) {
      const token = jwt.sign({payload: user}, process.env.SECRET_KEY,{
        expiresIn: "12h"
      });
      const comparePassword = bcrypt.compare(req.body.password, user.password);
      if(comparePassword) {
        res.cookie('token',token, {
          httpOnly: true,
          signed: true,
          secure: false
        });
        return res.redirect("/admin");
      }
      else {
        return res.render('pages/admin/login', {
          warning: "Password Incorrect"
        })
      }
    }
    return res.render('pages/admin/login', {
      warning: "User not found, "
    })
  }
  catch (error) {
    return res.render('pages/admin/login', {
      danger: "Something went wrong, please try again later"
    })
  }
}

const renderAdminForgetPassword = (req,res) => {
  try {
    return res.render("pages/forgot-password");
  } catch (error) {
    return res.render('partials/error');
  }
}

const renderAdminPasswordReset = (req,res) => {
  try {
    return res.render("pages/reset-password")
  } catch (error) {
    return res.render('partials/error');
  }
}

module.exports = {
  adminIndex,
  adminRegister,
  adminLogin,
  renderAdminRegister,
  renderAdminLogin,
  renderAdminForgetPassword,
  renderAdminPasswordReset,
}
