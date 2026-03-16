const bcrypt = require('bcrypt');
const knex = require('../../db');

async function getUser(id) {
  const [user] = await knex('users')
    .where('id', id)
    .select('email', 'name');
  return user;
}

async function updateUserInfo({ name, username: email, id }) {
  const [user] = await knex('users')
    .where({ id })
    .update({
      name,
      email,
      updated_at: new Date(),
    })
    .returning(['email', 'name']);
  return user;
}

async function changePassword({ password, newPassword, id }) {
  const [user] = await knex('users')
    .select()
    .where({ id })
    .limit(1);

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return {};
  }

  const hashedPass = await bcrypt.hash(newPassword, 5);

  const [updateUser] = await knex('users')
    .where({ id })
    .update({
      password: hashedPass,
      updated_at: new Date(),
    })
    .returning(['name']);
  return updateUser;
}

module.exports = {
  getUser,
  updateUserInfo,
  changePassword,
};
