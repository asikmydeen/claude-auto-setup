const express = require('express');

const router = express.Router();

const { wrap } = require('async-middleware');

const requestBodyValidation = require('./commands/verify-request-body');
const roleGuard = require('../../helpers/role-guard');
const {
  loadAddPostPage,
  loadEditPostPage,
  loadDisplayPostsPage,
  loadManagePostsPage,
} = require('./commands/load-page');

const addPost = require('./commands/add-post');
const deletePost = require('./commands/delete-post');
const editPost = require('./commands/edit-post');

router.get('/display', wrap(loadDisplayPostsPage));

router.use(wrap(roleGuard(['ADMIN', 'CREATOR'])));

router.get('/management', wrap(loadManagePostsPage));

router.get('/add', wrap(loadAddPostPage));

router.get('/:id/edit', wrap(loadEditPostPage));

router.post('/remove', wrap(deletePost));
router.post('/add', wrap(requestBodyValidation), wrap(addPost));
router.post('/edit', wrap(requestBodyValidation), wrap(editPost));

module.exports = router;
