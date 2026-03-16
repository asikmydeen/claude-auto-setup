const repository = require('../repository');

async function loadPage(req, res) {
  const categoryList = await repository.getCategoryList();
  res.render('pages/examples/category-management', {
    categoryList,
    pageCategory: 'examples',
    activePage: 'category-management',
  });
}

async function loadAddCategoryPage(req, res) {
  res.render('pages/examples/add-category', {
    pageCategory: 'examples',
    activePage: 'add-category',
  });
}

async function loadEditCategoryPage(req, res) {
  const { categoryId } = req.params;
  const [categoryData] = await repository.getCategoryData(categoryId);

  res.render('pages/examples/edit-category', {
    categoryData,
    pageCategory: 'examples',
    activePage: 'edit-category',
  });
}

module.exports = { loadPage, loadAddCategoryPage, loadEditCategoryPage };
