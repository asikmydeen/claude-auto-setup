const { updateCategoryData } = require('../repository');
const { UPDATE_INFO_SUCCESS_MESSAGE, UPDATE_INFO_ERROR_MESSAGE } = require('../constants');

async function updateCategory(req, res) {
  let category = {};
  const { categoryId } = req.params;
  const updateSuccessfulMessage = UPDATE_INFO_SUCCESS_MESSAGE;
  try {
    category = await updateCategoryData({ ...req.body, categoryId });
  } catch (error) {
    category = error;
  }

  if (category.email) {
    req.session.messages = { success: updateSuccessfulMessage };
  } else {
    req.session.messages = { errors: { databaseError: UPDATE_INFO_ERROR_MESSAGE } };
  }

  return res.redirect(`/category-management/${categoryId}/edit`);
}

module.exports = updateCategory;
