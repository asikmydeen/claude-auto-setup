const Joi = require('joi');

const constants = require('../constants');

const { NAME_MIN, NAME_MAX, PASSWORD_MIN } = constants;

const infoSchema = Joi.object().keys({
  name: Joi.string()
    .min(NAME_MIN)
    .max(NAME_MAX)
    .required(),
  username: Joi.string().email({ minDomainAtoms: 2 }),
});

const passwordSchema = Joi.object().keys({
  password: Joi.string()
    .min(PASSWORD_MIN)
    .max(NAME_MAX)
    .required(),
  newPassword: Joi.string()
    .min(PASSWORD_MIN)
    .max(NAME_MAX)
    .required(),
  confirmPassword: Joi.any()
    .valid(Joi.ref('newPassword'))
    .required()
    .options({ language: { any: { allowOnly: 'must match password' } } }),
});

async function validateRegisterPayload(req, res, next) {
  let payloadValidation;
  try {
    payloadValidation = await Joi.validate(
      req.body,
      req.body.password ? passwordSchema : infoSchema,
      { abortEarly: false }
    );
  } catch (validateRegisterError) {
    payloadValidation = validateRegisterError;
  }
  const { details } = payloadValidation;
  let errors;
  if (details) {
    errors = {};
    details.forEach(errorDetail => {
      const {
        message,
        path: [key],
        type,
      } = errorDetail;
      const errorType = type.split('.')[1];
      errors[key] = constants[`${key.toUpperCase()}_${errorType.toUpperCase()}_ERROR`] || message;
    });
  }

  if (errors) {
    req.session.messages = { errors };
    return res.status(400).redirect('/profile');
  }
  return next();
}

module.exports = validateRegisterPayload;
