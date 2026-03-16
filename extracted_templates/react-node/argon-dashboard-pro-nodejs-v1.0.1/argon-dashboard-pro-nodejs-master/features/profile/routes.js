const express = require('express');

const router = express.Router();

const { wrap } = require('async-middleware');

const requestBodyValidation = require('./commands/verify-request-body');
const updateUserInfo = require('./commands/update-user-info');

const changePassword = require('./commands/change-password');
const loadPage = require('./commands/load-page');

router.get('/', wrap(loadPage));

router.post('/update-profile-info', wrap(requestBodyValidation), wrap(updateUserInfo));
router.post('/change-password', wrap(requestBodyValidation), wrap(changePassword));

module.exports = router;
