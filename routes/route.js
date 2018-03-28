const express = require('express');
const moment = require('moment');
const bcrypt = require('bcryptjs');

const Company = require('../models/company');

const router = express.Router();

// Create Company Route
router.post('/register', (req, res, next) => {
	let newCompany = new Company({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		dateCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
	});

	bcrypt.genSalt(10, (error, salt) => {
		bcrypt.hash(newCompany.password, salt, (error, hash) => {
			if (error) {
				res.json({success: false, msg: "routes/route.js (line 21): Error with password hashing", errorMessage: error});
			} else {
				newCompany.password = hash;
				Company.createCompany(newCompany, (error, company) => {
					if (error) {
						console.log(`routes/companyRoute.js (line 23): Error adding company, error:${error}...`);
						res.json({success: false, msg: 'routes/route.js (line 23): Error adding company', errorMessage: error});
					} else {
						console.log(`routes/route.js (line 23): Added company to database successfully...`);
						res.json({success: true, msg: 'routes/route.js (line 23): Added company to database successfully'});
					}
				}); 
			}
		});
	});
});

// Find Specific Company Route
router.get('/:companyId/find', (req, res, next) => {
	let id = req.params.companyId;

	Company.findCompany(id, (error, company) => {
		if (error) {
			console.log(`routes/companyRoute.js (line 31): Error finding company, error:${error}...`);
			res.json({success: false, msg: 'routes/companyRoute.js (line 31): Error finding company', errorMessage: error});
		} else {
			console.log(`routes/companyRoute.js (line 31): Found company successfully...`);
			res.json({success: true, msg: 'routes/companyRoute.js (line 31): Found company successfully', companyFound: company});
		}
	});
});

// Find All Company Route
router.get('/find', (req, res, next) => {
	Company.findAll({}, (error, companies) => {
		if (error) {
			console.log(`routes/companyRoute.js (line 44): Error finding companies, error:${error}...`);
			res.json({success: false, msg: 'routes/companyRoute.js (line 44): Error finding companies', errorMessage: error});
		} else {
			console.log(`routes/companyRoute.js (line 44): Found companies successfully...`);
			res.json({success: true, msg: 'routes/companyRoute.js (line 44): Found companies successfully', companiesFound: companies});
		}
	});
});

// Delete Company Route
router.delete('/:companyId/delete', (req, res, next) => {
	let id = req.params.companyId;
	
	Company.deleteCompany(id, (error, company) => {
		if (error) {
			console.log(`routes/companyRoute.js (line 58): Error deleting company, error:${error}...`);
			res.json({success: false, msg: 'routes/companyRoute.js (line 56: Error deleting company', errorMessage: error});
		} else {
			console.log(`routes/companyRoute.js (line 56): Deleted company successfully...`);
			res.json({success: true, msg: 'routes/companyRoute.js (line 56): Deleted company successfully', companyFound: company});
		}
	});
});

// Create Employee Route
router.post('/:companyId/employee/register', (req, res, next) => {
	let id = req.params.companyId;

	let newEmployee = {
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		employeeId: req.body.employeeId,
		permissions: req.body.permissions,
		dateEmployed: moment().format('MMMM Do YYYY, h:mm:ss a'),
		department: req.body.department,
		position: req.body.position,
		employmentStatus: req.body.employmentStatus,
		salary: req.body.salary,
		personalData: req.body.personalData
	};


	Company.findCompany(id, (error, company) => {
		if (error) {
			console.log(`routes/companyRoute.js (line 88): Error finding company, error:${error}...`);
			res.json({success: false, msg: 'routes/companyRoute.js (line 88): Error finding company', errorMessage: error});
		} else {
			/*
			bcrypt.genSalt(10, (error, salt) => {
				if (error) {
					console.log('routes/route.js (line 89): Error with password hashing');
				} else {
					bcrypt.hash(newEmployee.personalData.ssn, salt, (error, hash) => {
						if (error) {
							console.log('routes/route.js (line 91): Error with password hashing');
						} else {
							newEmployee.personalData.ssn = hash;
						}
					});
				}
			});*/
			Company.createEmployee(newEmployee, company, (error, employee) => {
				if (error) {
					console.log(`routes/companyRoute.js (line 93): Error creating employee, error:${error}...`);
					res.json({success: false, msg: 'routes/companyRoute.js (line 93): Error creating employee', errorMessage: error});
				} else {
					console.log(`routes/companyRoute.js (line 93): Created employee...`);
					res.json({success: true, msg: 'routes/companyRoute.js (line 93): Created employee'});
				}
			});
		}
	});
});

