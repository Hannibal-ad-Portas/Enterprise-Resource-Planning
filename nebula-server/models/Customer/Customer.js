const mongoose = require('mongoose');

const OrderType = require('../Order/Order').OrderType;

// TODO: Add payment info object 

const CustomerSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	orderHistory: {
		type: [OrderType],
		required: false
	}
});

module.exports = {
	Customer: mongoose.model('Customer', CustomerSchema),
	CustomerType: CustomerSchema
};