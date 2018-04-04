const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	sku: {
		type: String,
		required: true
	},
	amount: {
		type: {},
		required: true
	},
	currentLocation: {
		type: {},
		required: false
	},
	locationHistory: {
		type: {},
		required: false
	},
});

module.exports = {
	Item: mongoose.model('Item', ItemSchema),
	ItemType: ItemSchema
};