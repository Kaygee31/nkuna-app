var jwt = require('jsonwebtoken');
require('dotenv').config();

const checkAuth = async(req,res,next) => {
  const token = req.signedCookies.token;
  if(!token) {
    res.locals.isAuthenticated = false;
    next();
  }
  if(token) {
    // console.log(token);
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if(decoded) {
        res.locals.isAuthenticated = true;
        res.locals.user = decoded;
        next();
      } else {
        res.locals.isAuthenticated = false;
        next();
      }
    }
    catch(err) {
      next();
    }
  }
}


const isAdmin = async(req,res,next) => {
  let token = req.signedCookies.token;
  if(!token) {
    return res.redirect("/")
  } else {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      if(decoded && decoded.payload.admin === 1) {
        res.locals.isAuthenticated = true;
        res.locals.user = decoded;
        next();
      }

    } catch (error) {
      if(error.name === "TokenExpiredError") {
        res.cookie('token', '', { maxAge: 0 });
        return res.redirect("/")
      } else {
        return res.render("partials/error", {message: "Something went wrong, Please try again later"})
      }
    }
  }
}


module.exports = {
  isAdmin,
  checkAuth
};



