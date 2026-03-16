exports.seed = async function seed(knex) {
  const categoriesToAdd = [{ name: 'defaultCategory', description: 'default category' }];

  // Check if categories already exist before insert them into categories table
  const categories = await knex('categories').select('*');

  if (!categories.length) {
    // Insert selected categories into categories table
    await knex.batchInsert('categories', categoriesToAdd);
  }
};
