const mongoose = require('mongoose');

const EmployeeType = require('../Employee/Employee').EmployeeType;
const ItemType = require('../Item/Item').ItemType;
const CustomerType = require('../Customer/Customer').CustomerType;

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
	customers: {
		type: [CustomerType],
		required: false
	},
	createdOn: {
		type: Date,
		default: Date.now
	},
	companyCode: {
		type: String,
		required: true,
		unique: true
	},
	parentId: {
		type: String,
		required: true
	},
	subscriptionPlan: {
		type: String,
		required: true
	},
	subscriptionCost: {
		type: Number,
		required: true
	},
	paymentUsed: {
		type: {},
		required: false
	}
});

module.exports = mongoose.model("Company", CompanySchema);