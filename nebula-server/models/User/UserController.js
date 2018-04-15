const User = require('./User').User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const opts = require('../../config/auth');

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

exports.authenticateLogin = (req, res) => {
	User.findOne({"email": req.body.email}, (err, user) => {
		if (err) {
			res.status(500).json(err);
		}

		if (!user) {
			res.status(404).json({message: 'User not found'});
		}

		comparePassword(req.body.password, user.password, (err, isMatch) => {
			if (isMatch) {
				const token = jwt.sign(
					{data: user},
					opts.secretOrKey,
					{ expiresIn: 604800 }
				);
				res.json({
					success: true,
					token: 'Bearer ' + token,
					user: {
						id: user._id,
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email
					}
				});
			} else {
				return res.json({success: false, msg: 'Wrong password'});
			}
		});
	})
};

exports.addPaymentMethod = (req, res) => {
	User.findById(req.params.id, (err, user) => {
		if (err) {
			res.status(500).json(err);
		}

		if (!user) {
			res.status(404).json({message: 'User not found'});
		}

		let newPayment = req.body;

		user.paymentMethods.push(newPayment);
		user.save((err, user) => {
			if (err) {
				res.status(500).json(err);
			} 

			if (!user) {
				res.staus(404).json({message: 'User not found'});
			}

			res.status(201).json({message: 'Created payment method'});
		})
	});
}

const comparePassword = (candidatePassword, hash, callback) => {
	bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
		if (err) {
			return err;
		}
		callback(null, isMatch);
	});
};