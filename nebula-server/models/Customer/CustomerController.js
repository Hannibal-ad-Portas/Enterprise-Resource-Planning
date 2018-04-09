const Customer = require('./Customer').Customer;
const Company = require('../Company/Company');
const PaymentInfo = require('../PaymentInfo/PaymentInfo');

exports.createNewCustomer = (req, res) => {
	let newCustomer = new Customer(req.body);
	let companyId = req.params.companyId;

	Company.findById(companyId, (err, company) => {
		if (err) {
			res.status(500).json(err);
		}

		if (!company) {
			res.status(404).json({message: 'Company Not Found'});
		}

		company.customers.push(newCustomer);
		company.save((err, customer) => {
			if (err) {
				res.status(500).json(err);
			}
			res.status(201).json(customer);
		});
	});
};

exports.listAllCustomers = (req, res) => {
	Company.findById(req.params.companyId, (err, company) => {
		if (err) {
			res.status(500).json(err);
		}
		
		if (!company) {
			res.status(404).json({message: 'Company Not Found'});
		}

		let customers = company.customers;
		res.status(200).json(customers);
	});
};

exports.findCustomerById = (req, res) => {
	Company.findById(req.params.companyId, (err, company) => {
		if (err) {
			res.status(500).json(err);
		}

		if (!company) {
			res.status(404).send({message: 'Company not found'});
		}

		let customer = company.customers.id(req.params.customerId);

		if (!customer) {
			res.status(404).json({message: 'Customer Not Found'});
		}

		res.status(200).json(customer);
	});
};

exports.updateCustomer = (req, res) => {
	Company.findOneAndUpdate(
		{ "_id": req.params.companyId, "customers._id": req.params.customerId },
		{
			"$set": {
				"customers.$": req.body
			}
		},
		(err, customer) => {
			if (err) {
				res.status(500).json(err);
			}
			res.status(200).json(customer);
	});
};

exports.deleteCustomer = (req, res) => {
	Company.findById(req.params.companyId, (err, company) => {
		if (err) {
			res.status(500).json(err);
		}

		if (!company) {
			res.status(404).json({message: 'Company not found'});
		}

		let customers = company.customers;

		for (let i = 0; i < customers.length; i++) {
			let customerToCheck = customers[i];

			if (req.params.customerId.toString() === customerToCheck._id.toString()) {
				company.customers.splice(i, 1);
				company.save((err, company) => {
					if (err) {
						res.status(500).json(err);
						return false;
					} 
					res.status(200).json(company);
					return true;
				});
			}
		}
	});
};

exports.addPaymentMethod = (req, res) => {
	let newPaymentMethod = new PaymentInfo(req.body.cardNumber, req.body.cardHolder, req.body.expiration, req.body.cvv);

	Company.findById(req.params.companyId, (err, company) => {
		if (err) {
			res.status(500).json(err);
		}

		if (!company) {
			res.status(404).json({message: 'Company not found'});
		}

		let customers = company.customers;

		for (let i = 0; i < customers.length; i++) {
			let customerToCheck = customers[i];

			if (req.params.customerId.toString() === customerToCheck._id.toString()) {
				//company.customers.paymentInfo.push(newPaymentMethod);
				console.log(company.customers.paymentInfo);
			}
		}
	});
};