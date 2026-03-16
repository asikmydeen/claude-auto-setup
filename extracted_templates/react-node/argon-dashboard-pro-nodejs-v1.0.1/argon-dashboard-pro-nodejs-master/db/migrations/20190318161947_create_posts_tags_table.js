exports.up = async function up(knex) {
  await knex.schema.createTable('posts_tags', table => {
    table
      .integer('post_id')
      .unsigned()
      .notNullable();
    table
      .integer('tag_id')
      .unsigned()
      .notNullable();
    table
      .foreign('post_id')
      .references('posts.id')
      .onDelete('CASCADE');
    table
      .foreign('tag_id')
      .references('tags.id')
      .onDelete('CASCADE');
    table.primary(['post_id', 'tag_id']);
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTable('posts_tags');
};
