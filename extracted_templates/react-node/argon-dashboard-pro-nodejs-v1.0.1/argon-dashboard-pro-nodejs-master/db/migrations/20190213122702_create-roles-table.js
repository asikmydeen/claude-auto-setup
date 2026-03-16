exports.up = async function up(knex) {
  await knex.schema.createTable('roles', table => {
    table
      .string('role_code', 60)
      .notNullable()
      .primary();
    table.string('description', 60).notNullable();
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTable('roles');
};
