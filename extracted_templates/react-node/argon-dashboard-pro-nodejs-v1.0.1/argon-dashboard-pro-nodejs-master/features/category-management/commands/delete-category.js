const repository = require('../repository');
const { REMOVE_CATEGORY_ERROR_MESSAGE } = require('../constants');

async function deleteCategoryDetails(req, res) {
  let deleteCategory;

  try {
    deleteCategory = await repository.deleteCategory({ ...req.body });
  } catch (deleteCategoryError) {
    deleteCategory = deleteCategoryError;
  }

  if (!deleteCategory.name) {
    req.session.messages = { errors: { databaseError: REMOVE_CATEGORY_ERROR_MESSAGE } };
  }
  return res.redirect(`/category-management`);
}

module.exports = deleteCategoryDetails;
