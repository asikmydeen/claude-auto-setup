const repository = require('../repository');
const { UPDATE_POST_SUCCESS_MESSAGE, UPDATE_POST_ERROR_MESSAGE } = require('../constants');

async function editPostDetails(req, res) {
  const {
    user: { id: userId },
    body: { postId },
  } = req;
  try {
    await repository.editPost({ ...req.body, userId });
    req.session.messages = { success: UPDATE_POST_SUCCESS_MESSAGE };
  } catch (addPostError) {
    req.session.messages = { errors: { databaseError: UPDATE_POST_ERROR_MESSAGE } };
  }

  return res.redirect(`/posts/${postId}/edit`);
}

module.exports = editPostDetails;
