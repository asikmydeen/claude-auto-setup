const express = require('express');

const router = express.Router();

const { wrap } = require('async-middleware');

const loadPage = require('./commands/load-page');

router.get('/', wrap(loadPage));

module.exports = router;
