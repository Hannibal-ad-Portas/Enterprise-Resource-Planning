const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Organization Schema
const OrgSchema = mongoose.Schema({
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
	}
});

const Organization = module.exports = mongoose.model('Organization', OrgSchema);

module.exports.getOrgByID = function(id, callback) {
	Organization.findById(id, callback);
};

module.exports.getOrgByUsername = function(username, callback) {
	const query = {username: username};
	Organization.findOne(query, callback);
};

module.exports.addOrganization = function(newOrg, callback) {
	bcrypt.genSalt(10, (error, salt) => {
		bcrypt.hash(newOrg.password, salt, (error, hash) => {
			if (error) {
				console.log(`models/organization/organization.js: Failed to add organization, error:${error}`);
			} else {
				newOrg.password = hash;
				newOrg.save(callback);
			}
		});
	});
};