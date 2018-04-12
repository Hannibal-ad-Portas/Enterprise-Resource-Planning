const User = require('./User').User;
const bcrypt = require('bcryptjs');

exports.createNewUser = (req, res) => {
	let newUser = new User(req.body);
	newUser.dateCreated = Date.now();

	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			res.status(500).json(err);
		}

		bcrypt.hash(newUser.password, salt, (err, hash) => {
			newUser.password = hash;
			newUser.save((err, user) => {
				if (err) {
					res.status(500).json(err);
				}

				res.status(201).json({message: 'User Created'});
			});
		});
	});
};