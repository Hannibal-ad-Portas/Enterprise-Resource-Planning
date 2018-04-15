const express = require('express');
const passport = require('passport');

const employeeController = require('../models/Employee/EmployeeController');

const router = express.Router();

router.post('/:companyCode/createNewEmployee', employeeController.createNewEmployee);

router.get('/:companyId/all', employeeController.listAllEmployees);

router.get('/:companyId/:employeeId/find', employeeController.findEmployeeById);

router.put('/:companyId/:employeeId/update', employeeController.updateEmployee);

router.delete('/:companyId/:employeeId/delete', employeeController.deleteEmployee);

router.post('/:companyCode/authenticate/login', employeeController.authenticateLogin);

router.get('/:companyId/employeeData', passport.authenticate('employeeLogin', {session: false}), (req, res, next) => {
	let employee = req.user;
	res.json(employee);
});
 
module.exports = router; 