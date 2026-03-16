async function loadPage(req, res) {
  res.render('pages/examples/profile', { pageCategory: 'examples', activePage: 'profile' });
}

module.exports = loadPage;
