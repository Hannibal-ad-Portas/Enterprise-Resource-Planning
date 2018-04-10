const express = require('express');

const customerController = require('../models/Customer/CustomerController');

const router = express.Router();

router.post('/:companyId/create', customerController.createNewCustomer);

router.get('/:companyId/all', customerController.listAllCustomers);

router.get('/:companyId/:customerId/find', customerController.findCustomerById);

router.put('/:companyId/:customerId/update', customerController.updateCustomer);

router.delete('/:companyId/:customerId/delete', customerController.deleteCustomer);

router.post('/:companyId/:customerId/addPaymentMethod', customerController.addPaymentMethod);

router.delete('/:companyId/:customerId/:cardNumber/removePaymentMethod', customerController.removePaymentMethod);

module.exports = router;