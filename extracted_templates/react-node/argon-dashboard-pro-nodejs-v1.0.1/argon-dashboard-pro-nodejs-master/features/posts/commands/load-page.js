const repository = require('../repository');

async function loadDisplayPostsPage(req, res) {
  const postList = await repository.getPublishedPostsWithCategoriesAndTags();
  return res.render('pages/examples/display-posts', {
    postList,
    pageCategory: 'examples',
    activePage: 'display-posts',
  });
}

async function loadManagePostsPage(req, res) {
  const postList = await repository.getPostsWithCategoriesAndTags();
  return res.render('pages/examples/post-management', {
    postList,
    pageCategory: 'examples',
    activePage: 'post-management',
  });
}

async function loadAddPostPage(req, res) {
  const categories = await repository.getCategoryList();
  const tags = await repository.getTagList();

  res.render('pages/examples/add-post', {
    categories,
    tags,
    pageCategory: 'examples',
    activePage: 'add-post',
  });
}

async function loadEditPostPage(req, res) {
  const {
    params: { id },
  } = req;

  const categories = await repository.getCategoryList();
  const tags = await repository.getTagList();
  const [postDetails] = await repository.getPostDetails(id);

  postDetails.tags = postDetails.tags && postDetails.tags.map(tag => tag.name);

  res.render('pages/examples/edit-post', {
    postDetails,
    categories,
    tags,
    pageCategory: 'examples',
    activePage: 'edit-post',
  });
}

module.exports = { loadDisplayPostsPage, loadManagePostsPage, loadAddPostPage, loadEditPostPage };
