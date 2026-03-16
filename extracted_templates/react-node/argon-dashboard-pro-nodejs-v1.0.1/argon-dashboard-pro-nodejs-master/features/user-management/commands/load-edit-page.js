const repository = require('../repository');

async function loadEditPage(req, res) {
  const { userId } = req.params;
  const [userData] = await repository.getUserData(userId);
  const userRoles = await repository.getUserRoles();

  res.render('pages/examples/edit-user', {
    userData,
    userRoles,
  });
}

module.exports = loadEditPage;
