const repository = require('../repository');
const { REMOVE_POST_ERROR_MESSAGE } = require('../constants');

async function deletePostDetails(req, res) {
  let deletePost;

  try {
    deletePost = await repository.deletePost({ ...req.body });
  } catch (deletePostError) {
    deletePost = deletePostError;
  }

  if (!(deletePost && deletePost.id)) {
    req.session.messages = { errors: { databaseError: REMOVE_POST_ERROR_MESSAGE } };
  }
  return res.redirect(`/posts/management`);
}

module.exports = deletePostDetails;
