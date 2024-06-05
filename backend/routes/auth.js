const express = require('express');
const { register, login, oauthCallback } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/oauth/callback', oauthCallback);

module.exports = router;
