const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	salary: {
		type: String,
		required: false,
		default: "null"
	},
	permissions: {
		type: [String],
		required: false,
		default: "null"
	},
	department: {
		type: String,
		required: false,
		default: "null"
	},
	position: {
		type: String,
		required: false,
		default: "null"
	},
	createdOn: {
		type: Date,
		default: Date.now
	},
	parentCompanyCode: {
		type: String,
		required: true
	}
});

module.exports = {
	Employee: mongoose.model('Employee', EmployeeSchema),
	EmployeeType: EmployeeSchema
};