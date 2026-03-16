const express = require('express');

const router = express.Router();

const { wrap } = require('async-middleware');

const roleGuard = require('../../helpers/role-guard');
const loadPage = require('./commands/load-page');
const loadEditPage = require('./commands/load-edit-page');
const requestBodyValidation = require('./commands/verify-request-body');
const updateUser = require('./commands/update-user');
const deleteUser = require('./commands/delete-user');

router.use(wrap(roleGuard('ADMIN')));
router.get('/', wrap(loadPage));
router.get('/:userId/edit', wrap(loadEditPage));
router.post('/:userId/edit', wrap(requestBodyValidation), wrap(updateUser));
router.post('/remove', wrap(deleteUser));

module.exports = router;
