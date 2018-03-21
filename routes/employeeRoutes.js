const express = require('express');
const path = require('path');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Company = require('../models/company/company');
const Employee = require('../models/employees/employee');
const PersonalData = require('../models/employees/personalData');

const router = express.Router();

router.post('/:companyId/register', (req, res, next) => {
	let newEmployee = new Employee({
		email: req.body.email,
		password: req.body.password,
		employeeId: req.body.employeeId,
		employmentDate: req.body.employmentDate,
		department: req.body.department,
		position: req.body.position,
		salary: req.body.salary,
		permissions: req.body.permissions,
		personalData: req.body.personalData
	});

	Company.findById(req.params.companyId, (error, company) => {
		if (error) {
			res.send({success: false, msg:"Failed to add employee"});
		} else {
			Employee.addEmployee(newEmployee, company);
		}
	})
});

router.delete('/:companyId/remove_employee/:id', (req, res, next) => {
	Company.findById(req.params.companyId, (error, company) => {
		if (error) {
			res.send({success: false, msg:"Failed to remove employee, error:" + error});
		} else {
			for (let i = 0; i < company.employees.length; i++) {
				let id = company.employees[i].entries().next().value[1]._id;
				if (id.toString() === req.params.id.toString()) {
					company.employees.splice(i, 1);
					company.save();
				}
			}
		}
	});
});

module.exports = router;