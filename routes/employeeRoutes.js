const express = require('express');
const path = require('path');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Company = require('../models/company/company');
const Employee = require('../models/employees/employee');
const PersonalData = require('../models/employees/personalData');

const router = express.Router();

//TODO: update route
//TODO: Better debug messages 

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
			res.send({success: false, msg:"Failed to add employee, error:"+ error});
		} else {
			Employee.addEmployee(newEmployee, company);
		}
	});
});

router.get('/:companyId/employees', (req, res, next) => {
	let companyId = req.params.companyId;
	Company.findById(companyId, (error, company) => {
		if (error) {
			res.send(`routes/employeeRoutes.js line 39: Failed to retrieve company, error:${error}`);
		} else {
			console.log('`routes/employeeRoutes.js line 41: Found company');
			res.send(company.employees);
		}
	});
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
					company.save((error, employee) => {
						if (error) {
							res.send("Failed to remove employee");
						} else {	
							res.send("Removed employee");
						}
					});
				}
			}
		}
	});
});

module.exports = router;