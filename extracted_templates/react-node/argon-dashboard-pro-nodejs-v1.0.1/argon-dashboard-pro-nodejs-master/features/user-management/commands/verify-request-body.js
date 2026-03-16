const Joi = require('joi');

const constants = require('../constants');
const userRoles = require('../../../resources/user-roles');

const { NAME_MIN, NAME_MAX } = constants;
const roleCodePattern = userRoles.map(roleObject => roleObject.role_code).join('|');
const roleCodeRegExp = new RegExp(`^(${roleCodePattern})$`);

const schema = Joi.object().keys({
  name: Joi.string()
    .min(NAME_MIN)
    .max(NAME_MAX)
    .required(),
  email: Joi.string().email({ minDomainAtoms: 2 }),
  role: Joi.string().regex(roleCodeRegExp),

});

async function validateEditUserPayload(req, res, next) {
  let payloadValidation;
  try {
    payloadValidation = await Joi.validate(req.body, schema, { abortEarly: false });
  } catch (validateEditUserError) {
    payloadValidation = validateEditUserError;
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
    return res.status(400).redirect(`/user-management/${req.params.userId}/edit`);
  }
  return next();
}

module.exports = validateEditUserPayload;
