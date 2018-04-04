const express = require('express');

const companyController = require('../models/Company/CompanyController');

const router = express.Router();

router.post('/createCompany', companyController.createNewCompany);

router.get('/all', companyController.listAllCompanies);

router.get('/:companyid/find', companyController.findCompanyById);

router.put('/:companyid/edit', companyController.updateCompany);

router.delete('/:companyid/delete', companyController.deleteCompany);

module.exports = router;