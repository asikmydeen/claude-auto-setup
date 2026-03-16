const { wrap } = require('async-middleware');

const express = require('express');
const requestBodyValidation = require('./commands/verify-request-body');

const router = express.Router();

const roleGuard = require('../../helpers/role-guard');
const { loadPage, loadAddCategoryPage, loadEditCategoryPage } = require('./commands/load-page');
const addCategory = require('./commands/add-category');
const updateCategory = require('./commands/update-category');
const deleteCategory = require('./commands/delete-category');

router.use(roleGuard(['ADMIN', 'CREATOR']));
router.get('/', wrap(loadPage));
router.get('/add', wrap(loadAddCategoryPage));
router.post('/add', wrap(requestBodyValidation), wrap(addCategory));
router.get('/:categoryId/edit', wrap(loadEditCategoryPage));
router.post('/:categoryId/edit', wrap(requestBodyValidation), wrap(updateCategory));
router.post('/remove', wrap(deleteCategory));

module.exports = router;
