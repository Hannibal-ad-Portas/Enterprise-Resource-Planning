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
			res.json({success: false, msg: 'routes/companyRoutes.js: Failed to register company'});
		} else {
			res.json({success: true, msg: 'routes/companyRoutes.js: Registered company'})
		}
	});
});

// Add Inventory Item Route
router.post('/:companyId/inventory/add_item', (req, res, next) => {
	let newItem = {
		itemName: req.body.itemName,
		sku: req.body.sku,
		amount: req.body.amount,
		description: req.body.description
	}

	Company.findById(req.params.companyId, (error, company) => {
		if (error) {
			res.json({success: false, msg: 'routes/companyRoutes.js: Failed to find company'});
		} else {
			Company.addItemToInventory(newItem, company, (error, item) => {
				if (error) {
					res.json({success: false, msg: 'routes/companyRoutes.js: Failed to add item to inventory'});
				} else {
					res.json({success: true, msg: 'routes/companyRoutes.js: Added item'});
				}
			});
		}
	});
});

module.exports = router;