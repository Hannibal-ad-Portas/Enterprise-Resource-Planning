const Company = require('./Company');

exports.createNewCompany = (req, res) => {
	let newCompany = new Company(req.body);
	
	newCompany.save((err, company) => {
		if (err) {
			res.status(500).send(err);
		}

		res.status(201).json(company);
	});
};

exports.listAllCompanies = (req, res) => {
	Company.find({}, (err, company) => {
		if (err) {
			res.status(500).send(err)
		}

		res.status(200).json(company);
	});
};

exports.findCompanyById = (req, res) => {
	Company.findById(req.params.companyid, (err, company) => {
		if (err) {
			res.status(500).send(err);
		}

		res.status(200).json(company);
	});
};

exports.updateCompany = (req, res) => {
	Company.findOneAndUpdate(
		{ _id: req.params.companyid },
		req.body,
		{ new: true },
		(err, company) => {
			if (err) {
				res.status(500).send(err);
			}

			res.status(200).json(company);
		}
	);
};

exports.deleteCompany = (req, res) => {
	Company.remove({ _id: req.params.companyid }, (err, company) => {
		if (err) {
			res.status(404).send(err);
		}

		res.status(200).json(company);
	});
};