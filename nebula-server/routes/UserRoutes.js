const express = require('express');

const userController = require('../models/User/UserController');

const router = express.Router();

router.post('/api/createUser', userController.createNewUser);

module.exports = router;