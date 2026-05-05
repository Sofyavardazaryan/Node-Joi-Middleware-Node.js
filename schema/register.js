const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(10).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  repeat_password: Joi.ref("password"),
});

module.exports.registerSchema = registerSchema;
