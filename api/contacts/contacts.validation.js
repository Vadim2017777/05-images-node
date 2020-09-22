const Joi = require("joi");

exports.contactsValadation = Joi.object({
  name: Joi.string().min(3).max(30).optional().allow(null).allow("").empty(""),

  email: Joi.string().email({
    minDomainSegments: 2,
  }),

  phone: Joi.string().required(),
  subscription: Joi.string(),
  password: Joi.string().required(),
  token: Joi.string().optional().allow(null).allow("").empty(""),
});
