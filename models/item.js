const mongoose = require('mongoose');
const express = require('express');

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
		type: Number,
		required: true
	}
});

const Item = module.exports = mongoose.model("Item", ItemSchema);