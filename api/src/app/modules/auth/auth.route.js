const express = require('express');
const AuthController = require('./auth.controller');

const router = express.Router();

router.post('/', AuthController.Login);

module.exports = router;