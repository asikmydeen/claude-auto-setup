exports.up = async function up(knex) {
  await knex.schema.createTable('posts_categories', table => {
    table
      .integer('post_id')
      .unsigned()
      .notNullable();
    table
      .integer('category_id')
      .unsigned()
      .notNullable();
    table
      .foreign('post_id')
      .references('posts.id')
      .onDelete('CASCADE');
    table
      .foreign('category_id')
      .references('categories.id')
      .onDelete('CASCADE');
    table.primary(['post_id', 'category_id']);
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTable('posts_categories');
};
