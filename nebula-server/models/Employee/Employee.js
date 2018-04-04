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
		required: false
	},
	permissions: {
		type: [String],
		required: false
	},
	department: {
		type: String,
		required: false
	},
	position: {
		type: String,
		required: false
	},
	createdOn: {
		type: Date,
		default: Date.now
	}
});

module.exports = {
	Employee: mongoose.model('Employee', EmployeeSchema),
	EmployeeType: EmployeeSchema
};