const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/User/User').User;

const opts = require('../config/auth');

module.exports = (passport) => {
	passport.use('userLogin', new JwtStrategy(opts, (jwt_payload, done) => {
		User.findOne({'email': jwt_payload.data.email}, (err, user) => {
			if (!user) {
				return done(null, false);
			} 

			return done(null, user);
		}) 
	}));
}