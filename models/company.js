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
		console.log('models/company.js line(71): Cannot add item, item already exists...');
	} else {
		company.inventory.push(item);
		company.save(callback);
	}
};

module.exports.addAmountToItem = function(item, company, amount, callback) {
	let itemIndex = getItemIndex(item, company.inventory);
	let inventory = company.inventory;

	let itemAmountFound = inventory[itemIndex].entries().next().value[1].amount.toString();
	let amt = amount.toString();

	/*
	inventory[itemIndex].entries().next().value[1].amount = parseInt(itemAmountFound) + parseInt(amt);
	company.save((error, success) => {
		if (error) {
			console.log('fuck you');
		} else {
			console.log('fuck me');
		}
	});*/

	let itemToUpdate = inventory.splice(itemIndex, 1);
	itemToUpdate = itemToUpdate.entries().next().value[1]
	itemToUpdate = itemToUpdate.splice(0, 1);
	itemToUpdate = itemToUpdate.splice(0, 1);

	console.log(itemToUpdate);

	let newAmt = parseInt(itemToUpdate.entries().next().value[1].amount.toString()) + parseInt(amt);
};

module.exports.subtractAmountFromItem = function(item, company, amount, callback) {
	if (itemMatches(item, company.inventory)) {
		company.item.amount -= amount;
		company.save(callback);
	} else {
		console.log('models/company.js line(85): Cannot decrement item amount, item not found...');
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

function itemMatches(itemSku, array) {
	for (let i = 0; i < array.length; i++) {
		let sku = array[i].entries().next().value[1].sku;
		//let skuToCheck = obj.sku;
		if (sku === itemSku) {
			return true;
		}
	}

	return false;
};

function getItemIndex(itemSku, array) {
	for (let i = 0; i < array.length; i++) {
		if (itemMatches(itemSku, array)) {
			return i;
		}
	}
};