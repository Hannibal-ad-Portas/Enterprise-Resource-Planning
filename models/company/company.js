const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Employee = require('../employees/employee');
//TODO: Convert inventory to schema maybe

// Company Schema
const CompanySchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	employees: {
		type: [[]],
		required: false
	},
	inventory: {
		type: [[]],
		required: false
	}
});

const Company = module.exports = mongoose.model('Company', CompanySchema);

module.exports.getCompanyByID = function(id, callback) {
	Company.findById(id, callback);
};

module.exports.getCompanyByUsername = function(username, callback) {
	const query = {username: username};
	Company.findOne(query, callback);
};

module.exports.getCompanyByName = function(name, callback) {
	const query = {name: name};
	Company.findOne(query, callback);
};

module.exports.addCompany = function(newCompany, callback) {
	bcrypt.genSalt(10, (error, salt) => {
		bcrypt.hash(newCompany.password, salt, (error, hash) => {
			if (error) {
				console.log(`models/Company/company.js: Failed to add Company, error:${error}`);
			} else {
				newCompany.password = hash;
				newCompany.save(callback);
			}
		});
	});
};

module.exports.addItemToInventory = function(itemToAdd, company, callback) {
	company.inventory.push(itemToAdd);
	company.save((error, item) => {
		if (error) {
			console.log(`models/company/company.js: Failed to add item ${item} to inventory, error:${error}`);
		} else {
			console.log(`models/company/company.js: Added item ${item} to inventory`);
		}
	});
};