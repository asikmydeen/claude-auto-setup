const knex = require('../../db');

async function getCategoryList() {
  return knex('categories').select(['id', 'name', 'description']);
}

async function getCategoryData(id) {
  return knex('categories')
    .where({ id })
    .select(['id', 'name', 'description']);
}

async function insertCategory({ name, description }) {
  const [category] = await knex('categories')
    .insert({
      name,
      description,
    })
    .returning(['description', 'name']);
  return category;
}

async function updateCategoryData({ name, description, categoryId: id }) {
  const [category] = await knex('categories')
    .where({ id })
    .update({
      name,
      description,
    })
    .returning(['name', 'description']);
  return category;
}

async function deleteCategory({ id }) {
  const [category] = await knex('categories')
    .where({ id })
    .del()
    .returning(['name']);
  return category;
}

module.exports = {
  getCategoryList,
  getCategoryData,
  insertCategory,
  updateCategoryData,
  deleteCategory,
};
