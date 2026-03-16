const express = require('express');

const router = express.Router();

const { wrap } = require('async-middleware');

const { logout } = require('./commands/logout');

router.post('/', wrap(logout));

module.exports = router;
