const express = require('express');
const path = require('path');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Organization = require('../models/organization/organization');

const router = express.Router();

// New Organization Route
router.post('/register/org', (req, res, next) => {
	let newOrg = new Organization({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	});

	Organization.addOrganization(newOrg, (err, org) => {
		if (err) {
			res.json({success: false, msg: 'organization/organization.js: Failed to register organization'});
		} else {
			res.json({success: true, msg: 'organization/organization.js: Registered organization'})
		}
	})
});

// New IT Route
router.post('/register/IT', (req, res, next) => {
	res.send('Register New IT');
});

// New HR Route
router.post('/register/hr', (req, res, next) => {
	res.send('Register New HR User');
});

// New Floor Manager Route
router.post('/register/floormanager', (req, res, next) => {
	res.send('Register New Floor Manager');
});

// New SuperUser Route
router.post('/register/super', (req, res, next) => {
	res.send('Register New Super User');
});

// Authentication Route
router.get('/authenticate', (req, res, next) => {
	res.send('Authenticate');
});

// Admin Panel Route
router.get('/panel/it', (req, res, next) => {
	res.send('Organization Panel IT View');
});

// HR Panel Route
router.get('/panel/hr', (req, res, next) => {
	res.send('Organization Panel HR View');
});

// Floor Manager Panel Route
router.get('/panel/floormanager', (req, res, next) => {
	res.send('Organization Panel Floor Manager View');
});

// Super User Panel Route
router.get('/panel/super', (req, res, next) => {
	res.send('Organization Panel Super User View');
});

module.exports = router;