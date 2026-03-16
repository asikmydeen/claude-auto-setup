const repository = require('../repository');
const { REMOVE_USER_ERROR_MESSAGE, REMOVE_SELF_ERROR_MESSAGE } = require('../constants');

async function deleteUserDetails(req, res) {
  let deleteUser;

  try {
    deleteUser = await repository.deleteUser({
      ...req.body,
      currentUserId: req.session.userInfo.id,
    });
  } catch (deleteUserError) {
    deleteUser = deleteUserError;
  }

  if (!(deleteUser && deleteUser.name)) {
    if (Number(req.body.id) === Number(req.session.userInfo.id)) {
      req.session.messages = { errors: { databaseError: REMOVE_SELF_ERROR_MESSAGE } };
    } else {
      req.session.messages = { errors: { databaseError: REMOVE_USER_ERROR_MESSAGE } };
    }
  }
  return res.redirect(`/user-management`);
}

module.exports = deleteUserDetails;
