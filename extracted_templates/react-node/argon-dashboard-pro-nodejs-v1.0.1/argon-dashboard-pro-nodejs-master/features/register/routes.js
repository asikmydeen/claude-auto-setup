const express = require('express');

const router = express.Router();

const { wrap } = require('async-middleware');

const requestBodyValidation = require('./commands/verify-request-body');
const createUser = require('./commands/create-user');
const loadPage = require('./commands/load-page');

router.get('/', wrap(loadPage));

router.post('/', wrap(requestBodyValidation), wrap(createUser));

module.exports = router;
