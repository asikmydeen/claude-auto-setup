const express = require('express');

const router = express.Router();

const { wrap } = require('async-middleware');

const { loadPage, loadAddTagPage, loadEditTagPage } = require('./commands/load-page');
const roleGuard = require('../../helpers/role-guard');
const updateTag = require('./commands/update-tag');
const addTag = require('./commands/add-tag');
const deleteTag = require('./commands/delete-tag');

const requestBodyValidation = require('./commands/verify-request-body');

router.use(wrap(roleGuard(['ADMIN', 'CREATOR'])));
router.get('/', wrap(loadPage));
router.get('/add', wrap(loadAddTagPage));
router.get('/:id/edit', wrap(loadEditTagPage));
router.post('/:id/edit', wrap(requestBodyValidation), wrap(updateTag));
router.post('/add', wrap(requestBodyValidation), wrap(addTag));
router.post('/remove', wrap(deleteTag));

module.exports = router;
