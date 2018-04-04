const express = require('express')

const employeeController = require('../models/Employee/EmployeeController');

const router = express.Router();

router.post('/:companyId/createNewEmployee', employeeController.createNewEmployee);

router.get('/:companyId/all', employeeController.listAllEmployees);

router.get('/:companyId/:employeeId/find', employeeController.findEmployeeById);

router.put('/:companyId/:employeeId/update', employeeController.updateEmployee);

router.delete('/:companyId/:employeeId/delete', employeeController.deleteEmployee);

router.post('/:companyId/authenticate/login', employeeController.authenticateLogin);

module.exports = router;