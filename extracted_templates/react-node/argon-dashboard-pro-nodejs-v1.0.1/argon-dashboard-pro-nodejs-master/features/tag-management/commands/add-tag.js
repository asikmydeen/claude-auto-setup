const repository = require('../repository');
const { ADD_TAG_SUCCESS_MESSAGE, ADD_TAG_ERROR_MESSAGE } = require('../constants');

async function addTagDetails(req, res) {
  let addTag;

  try {
    addTag = await repository.addTag({ ...req.body });
  } catch (addTagError) {
    addTag = addTagError;
  }

  if (addTag && addTag.name) {
    req.session.messages = { success: ADD_TAG_SUCCESS_MESSAGE };
  } else {
    req.session.messages = { errors: { databaseError: ADD_TAG_ERROR_MESSAGE } };
  }

  return res.redirect(`/tag-management/add`);
}

module.exports = addTagDetails;
