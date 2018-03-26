const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Import other schemas
const Company = require('./company');

const EmployeeSchema = new Schema({
	username: {
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
	employeeId: {
		type: Number,
		required: true
	},
	permissions: {
		type: [String],
		required: true
	},
	dateEmployed: {
		type: String,
		required: true
	},
	department: {
		type: String,
		required: true
	},
	position: {
		type: String,
		required: true
	},
	employmentStatus: {
		type: String,
		required: true
	},
	salary: {
		type: Number,
		required: true
	},
	personalData: {
		type: [String],
		required: false
	}
});

const Employee = module.exports = mongoose.model('Employee', EmployeeSchema);