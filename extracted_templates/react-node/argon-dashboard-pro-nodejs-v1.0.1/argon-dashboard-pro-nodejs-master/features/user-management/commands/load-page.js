const repository = require('../repository');

async function loadPage(req, res) {
  const userList = await repository.getUserList();
  res.render('pages/examples/user-management', {
    userList,
    pageCategory: 'examples',
    activePage: 'user-management',
  });
}

module.exports = loadPage;
