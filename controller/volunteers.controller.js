var Volunteers = require('../models/volunteer.model');
var jwt = require('jsonwebtoken');

const volunteerIndex = async(req,res) => {
  try {
    const volunteers = await Volunteers.find();
    // const token = req.signedCookies.token
    // if(token) {
    //   const decoded = jwt.verify(token, process.env.SECRET_KEY);
    //   if(decoded) {
    //     res.locals.isAuthenticated = true;
    //     res.locals.user = decoded;
    //   }
    // }
    return res.render("pages/admin/Volunteers/index", {
      volunteers: volunteers,
      loggedin: res.locals.isAuthenticated,
      user: res.locals.user.payload
    })
  } catch (error) {
    return res.render("pages/admin/Volunteers/index", {
      warning: "Something went wrong, problem loading page"
    });
  }
}

const renderAdd = async(req,res) => {
  try {
    return res.render("pages/admin/volunteers/addVolunteer", {
      loggedin: res.locals.isAuthenticated,
      user: res.locals.user.payload
    })
  } catch (error) {
    return res.render("partials/error");
  }
}

const addVolunteer = async(req,res) => {
  try {
    const volunteer = await Volunteers.findOne({email: req.body.email});
    if(volunteer) {
      res.locals.userErr = `${volunteer.email} already exists, try logging in`;
      return res.render('pages/admin/volunteers/addVolunteer', {
        warning: res.locals.userErr
      })
    }
    const newVolunteer = new Volunteers({
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact
    })

    await newVolunteer.save();
    return res.redirect("/admin/volunteers/")
  } catch (error) {
    return res.render('pages/admin/volunteers/addVolunteer', {
      warning: "Something went wrong, please try again later"
    })
  }
}

const renderUpdateVolunteer = async(req, res) => {
  const volunteer = await Volunteers.findById(req.params.id);
  if(volunteer){
    try {
      return res.render("pages/admin/Volunteers/update", {
        volunteer:volunteer,
        loggedin: res.locals.isAuthenticated,
        user: res.locals.user.payload
      });

    } catch (error) {
      return res.render("pages/error");
    }
  }
}

const updateVolunteers = async(req,res) => {
  const {id} = req.params;
  try {
    await Volunteers.findByIdAndUpdate(id, {
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact
    },{new: true})
    return res.redirect("/admin/volunteers")
  } catch (error) {
    res.render("pages/admin/Volunteers/update", {
      warning: "Failed to update volunteer, please try again later"
    })
  }
}

const deleteVolunteer = async(req,res) => {
  const {id} = req.params;
  try {
    if(id){
      return await Volunteers.findByIdAndDelete(id);
    }
  } catch (error) {
    return res.render('pages/admin/Volunteers/index',{
      warning: "Failed to delete volunteer, please try again later"
    })
  }
}

module.exports = {
  volunteerIndex,
  renderAdd,
  renderUpdateVolunteer,
  updateVolunteers,
  addVolunteer,
  deleteVolunteer
}

