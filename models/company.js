const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcryptjs');

// Set Schema variable
const Schema = mongoose.Schema;

// Import other schemas
const Employee = require('./employee');

// Create the model
const CompanySchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	employees: {
		type: [[]],
		required: false,
	},
	inventory: {
		type: [[]],
		required: false
	},
	dateCreated: {
		type: String,
		required: true
	}
});

const Company = module.exports = mongoose.model('Company', CompanySchema);

module.exports.createCompany = function(newCompany, callback) {
	newCompany.save(callback);
};

module.exports.findCompany = function(query, callback) {
	Company.findById(query, callback);
};

module.exports.findAll = function(query, callback) {
	Company.find(query, callback);
};

module.exports.deleteCompany = function(query, callback) {
	Company.findByIdAndRemove(query, callback);
};

module.exports.createEmployee = function(newEmployee, company, callback) {
	if (emailMatches(newEmployee, company.employees)) {
		console.log('models/company.js line(57): Cannot add user, user already exists');
	} else {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newEmployee.password, salt, (error, hash) => {
				newEmployee.password = hash;
				company.employees.push(newEmployee);
				company.save(callback);
			});
		});
	}
};

module.exports.addItemToInventory = function(item, company, callback) {
	if (itemMatches(item, company.inventory)) {
		console.log('models/company.js line(71): Cannot add item, item already exists');
	} else {
		company.inventory.push(item);
		company.save(callback);
	}
};

function emailMatches(obj, array) {
	for (let i = 0; i < array.length; i++) {
		let email = array[i].entries().next().value[1].email;
		let emailToCheck = obj.email;
		if (email.toString() === emailToCheck.toString()) {
			return true;
		}
	}

	return false;
};

function itemMatches(obj, array) {
	for (let i = 0; i < array.length; i++) {
		let sku = array[i].entries().next().value[1].sku;
		let skuToCheck = obj.sku;
		if (sku.toString() === skuToCheck.toString()) {
			return true;
		}
	}

	return false;
};