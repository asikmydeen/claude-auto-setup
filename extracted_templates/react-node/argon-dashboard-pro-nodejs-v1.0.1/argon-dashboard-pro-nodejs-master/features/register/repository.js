const bcrypt = require('bcrypt');
const knex = require('../../db');

async function createUser({ name, username: email, password, roleCode }) {
  const NOW = new Date();
  const hashedPass = await bcrypt.hash(password, 5);
  const [user] = await knex('users')
    .insert({
      name,
      email,
      password: hashedPass,
      created_at: NOW,
      updated_at: NOW,
      role: roleCode,
    })
    .returning(['email', 'name']);
  return user;
}

async function getUserRoles() {
  return knex('roles').select(['role_code', 'description']);
}

module.exports = {
  createUser,
  getUserRoles,
};
