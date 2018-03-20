const express = require('express');
const path = require('path');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Company = require('../models/company/company');

const router = express.Router();

// New Company Route
router.post('/register', (req, res, next) => {
	let newCompany = new Company({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	});

	Company.addCompany(newCompany, (err, org) => {
		if (err) {
			res.json({success: false, msg: 'company/company.js: Failed to register company'});
		} else {
			res.json({success: true, msg: 'company/company.js: Registered company'})
		}
	})
});



module.exports = router;