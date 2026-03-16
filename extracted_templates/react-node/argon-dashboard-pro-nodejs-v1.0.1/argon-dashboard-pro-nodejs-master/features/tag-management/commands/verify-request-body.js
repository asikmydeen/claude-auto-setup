const Joi = require('joi');

const constants = require('../constants');

const { NAME_MIN, NAME_MAX } = constants;

const schema = Joi.object().keys({
  name: Joi.string()
    .min(NAME_MIN)
    .max(NAME_MAX)
    .required(),
  color: Joi.string().required(),
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
    return res
      .status(400)
      .redirect(`/tag-management/${req.params.id ? `${req.params.id}/edit` : 'add'}`);
  }
  return next();
}

module.exports = validateEditUserPayload;
