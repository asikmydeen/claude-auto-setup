const debug = require('debug')('express:login');

async function loadPage(req, res) {
  debug('login:loadPage', req, res);
  res.render('pages/examples/login', { pageCategory: 'examples', activePage: 'login' });
}

module.exports = loadPage;
