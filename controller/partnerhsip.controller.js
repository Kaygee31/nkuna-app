const { partnershipSchema } = require("../middleware/validationSchema");
var Partnerhsip = require("../models/partnerships.model");


const partnerships = async(req,res) => {

  try {
    const partners = await Partnerhsip.find();
    // const token = req.signedCookies.token;
    // const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // if(decoded) {
    //   res.locals.isAuthenticated = true;
    //   res.locals.user = decoded;
    // }

    res.render('pages/admin/partnerships/index', {
      partners: partners,
      loggedin: res.locals.isAuthenticated,
      user: res.locals.user.payload
    })
  }
  catch (error) {
    return res.render('partials/error')
  }
}

const renderAddPartnership = (req,res) => {
  try {
    return res.render("pages/admin/partnerships/add", {
      loggedin: res.locals.isAuthenticated,
      user: res.locals.user.payload
    });
  } catch (error) {
    return res.render('partials/error');
  }
}

const addPartnership = async(req,res) => {
  let arr = [];
  try {
    const name = await Partnerhsip.findOne({name: req.body.name});
    if(name) {
      res.render("pages/admin/partnerships/add",{
        loggedin: res.locals.isAuthenticated,
        user: res.locals.user.payload,
        warning: "Partner already exists"
      })
    }

    const partnerhsip = new Partnerhsip({
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      partnerhsipType: req.body.partnerhsipType,
      projectName: req.body.projectname
    })

    const {error, value} = partnershipSchema.validate(req.body,{abortEarly: false});
    if(error){
      error.details.forEach((err) => {
        arr.push(err.message)
      })
      //console.log(arr);
      return res.render("pages/admin/partnerships/add", {
        formErrors: arr,
        loggedin: res.locals.isAuthenticated,
        user: res.locals.user.payload,
      })
    }

    await partnerhsip.save();
    return res.redirect("/admin/partnership");
  } catch (error) {
    return res.render('pages/admin/partnerships/add',{
      danger: 'Something went wrong, please try again later',
    })
    //return res.redirect('/admin/partnership/add');
  }


}

const renderPartnershipUpdateForm = async(req,res) => {
  try {
    const {id} = req.params;
    if(id) {
      const partner = await Partnerhsip.findById(id);
      console.log("Partner: ", partner);
      return res.render("pages/admin/partnerships/partnershipUpdateForm", {
        partner: partner,
        loggedin: res.locals.isAuthenticated,
        user: res.locals.user.payload
      })
    }
  } catch (error) {
    return res.render("pages/partials/error.ejs");
  }
}

const editPartnershipForm = async(req,res) => {
  const {id} = req.params;
  if(id) {
    try {
      const partner = await Partnerhsip.findByIdAndUpdate(id, {
        name: req.body.name,
        email: req.body.email,
        partnershipType: req.body.partnershipType,
        contact: req.body.contact,
        projectName: req.body.projectName
      },{new: true});
      return res.redirect("/admin/partnership");
    } catch (error) {
      console.log(error);
    }
  }
}

const deletePartnership = async(req,res) => {
  const {id} = req.params;
  try {
    if(id) {
      await Partnerhsip.findByIdAndDelete({_id:id});
      //res.redirect("/admin/partnerships/index");
      return res.json({success: true});
    }
    res.json({err: "Partnership does not exists"})
  } catch (error) {
    return res.json({message: "Something went wrong, could not delete partner"})
  }
}

module.exports = {
  renderAddPartnership,
  partnerships,
  renderPartnershipUpdateForm,
  addPartnership,
  editPartnershipForm,
  deletePartnership
}

