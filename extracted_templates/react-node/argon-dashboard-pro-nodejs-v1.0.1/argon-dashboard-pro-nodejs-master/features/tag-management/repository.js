const knex = require('../../db');

async function getTagList() {
  return knex('tags').select(['name', 'color', 'created_at', 'id']);
}
async function getTagById(id) {
  return knex('tags')
    .where({ id })
    .select(['name', 'color', 'created_at', 'id']);
}

async function updateTag({ name, color, id }) {
  const [tag] = await knex('tags')
    .where({ id })
    .update({
      name,
      color,
    })
    .returning(['color', 'name']);
  return tag;
}

async function addTag({ name, color }) {
  const [tag] = await knex('tags')
    .insert({
      name,
      color,
    })
    .returning(['color', 'name']);
  return tag;
}

async function deleteTag({ id }) {
  const [tag] = await knex('tags')
    .where({ id })
    .del()
    .returning(['color', 'name']);
  return tag;
}

module.exports = {
  getTagList,
  getTagById,
  updateTag,
  addTag,
  deleteTag,
};
