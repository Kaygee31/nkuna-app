const Donation = require('../models/donations.model');
var {donationSchema} = require('../middleware/validationSchema');

const donationsIndex = async(req,res) => {
  try {
    const donations = await Donation.find();

    res.render('pages/admin/Donations/index', {
      donations: donations,
      loggedin: res.locals.isAuthenticated,
      user: res.locals.user.payload
    })
  }
  catch(err) {
    console.log(err);
    res.render("partials/error", {
      warning: "Something Went Wrong, Please try again later"
    })
  }
}

const renderAddDonation = async(req,res) => {
  try {
    return res.render('pages/admin/Donations/addDonations',{
      loggedin: res.locals.isAuthenticated,
      user: res.locals.user.payload
    })
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

    const newDonation = new Donation({
      donorName: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      amount: req.body.amount
    })

    await newDonation.save();
    return res.redirect('/admin/donations')
  } catch (error) {
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




