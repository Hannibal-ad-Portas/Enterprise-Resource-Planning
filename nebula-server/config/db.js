const mongoose = require('mongoose');

const dbUri = 'mongodb://dev:BZzPXXG8N48Kk04q@neubula-cluster-0-shard-00-00-eqgp3.mongodb.net:27017,neubula-cluster-0-shard-00-01-eqgp3.mongodb.net:27017,neubula-cluster-0-shard-00-02-eqgp3.mongodb.net:27017/test?ssl=true&replicaSet=Neubula-Cluster-0-shard-0&authSource=admin';

const options = {
	reconnectTries: Number.MAX_VALUE,
	poolSize: 10
};

mongoose.connect(dbUri, options).then(
	() => {
		console.log('Established database connection');
	},
	err => {
		console.log('Error connecting to database cluster, err: ' + err);
	}
);

require('../models/Company/Company');
require('../models/Employee/Employee').Employee;
require('../models/Item/Item').Item;