const mongoose = require('mongoose');

const PaymentInfo = require('../PaymentInfo/PaymentInfo');
const OrderType = require('../Order/Order').OrderType;

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
		type: [OrderType],
		required: false
	},
	paymentInfo: {
		type: [PaymentInfo],
		required: false
	}
});

module.exports = {
	Customer: mongoose.model('Customer', CustomerSchema),
	CustomerType: CustomerSchema
};