const repository = require('../repository');
const { ADD_CATEGORY_SUCCESS_MESSAGE, ADD_CATEGORY_ERROR_MESSAGE } = require('../constants');

async function addCategory(req, res) {
  let newCategory;

  try {
    newCategory = await repository.insertCategory({ ...req.body });
  } catch (newCategoryError) {
    newCategory = newCategoryError;
  }

  if (newCategory && newCategory.name) {
    req.session.messages = { success: ADD_CATEGORY_SUCCESS_MESSAGE };
  } else {
    req.session.messages = { errors: { databaseError: ADD_CATEGORY_ERROR_MESSAGE } };
  }

  return res.redirect(`/category-management/add`);
}

module.exports = addCategory;
