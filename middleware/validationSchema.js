var Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  surname: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required()
})

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

const contactUsSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  surname: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  inquery: Joi.string().required(),
  telephone: Joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required(),
  messages: Joi.string().min(10).max(400)
})

const donationSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  contact: Joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required(),
  amount: Joi.number().required()
});

const partnershipSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  contact: Joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required(),
  partnership: Joi.string().required(),
  projectname: Joi.string().min(3).max(20).required()
})


const editContactUsSchema = Joi.object({
  email: Joi.string().email().required(),
  telephone: Joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required()
})

const editBankingDetailsSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  account_number: Joi.string().min(9).max(15).required(),
  bank_name: Joi.string().min(3).max(20).required(),
  reference: Joi.string().min(3).max(20).required(),
})

const editStatementSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  body: Joi.string().min(20).max(300).required(),
});

const editTeamSchema = Joi.object({
  name: Joi.string().min(3).max(15).required(),
  position: Joi.string().min(3).max(15).required(),
}).options({allowUnknown: true});


module.exports = {
  registerSchema,
  loginSchema,
  contactUsSchema,
  donationSchema,
  partnershipSchema,
  editContactUsSchema,
  editBankingDetailsSchema,
  editStatementSchema,
  editTeamSchema
}

