const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Company = require('../company/company');
const PersonalData = require('./personalData');

const EmployeeSchema = mongoose.Schema({
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
	employmentDate: {
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
	salary: {
		type: Number,
		required: true
	},
	permissions: {
		type: [String],
		required: true,
	},
	personalData: {
		type: PersonalData,
		required: false
	}
});

const Employee = module.exports = mongoose.model('Employee', EmployeeSchema);

module.exports.getEmployeeByEmployeeID = function(employeeId, callback) {
	const query = {employeeId: employeeId};
	Employee.findOne(query, callback);
};

module.exports.getEmployeeByName = function(firstName, lastName, callback) {
	const query = {
		firstName: firstName, 
		lastName: lastName
	};
	Employee.findOne(query, callback);
};

module.exports.addEmployee = function(newEmployee, company) {
	bcrypt.genSalt(10, (error, salt) => {
		bcrypt.hash(newEmployee.password, salt, (error, hash) => {
			if (error) {
				console.log(`models/employee/employee.js: Failed to add Employee, error:${error}`);
			} else {
				newEmployee.password = hash;
				company.employees.push(newEmployee);
				company.numberOfEmployees++;
				company.save();
			}
		});
	});
};