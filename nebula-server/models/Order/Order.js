const mongoose = require('mongoose');

const ItemType = require('../Item/Item').ItemType;
const PaymentInfo = require('../PaymentInfo/PaymentInfo');

const OrderSchema = mongoose.Schema({
	orderCode: {
		type: String,
		required: true,
		unique: true
	},
	sender: {
		type: {},
		required: true
	},
	reciever: {
		type: {},
		required: true
	},
	itemOrdered: {
		type: ItemType,
		required: true
	},
	amountOrdered: {
		type: Number,
		required: true
	},
	priceOfOrder: {
		type: Number,
		required: true
	}
});

module.exports = {
	Order: mongoose.model('Order', OrderSchema),
	OrderType: OrderSchema
};