exports.seed = async function seed(knex) {
  const tagsToAdd = [{ name: 'defaultTag', color: '#DDDDDD' }];

  // Check if tags already exist before insert them into tags table
  const tags = await knex('tags').select('*');

  if (!tags.length) {
    // Insert selected tags into tags table
    await knex.batchInsert('tags', tagsToAdd);
  }
};
