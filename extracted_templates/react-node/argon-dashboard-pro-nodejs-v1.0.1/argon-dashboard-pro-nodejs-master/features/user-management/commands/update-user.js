const { updateUserInfo } = require('../repository');
const { UPDATE_INFO_SUCCESS_MESSAGE, UPDATE_INFO_ERROR_MESSAGE } = require('../constants');

async function updateUser(req, res) {
  let user = {};
  const { userId } = req.params;
  const updateSuccessfulMessage = UPDATE_INFO_SUCCESS_MESSAGE;
  try {
    user = await updateUserInfo({ ...req.body, userId });
  } catch (error) {
    user = error;
  }

  if (user && user.email) {
    req.session.messages = { success: updateSuccessfulMessage };
  } else {
    req.session.messages = { errors: { databaseError: UPDATE_INFO_ERROR_MESSAGE } };
  }

  return res.redirect(`/user-management/${userId}/edit`);
}

module.exports = updateUser;
