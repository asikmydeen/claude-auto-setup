const Knex = require('knex');
const bcrypt = require('bcrypt');

const knexConfig = require('../../db/knexfile');

const knex = Knex(knexConfig[process.env.NODE_ENV]);

async function getUserForLoginData(email, password) {
  const [user] = await knex('users')
    .select()
    .where({ email })
    .limit(1);

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return null;
  }

  return {
    id: user.id,
    username: user.email,
    created_at: user.created_at,
  };
}

async function getUserById(id) {
  const [user] = await knex('users')
    .select(['id', 'name', 'email', 'role'])
    .where({ id })
    .limit(1);
  return user;
}

module.exports = {
  getUserForLoginData,
  getUserById,
};
