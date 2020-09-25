const Joi = require("joi");

exports.usersValadation = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  avatarURL: Joi.string(),
  phone: Joi.string().required(),
  subscription: Joi.string(),
  password: Joi.string().required(),
  token: Joi.string().optional().allow(null).allow("").empty(""),
});
