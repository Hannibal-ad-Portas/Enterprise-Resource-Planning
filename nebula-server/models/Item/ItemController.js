const Item = require('./Item').Item;
const Company = require('../Company/Company');

/*
	TODO: Add Authentication
*/

exports.createNewItem = (req, res) => {
	let newItem = new Item(req.body);
	
	Company.findById(req.params.companyId, (err, company) => {
		if (err) {
			res.status(500).send(err)
		}

		if (!company) {
			res.status(404).json({message: 'Company not found'})
		}

		company.inventory.push(newItem);
		company.save((err, company) => {
			if (err) {
				res.status(500).send(err);
			}

			res.status(200).json(company);
		});
	});
}

exports.listAllItems = (req, res) => {
	Company.findById(req.params.companyId, (err, company) => {
		if (err) {
			res.status(500).send(err);
		}

		if (!company) {
			res.status(404).json({message: 'Company not found'});
		}

		let inventory = company.inventory;

		res.status(200).json(inventory);
	});
};

exports.findItemById = (req, res) => {
	Company.findById(req.params.companyId, (err, company) => {
		if (err) {
			res.status(500).send(err);
		}

		if (!company) {
			res.status(404).send({message: 'Company not found'});
		}

		let item = company.inventory.id(req.params.itemId);

		if (!item) {
			res.status(404).json({message: 'Item not found'});
		}

		res.status(200).json(item);
	});
};

exports.updateItem = (req, res) => {
	Company.findOneAndUpdate(
		{ "_id": req.params.companyId, "inventory._id": req.params.itemId },
		{
			"$set": {
				"inventory.$": req.body
			}
		},
		(err, item) => {
			if (err) {
				res.status(500).json(error);
			}

			res.status(200).json(item);
	});
};

exports.deleteItem = (req, res) => {
	Company.findById(req.params.companyId, (err, company) => {
		if (err) {
			res.status(500).send(err);
		}

		if (!company) {
			res.status(404).send({message: 'Company not found'});
		}

		let inventory = company.inventory;

		for (let i = 0; i < inventory.length; i++) {
			let itemToCheck = inventory[i];

			if (req.params.itemId.toString() === itemToCheck._id.toString()) {
				company.inventory.splice(i, 1);
				company.save((err, company) => {
					if (err) {
						res.status(500).send(err);
						return true;
					}

					res.status(200).json(company);
					return true;
				});
			}
		}
	});
};