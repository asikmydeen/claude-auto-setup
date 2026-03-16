exports.up = async function up(knex) {
  await knex.schema.createTable('tags', table => {
    table
      .increments('id')
      .unsigned()
      .notNullable()
      .primary();
    table.string('name', 60).notNullable();
    table.string('color', 7).notNullable();
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());

    table.unique('name');
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTable('tags');
};
