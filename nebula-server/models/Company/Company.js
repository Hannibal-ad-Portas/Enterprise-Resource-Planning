const mongoose = require('mongoose');

const EmployeeType = require('../Employee/Employee').EmployeeType;
const ItemType = require('../Item/Item').ItemType;

const Schema = mongoose.Schema;

/* 
	TODO: Add Customer List
*/
const CompanySchema = new Schema({
	companyName: {
		type: String,
		required: true
	},
	employees: {
		type: [EmployeeType],
		required: false
	},
	inventory: {
		type: [ItemType],
		required: false
	},
	createdOn: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Company", CompanySchema);