const registerRepo = require('../repository');

async function loadPage(req, res) {
  const userRoles = await registerRepo.getUserRoles();
  return res.render('pages/examples/register', {
    userRoles,
  });
}

module.exports = loadPage;