//Remove Employee Route
router.delete('/:companyId/employee/:employeeId/remove', (req, res, next) => {
	let companyId = req.params.companyId;

	Company.findCompany(companyId, (error, company) => {
		if (error) {
			console.log('couldnt find company');
		} else {
			let employees = company.employees;
			let idToCheck = req.params.employeeId;

			for (let i = 0; i < employees.length; i++) {
				let employeeId = employees[i].entries().next().value[1].employeeId;

				if (employeeId.toString() === idToCheck.toString()) {
					company.employees.splice(i, 1);
					company.save((error, company) => {
						if (error) {
							console.log(`router/route.js line(148): Error removing employee, error${error}...`);
							res.json({success: false, msg:'router/route.js (line 148): Error removing employee...', error: error});
						} else {
							res.json({success: true, msg:'router/route.js (line 148): Employee removed successfully...'});
						}
					});
				}
			}
		}
	})
});

//Update Employee Route
//TODO: Handle password changes
router.post('/:companyId/employee/:employeeId/update', (req, res, next) => {
	let companyId = req.params.companyId;
	let updatedEmployee = req.body.employeeUpdate;

	Company.findCompany(companyId, (error, company) => {
		if (error) {
			console.log('couldnt find company');
		} else {
			let employees = company.employees;
			let idToCheck = req.params.employeeId;

			for (let i = 0; i < employees.length; i++) {
				let employeeId = employees[i].entries().next().value[1].employeeId;

				if (employeeId.toString() === idToCheck.toString()) {
					company.employees.splice(i, 1);
					company.employees.push(updatedEmployee);
					company.save((error, company) => {
						if (error) {
							console.log(`router/route.js line(180): Error updating employee, error${error}...`);
							res.json({success: false, msg:'router/route.js (line 180): Error updating employee...', error: error});
						} else {
							res.json({success: true, msg:'router/route.js (line 180): Employee updated successfully...'});
						}
					});
				}
			}
		}
	})
});

// Add Item To Inventory Route
router.post('/:companyId/inventory/addItem', (req, res, next) => {
	let id = req.params.companyId;
	
	let newItem = {
		name: req.body.name,
		description: req.body.description,
		sku: req.body.sku,
		amount: req.body.amount
	};

	Company.findCompany(id, (error, company) => {
		if (error) {
			console.log(`routes/route.js (line 206): Error finding company, error:${error}...`);
		} else {
			Company.addItemToInventory(newItem, company, (error, item) => {
				if (error) {
					console.log(`routes/route.js (line 210): Error adding item to inventory, error:${error}...`);
				} else {
					console.log(`routes/route.js (line 210): Item added successfully...`);
					res.json({success: true, msg:"routes/route.js (line 210): Item added successfully..."});
				}
			})
		}
	});
});

router.post('/:companyId/inventory/:itemSku/add/:amt', (req, res, next) => {
	let id = req.params.companyId;
	let item = req.params.itemSku;
	let amt = req.params.amt;

	Company.findCompany(id, (error, company) => {
		if (error) {
			console.log(`routes/route.js line(222): Error finding company, error:${error}...`);
		} else {
			Company.addAmountToItem(item, company, amt, (error, item) => {
				if (error) {
					console.log(`routes/route.js line(222): Error adding amount to item, error:${error}`);
				} else {
					res.json({success: true, msg:"Added amount to item successfully"});
				}
			});
		}
	});
});

module.exports = router;