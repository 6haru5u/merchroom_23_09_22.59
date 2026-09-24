const express = require('express');
const { chatRateLimit, reply } = require('../controllers/chat.controller');

const router = express.Router();

router.post('/', chatRateLimit, reply);

module.exports = router;
