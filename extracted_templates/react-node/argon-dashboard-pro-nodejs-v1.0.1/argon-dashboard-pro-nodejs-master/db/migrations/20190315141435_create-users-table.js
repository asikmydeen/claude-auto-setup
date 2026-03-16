exports.up = async function up(knex) {
  await knex.schema.createTable('users', table => {
    table
      .increments('id')
      .unsigned()
      .notNullable()
      .primary();
    table.string('email', 60).notNullable();
    table.string('name', 60).notNullable();
    table.string('password', 60).notNullable();
    table.string('role', 60).notNullable();
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.fn.now());

    table.unique('email');
    table
      .foreign('role')
      .references('roles.role_code')
      .onUpdate('CASCADE');
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTable('users');
};
