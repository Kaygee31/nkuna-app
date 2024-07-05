var jwt = require('jsonwebtoken');
require('dotenv').config();

const protect = async(req,res,next) => {
  let token = req.cookies.token;

  if(!token) {
    return res.send({message: "Not Authorized"})
  } else {
    try {

      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if(!decoded) {
        res.locals.isAuthenticated = false;
        return next();
      }
      res.locals.isAuthenticated = true
      res.locals.user = decoded

      next();
    } catch (error) {
      return res.render('pages/error')
    }
  }
}

const isAdmin = async(req,res,next) => {
  let token = req.signedCookies.token;
  if(!token) {
    return res.send({message: "Token not available"})
  } else {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      if(decoded && decoded.payload.admin === 1) {
        res.locals.isAuthenticated = true
        res.locals.user = decoded;
        next();
      }
      res.locals.isAdminError = "Not Authorized, Admins only";

    } catch (error) {
      return res.render('pages/error')
    }
  }
}


module.exports = {
  protect,
  isAdmin
};



