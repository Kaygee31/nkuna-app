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
  amount: Joi.required()
})

module.exports = {
  registerSchema,
  loginSchema,
  contactUsSchema,
  donationSchema
}

