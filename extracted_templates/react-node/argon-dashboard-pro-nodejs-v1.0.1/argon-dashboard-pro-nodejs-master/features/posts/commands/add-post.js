const repository = require('../repository');
const { ADD_POST_SUCCESS_MESSAGE, ADD_POST_ERROR_MESSAGE } = require('../constants');

async function addPostDetails(req, res) {
  const {
    user: { id: userId },
  } = req;
  try {
    await repository.addPost({ ...req.body, userId });
    req.session.messages = { success: ADD_POST_SUCCESS_MESSAGE };
  } catch (addPostError) {
    req.session.messages = { errors: { databaseError: ADD_POST_ERROR_MESSAGE } };
  }

  return res.redirect(`/posts/add`);
}

module.exports = addPostDetails;
