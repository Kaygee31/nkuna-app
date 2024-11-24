const Statement = require('../models/pages/statements.model');
const Banking = require('../models/pages/banking.model');
const Team = require('../models/pages/team.model');
const Contact = require('../models/pages/contact.model');
const { editContactUsSchema,editTeamSchema,editBankingDetailsSchema, editStatementSchema } = require('../middleware/validationSchema');
const jwt = require("jsonwebtoken");

function displayError(error) {
  let er = [];
  if(error) {
    error.details.forEach((err) => {
      er.push(err.message)
    })
  }
  return er;
}


const editPageIndex = async(req,res) => {
  try {

    // console.log(res.locals);
    const bankingDetails = await Banking.find();
    const statements = await Statement.find();
    const the_team = await Team.find();
    const contactDetails = await Contact.find();
    let banking;
    let contact;

    if(bankingDetails || contactDetails) {
      banking = bankingDetails[0];
      contact = contactDetails[0];
    }

    return res.render("pages/admin/EditPages/index", {
      loggedin: res.locals.isAuthenticated,
      user: res.locals.user.payload,
      statements,
      banking,
      the_team,
      contact
    })
  } catch (error) {
    console.log(error);
  }
}

const editPageFormPage = async(req,res) => {
  try {
    const bankingDetails = await Banking.find();
    const statements = await Statement.find();
    const the_team = await Team.find();
    const contactDetails = await Contact.find();

    let banking;
    let contact;

    if(bankingDetails || contactDetails) {
      banking = bankingDetails[0];
      contact = contactDetails[0];
    }

    return res.render("pages/admin/EditPages/edit_form_page", {
      loggedin: res.locals.isAuthenticated,
      user: res.locals.user.payload,
      statements,
      banking,
      the_team,
      contact
    })
  } catch (error) {
    console.log(error);
  }
}

const renderBankingPage = async(req,res) => {
  try {
    const banking = await Banking.find();
    // console.log(banking);

    if(banking) {
      const bankingDetails = banking[0];
      return res.render("pages/admin/EditPages/edit_banking_page", {bankingDetails})
    }
  }
  catch(error) {
    console.log(error);
  }
}

const renderStatementPage = async(req,res) => {
  try{
    const statement = await Statement.findById({_id: req.params.id});

    if(statement) {
      return res.render("pages/admin/EditPages/edit_statement_page", {statement})
    }else {
      return res.status(404).send('The Statement member does not exist');
    }
  }
  catch(err) {
    return res.render("partial/error")
  }
}

const renderTeamPage = async (req,res) => {
  const the_team = await Team.findById({_id: req.params.id});
  if (the_team) {
    return res.render('pages/admin/EditPages/edit_team_page', { the_team });
  } else {
    // return res.status(404).json({errorMessage: 'Could not load page, try again later'});
    return res.render("partials/error",{message: "Could not load page, try again later"});
  }
}

const renderContactPage = async(req,res) => {
  try {
    const contact = await Contact.find();

    if(contact) {
      const contactDetails = contact[0];
      return res.render("pages/admin/EditPages/edit_contact_page", {contactDetails})
    } else {
      return res.render("partials/error",{message: "Could not load page, try again later"});
    }
  } catch (error) {
    console.log(error);
  }
}

const editTeamPage = async(req,res) => {
  try {
    const the_team = await Team.findById({_id: req.params.id});

    const {error, value} = editTeamSchema.validate(req.body,{abortEarly: false});
    // console.log(req.body);
    if(error) {
      let errorMessage = displayError(error);
      // console.log(errorMessage);
      return res.status(400).json({ message: errorMessage });
    }
    else {
      if (the_team) {

        the_team.name = req.body.name;
        the_team.position = req.body.position;

        if(!req.file) {
          const file = req.body.file;
          const match = file.match(/[^\/]+$/)
          if(match)
            the_team.image = `/images/${match[0]}`
        } else {
            the_team.image = `/images/${req.file.filename}`;
        }

        await the_team.save();
        return res.json({redirect: "/admin/pages/edit/overview"})
      } else {
          res.status(404).send('Team member not found');
      }
    }
  } catch (error) {
    console.log(error);
  }
}

const editStatementPage = async(req,res) => {
  try {
    const statement = await Statement.findById({_id: req.params.id});

    const {error, value} = editStatementSchema.validate(req.body,{abortEarly: false});

    if(error) {
      let errorMessage = displayError(error);
      console.log(errorMessage);
      return res.status(400).json({ message: errorMessage });
    }
    else {
      if (statement) {
        statement.name = req.body.name;
        statement.body = req.body.body;
        await statement.save();
        return res.json({message: 'success', redirect: "/admin/pages/edit/overview"});
      } else {
        res.status(404).send('Item not found');
      }
    }
  }
  catch(err) {
    console.log(err);
  }
}

const editBankingPage = async(req,res) => {
  const {error, value} = editBankingDetailsSchema.validate(req.body,{abortEarly: false});

  if(error) {
    let errorMessage = displayError(error);
    console.log(errorMessage);
    return res.status(400).json({ message: errorMessage });
  }

  try {
    const banking = await Banking.find();
    const bankingDetails = banking[0];
    if(bankingDetails) {
      bankingDetails.accountName = req.body.name;
      bankingDetails.accountNumber = +req.body.account_number;
      bankingDetails.bankName = req.body.bank_name;
      bankingDetails.reference = req.body.reference;

      await bankingDetails.save();
      return res.json({redirect: "/admin/pages/edit/overview"})
    }
  } catch (error) {
    console.log(error);
  }
}

const editContactPage = async(req,res) => {
  const {error, value} = editContactUsSchema.validate(req.body,{abortEarly: false});

  if(error) {
    let errorMessage = displayError(error);
    console.log(errorMessage);
    return res.status(400).json({ message: errorMessage });
  }

  try {
    const contact = await Contact.find();
    if(contact) {
      const contactDetails = contact[0];

      contactDetails.email = req.body.email;
      contactDetails.phone_number = req.body.telephone;
      await contactDetails.save();
      return res.status(200).json({redirect: "/admin/pages/edit/overview"})
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  editPageIndex,
  editPageFormPage,
  renderTeamPage,
  editTeamPage,
  renderStatementPage,
  editStatementPage,
  renderBankingPage,
  editBankingPage,
  renderContactPage,
  editContactPage
}


