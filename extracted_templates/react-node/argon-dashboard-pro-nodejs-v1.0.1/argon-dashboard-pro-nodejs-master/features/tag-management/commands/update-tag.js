const repository = require('../repository');
const { UPDATE_INFO_SUCCESS_MESSAGE, UPDATE_INFO_ERROR_MESSAGE } = require('../constants');

async function updateTagDetails(req, res) {
  const { id } = req.params;
  let updateTag;

  try {
    updateTag = await repository.updateTag({ ...req.body, id });
  } catch (updateTagError) {
    updateTag = updateTagError;
  }

  if (updateTag && updateTag.name) {
    req.session.messages = { success: UPDATE_INFO_SUCCESS_MESSAGE };
  } else {
    req.session.messages = { errors: { databaseError: UPDATE_INFO_ERROR_MESSAGE } };
  }

  return res.redirect(`/tag-management/${id}/edit`);
}

module.exports = updateTagDetails;
