const Joi = require("joi");

//User-defined function to validate the user
function validateUser(user) {
  const JoiSchema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().min(5).max(30).required(),
    email: Joi.string().email().min(5).max(50).optional(),
    mobile: joi
      .string()
      .regex(/^[0-9]{10}$/)
      .required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    confirm_password: Joi.ref("password"),
  }).options({ abortEarly: false });

  return JoiSchema.validate(user);
}
