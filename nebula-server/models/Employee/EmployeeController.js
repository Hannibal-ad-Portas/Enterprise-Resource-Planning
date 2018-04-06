const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Employee = require('./Employee').Employee;
const Company = require('../Company/Company');
const opts = require('../../config/auth');

/*
	TODO: Add Authentication
	TODO: Add Password Checking
*/

exports.createNewEmployee = (req, res) => {
	let newEmployee = new Employee(req.body);

	Company.findById(req.params.companyId, (err, company) => {
		if (err) {
			res.status(500).send(err);
		}

		if (!company) {
			res.status(404).send({message: 'Company not found'});
		}

		bcrypt.genSalt(10, (err, salt) => {
			if (err) {
				res.status(500).send(err);
			}

			bcrypt.hash(newEmployee.password, salt, (err, hash) => {
				if (err) {
					res.status(500).send(err);
				}

				newEmployee.parentCompanyCode = company.companyCode;
				newEmployee.password = hash;

				company.employees.push(newEmployee);
				company.save((err, employee) => {
					if (err) {
						res.status(500).send(err);
					}
					res.status(201).json(employee);
				});
			});
		});
	});
};

exports.listAllEmployees = (req, res) => {
	Company.findById(req.params.companyId, (err, company) => {
		if (err) {
			res.status(500).send(err);
		}

		if (!company) {
			res.status(404).send({message: 'Company not found'});
		}

		let employees = company.employees;

		res.status(200).json(employees);
	});
};

exports.findEmployeeById = (req, res) => {
	Company.findById(req.params.companyId, (err, company) => {
		if (err) {
			res.status(500).send(err);
		}

		if (!company) {
			res.status(404).send({message: 'Company not found'});
		}

		let employee = company.employees.id(req.params.employeeId);
		
		if (!employee) {
			res.status(404).send({message: 'Employee not found'});
		}

		res.status(200).json(employee);
	});
};

exports.updateEmployee = (req, res) => {
	Company.findOneAndUpdate(
		{ "_id": req.params.companyId, "employees._id": req.params.employeeId },
		{
			"$set": {
				"employees.$": req.body
			}
		},
		(err, employee) => {
			if (err) {
				res.status(500).send(err);
			}
			res.status(200).json(employee);
	});
};

exports.deleteEmployee = (req, res) => {
	Company.findById(req.params.companyId, (err, company) => {
		if (err) {
			res.status(500).send(err);
		}

		if (!company) {
			res.status(404).send({message: 'Company not found'});
		}

		let employees = company.employees;

		for (let i = 0; i < employees.length; i++) {
			let employeeToCheck = employees[i];

			if (req.params.employeeId.toString() === employeeToCheck._id.toString()) {
				company.employees.splice(i, 1);
				company.save((err, company) => {
					if (err) {
						res.status(500).send(err);
						return true;
					}

					res.status(200).json(company);
					return true;
				});
			}
		}
	});
}

exports.authenticateLogin = (req, res) => {
	Company.findById(req.params.companyId, (err, company) => {
		if (err) {
			res.status(500).send(err);
		}

		if (!company) {
			res.status(400).json({message: 'Company not found'});
		}

		let employees = company.employees;
		let employee;

		for (let i = 0; i < employees.length; i++) {
			if (req.body.email === employees[i].email) {
				employee = employees[i];
			}
		}

		comparePassword(req.body.password, employee.password, (err, isMatch) => {
			if (err) {
				res.status(500).send(err);
			}
			if (isMatch) {
				const token = jwt.sign(
					{ data: employee },
					opts.secretOrKey,
					{ expiresIn: 604800 }
				);
				res.json({
					success: true,
					token: 'Bearer ' + token,
					employee: {
						id: employee._id,
						firstName: employee.firstName,
						lastName: employee.lastName,
						email: employee.email,
						parentId: company._id
					}
				});
			} else {
				return res.json({success: false, msg: 'Wrong password'});
			}
		});
	});
};

const comparePassword = (candidatePassword, hash, callback) => {
	bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
		if (err) {
			throw err;
		}
		callback(null, isMatch);
	});
};