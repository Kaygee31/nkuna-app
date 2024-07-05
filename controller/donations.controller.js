const Donation = require('../models/donations.model');
var {donationSchema} = require('../middleware/validationSchema');
var jwt = require('jsonwebtoken');

const donationsIndex = async(req,res) => {
  const donations = await Donation.find();
  try {
    const token = req.signedCookies.token
    if(token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if(decoded) {
        res.locals.isAuthenticated = true;
        res.locals.user = decoded;
      }
    }
    res.render('pages/admin/Donations/index', {
      donations: donations,
      loggedin: res.locals.isAuthenticated,
      user: res.locals.user.payload
    })
  }
  catch(err) {
    res.render("partials/error", {
      warning: "Something Went Wrong, Please try again later"
    })
  }
}

const renderAddDonation = async(req,res) => {
  try {
    return res.render('pages/admin/Donations/addDonations')
  } catch (error) {
    return res.render('pages/error')
  }
}

const addDonation = async(req,res) => {
  let arr = [];
  try {
    const {error, value} = donationSchema.validate(req.body,{abortEarly: false});
    if(error){
      error.details.forEach((err) => {
        arr.push(err.message)
      })

      return res.render("pages/admin/Donations/addDonations", {
        formErrors: arr
      })
    }

    console.log("Donations here");
    const newDonation = new Donation({
      donorName: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      amount: req.body.amount
    })
    console.log(newDonation);
    await newDonation.save();
    return res.redirect('/admin/donations')
  } catch (error) {
    console.log(error);
    return res.render('pages/admin/Donations/addDonations', {
      warning: "Could not add donation, please try again later"
    })
  }
}

module.exports = {
  donationsIndex,
  renderAddDonation,
  addDonation
}




