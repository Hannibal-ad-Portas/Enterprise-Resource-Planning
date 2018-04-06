const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const Company = require('../models/Company/Company');
const Employee = require('../models/Employee/Employee');
const opts = require('../config/auth');

module.exports = (passport) => {
	passport.use('employeeLogin', new JwtStrategy(opts, (jwt_payload, done) => {
		Company.findOne({"companyCode": jwt_payload.data.parentCompanyCode}, (err, company) => {
			let employees = company.employees;
			let email = jwt_payload.data.email;

			for (let i = 0; i < employees.length; i++) {
				let employee = employees[i];

				if (email === employee.email) {
					return done(null, employee);
				}
			}
		});
	}));
}