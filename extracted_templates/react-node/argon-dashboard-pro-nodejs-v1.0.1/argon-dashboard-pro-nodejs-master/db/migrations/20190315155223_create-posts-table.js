exports.up = async function up(knex) {
  await knex.schema.createTable('posts', table => {
    table
      .increments('id')
      .unsigned()
      .notNullable()
      .primary();
    table
      .integer('user_id')
      .unsigned()
      .notNullable();
    table.string('title', 60).notNullable();
    table.string('content', 300).notNullable();
    table.timestamp('published_at').defaultTo(knex.fn.now());
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .foreign('user_id')
      .references('users.id')
      .onDelete('CASCADE');
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTable('posts');
};
