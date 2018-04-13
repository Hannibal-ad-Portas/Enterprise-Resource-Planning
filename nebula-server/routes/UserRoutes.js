const express = require('express');
const passport = require('passport');

const userController = require('../models/User/UserController');

const router = express.Router();

router.post('/createUser', userController.createNewUser);

router.post('/authenticate/login', userController.authenticateLogin);

router.get('/userData', passport.authenticate('userLogin', {session: false}), (req, res, next) => {
	let user = req.user;
	res.json(user);
});

module.exports = router;