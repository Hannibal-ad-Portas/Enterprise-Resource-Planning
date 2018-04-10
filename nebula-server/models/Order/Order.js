const mongoose = require('mongoose');

const PaymentInfoType = require('../PaymentInfo/PaymentInfo').PaymentInfoType;
const ItemType = require('../Item/Item').ItemType;

const OrderSchema = mongoose.Schema({
	sender: {
		type: {},
		required: true
	},
	reciever: {
		type: {},
		required: true
	},
	paymentUsed: {
		type: PaymentInfoType,
	},
	item: {
		type: ItemType,
		required: true
	}
});

module.exports = {
	Order: mongoose.model('Order', OrderSchema),
	OrderType: OrderSchema
};