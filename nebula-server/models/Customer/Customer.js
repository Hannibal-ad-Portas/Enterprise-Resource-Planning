const mongoose = require('mongoose');

const PaymentInfoType = require('../PaymentInfo/PaymentInfo').PaymentInfoType;

// TODO: Add payment info object 

const CustomerSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	address: {
		type: {},
		required: true
	},
	orderHistory: {
		type: [],
		required: false
	},
	paymentInfo: {
		type: [],
		required: false
	}
});

module.exports = {
	Customer: mongoose.model('Customer', CustomerSchema),
	CustomerType: CustomerSchema
};