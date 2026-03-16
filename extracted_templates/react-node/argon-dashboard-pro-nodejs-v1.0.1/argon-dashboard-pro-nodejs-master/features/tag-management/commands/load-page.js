const repository = require('../repository');

async function loadPage(req, res) {
  const tagList = await repository.getTagList();
  res.render('pages/examples/tag-management', {
    tagList,
    pageCategory: 'examples',
    activePage: 'tag-management',
  });
}

async function loadAddTagPage(req, res) {
  res.render('pages/examples/add-tag', { pageCategory: 'examples', activePage: 'add-tag' });
}

async function loadEditTagPage(req, res) {
  const { id } = req.params;
  const [tagData] = await repository.getTagById(id);

  res.render('pages/examples/edit-tag', {
    tagData,
    pageCategory: 'examples',
    activePage: 'edit-tag',
  });
}

module.exports = { loadPage, loadEditTagPage, loadAddTagPage };
