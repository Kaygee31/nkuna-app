var bcrypt = require("bcrypt");
var crypto = require('crypto');
var jwt = require("jsonwebtoken");
var {registerSchema, loginSchema} = require("../middleware/validationSchema");
var User = require("../models/user.model");
var Token = require("../models/token.model");
var sendEmail = require("../utils/sendEmail");
const Contact = require("../models/pages/contact.model");
const Team = require("../models/pages/team.model");
const Banking = require("../models/pages/banking.model");
const Statement = require("../models/pages/statements.model");

const index = async(req,res,next) => {
  let contact;
  let banking;

  try {
    const contactData = await Contact.find();
    const team = await Team.find();
    const bankingData = await Banking.find();
    const statement = await Statement.find();

    if(contactData) {
      contact = contactData[0];
      banking = bankingData[0];
    }

    // console.log(res.locals);

    if(!res.locals.isAuthenticated) {
      return res.render("pages/index",{contact,team,banking,statement})
    }

    return res.render("pages/index", {
      contact,
      team,
      banking,
      statement,
      loggedin: res.locals.isAuthenticated,
      user: res.locals.user.payload
    })
  } catch (error) {
    console.log(error);
  }
}

const renderRegister = (req,res) => {
  try {
    res.render("pages/register",{
    })
  } catch (error) {
    return res.render("partials/error");
  }
}

const register = async(req,res,next) => {
  let arr = [];

  const user = await User.findOne({email: req.body.email});
  if(user) {
    res.locals.userErr = `${user.email} already exists, try logging in`;
    return res.render('pages/register', {
      warning: res.locals.userErr
    })
  }

  const newUser = new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    admin: 0
  })
  try {
    const {error, value} = registerSchema.validate(req.body,{abortEarly: false});
    if(error){
      error.details.forEach((err) => {
        arr.push(err.message)
      })
      console.log(arr);
      return res.render("pages/register", {
        formErrors: arr
      })
    }

    await newUser.save();
    res.status(200).redirect("/user/login");

  } catch (error) {
    res.render("pages/register", {
      warning: "Something went wrong, please try again later"
    })
  }
}

const renderLogin = (req,res) => {
  try {
    res.render("pages/login");
  } catch (error) {
    res.render("partials/error")
  }
}

const login = async(req,res,next) => {
  let arr = [];
  try {
    const {error, value} = loginSchema.validate(req.body,{abortEarly: false});
    if(error){
      error.details.forEach((err) => {
        arr.push(err.message)
      })
      return res.render("pages/login", {
        formErrors: arr
      })
    }
    const user = await User.findOne({email: req.body.email});
    if(user) {
      const token = jwt.sign({payload: user}, process.env.SECRET_KEY,{
        expiresIn: '10h'
      });
      const comparePassword = bcrypt.compare(req.body.password, user.password);
      if(comparePassword) {
        res.cookie('token',token, {
          httpOnly: true,
          signed: true,
          secure: false
        });
        return res.redirect("/");
      }
      else {
        return res.render('pages/login', {
          warning: 'Password Incorrect'
        })
      }
    }
    return res.render('pages/login', {
      warning: 'User not found, please register'
    })
  }
  catch (error) {
    return res.render('pages/login');
  }
}

const logout = (req,res) => {
  res.clearCookie('token').redirect("/");
}

const renderForgetPassword = async(req,res) => {
  try {
    return res.render("pages/forgot-password.ejs");
  } catch (error) {
    return res.render('partials/error');
  }
}

const forgot_password = async(req,res,next) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if(user) {
      let token = await Token.findOne({userId: user._id})
      let resetToken = crypto.randomBytes(32).toString('hex');
      if(!token) {
        token = await new Token({
          userId: user._id,
          token: resetToken
        }).save();
      }

      const link = `http://localhost:5000/password-reset/${user._id}/${resetToken}`;
      await sendEmail(
          process.env.EMAIL,
          user.email,
          "Password reset",
          {userName: user.name, link},
          `../views/pages/emailResetPassword.ejs`
      );
      return {link};
    }
  } catch (error) {
    return res.render("pages/forgot-password", {
      warning: "Something went wrong, please try again later"
    })
  }
}

const renderPasswordReset = (req,res) => {
  const userId = req.params.userId;
  const resetToken = req.params.token;

  res.render("pages/password-reset",{
    userId: userId,
    token: resetToken
  })
}

const password_reset = async(req,res,next) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send("invalid link or expired");

    const token = Token.findOne({
        userId: user._id,
        token: req.body.token,
    });

    //if (!token) return res.status(400).send("No token available");

    user.password = req.body.password;
    await user.save();
    await token.deleteOne();

    return res.redirect("/user/login");
  } catch (error) {
    return res.render('pages/error')
  }
}

module.exports = {
  index,
  renderRegister,
  register,
  renderLogin,
  login,
  forgot_password,
  password_reset,
  logout,
  renderForgetPassword,
  renderPasswordReset
}

