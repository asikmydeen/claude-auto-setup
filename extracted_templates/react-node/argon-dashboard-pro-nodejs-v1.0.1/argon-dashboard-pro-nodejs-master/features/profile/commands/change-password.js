const { changePassword } = require('../repository');
const { UPDATE_INFO_SUCCESS_MESSAGE, UPDATE_INFO_ERROR_MESSAGE } = require('../constants');

async function updateUser(req, res) {
  let user = {};
  const {
    user: { id },
  } = req;
  try {
    user = await changePassword({ ...req.body, id });
  } catch (error) {
    user = error;
  }

  if (user && user.name) {
    req.session.messages = { success: UPDATE_INFO_SUCCESS_MESSAGE };
  } else {
    req.session.messages = { errors: { databaseError: UPDATE_INFO_ERROR_MESSAGE } };
  }

  return res.redirect('/profile');
}

module.exports = updateUser;
