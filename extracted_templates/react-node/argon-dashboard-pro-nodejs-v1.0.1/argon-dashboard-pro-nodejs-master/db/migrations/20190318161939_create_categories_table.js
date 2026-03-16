exports.up = async function up(knex) {
  await knex.schema.createTable('categories', table => {
    table
      .increments('id')
      .unsigned()
      .notNullable()
      .primary();
    table.string('name', 60).notNullable();
    table
      .string('description', 100)
      .notNullable()
      .defaultTo('');
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());

    table.unique('name');
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTable('categories');
};
