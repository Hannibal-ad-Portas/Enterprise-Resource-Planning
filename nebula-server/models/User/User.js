const mongoose = require('mongoose');

const PaymentInfoType = require('../PaymentInfo/PaymentInfo');

const UserSchema = mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	dateCreated: {
		type: String,
		required: true
	},
	companies: {
		type: [],
		required: false
	},
	paymentMethods: {
		type: [],
		required: false
	}
});

module.exports = {
	User: mongoose.model('User', UserSchema),
	UserType: UserSchema
};