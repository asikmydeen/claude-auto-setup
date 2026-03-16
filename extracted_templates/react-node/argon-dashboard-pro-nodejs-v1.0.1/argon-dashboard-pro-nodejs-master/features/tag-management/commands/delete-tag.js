const repository = require('../repository');
const { REMOVE_TAG_ERROR_MESSAGE } = require('../constants');

async function deleteTagDetails(req, res) {
  let deleteTag;

  try {
    deleteTag = await repository.deleteTag({ ...req.body });
  } catch (deleteTagError) {
    deleteTag = deleteTagError;
  }

  if (!deleteTag.name) {
    req.session.messages = { errors: { databaseError: REMOVE_TAG_ERROR_MESSAGE } };
  }
  return res.redirect(`/tag-management`);
}

module.exports = deleteTagDetails;
