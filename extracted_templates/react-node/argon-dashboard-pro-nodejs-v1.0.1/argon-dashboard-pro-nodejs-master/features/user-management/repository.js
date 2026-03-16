const knex = require('../../db');

async function getUserList() {
  return knex('users').select(['id', 'name', 'email', 'created_at']);
}
async function getUserData(userId) {
  return knex('users')
    .where('id', userId)
    .select(['id', 'name', 'email', 'role']);
}

async function getUserRoles() {
  return knex('roles').select(['role_code', 'description']);
}

async function updateUserInfo({ name, email, role, userId: id }) {
  const [user] = await knex('users')
    .where({ id })
    .update({
      name,
      email,
      role,
      updated_at: new Date(),
    })
    .returning(['email', 'name']);
  return user;
}
async function deleteUser({ id, currentUserId }) {
  const [user] = await knex('users')
    .where({ id })
    .whereNot('id', currentUserId)
    .del()
    .returning(['name']);
  return user;
}

module.exports = {
  getUserList,
  getUserData,
  getUserRoles,
  updateUserInfo,
  deleteUser,
};
