const Joi = require('joi');

const constants = require('../constants');

const { TITLE_MIN, TITLE_MAX, CONTENT_MIN, CONTENT_MAX } = constants;

const postSchema = Joi.object().keys({
  title: Joi.string()
    .min(TITLE_MIN)
    .max(TITLE_MAX)
    .required(),
  content: Joi.string()
    .min(CONTENT_MIN)
    .max(CONTENT_MAX),
  category: Joi.string(),
  tags: Joi.any(),
  postId: Joi.any(),
  publishedAt: Joi.any(),
});

async function validateRegisterPayload(req, res, next) {
  let payloadValidation;
  try {
    payloadValidation = await Joi.validate(req.body, postSchema, { abortEarly: false });
  } catch (validateRegisterError) {
    payloadValidation = validateRegisterError;
  }
  const { details } = payloadValidation;
  const { postId } = req.body;
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
    return res.status(400).redirect(postId ? `/posts/${postId}/edit` : '/posts/add');
  }
  return next();
}

module.exports = validateRegisterPayload;
