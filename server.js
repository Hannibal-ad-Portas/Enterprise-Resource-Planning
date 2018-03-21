const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const server = express();
const PORT = 3000;

// DB Config
const dbConfig = require('./config/dbConfig');

// Route Imports
const companies = require('./routes/companyRoutes');
const employees = require('./routes/employeeRoutes');

// Cors Middleware
server.use(cors());

// BodyParser Middleware
server.use(bodyParser.json());

// Connect Server To Database
mongoose.connect(dbConfig.connectionURI);
mongoose.connection.on('connected', () => {
	console.log('server.js: Connected mongoose to database...');
});
mongoose.connection.on('error', (error) => {
	console.log(`server.js: Failed to connect mongoose to database, error:${error}`);
});

// Index Route
server.get('/', (req, res) => {
	res.send('server.js: Invalid Endpoint...');
});

// Company Route
server.use('/api/companies', companies);

// Employee Route
server.use('/api/employees', employees);

server.listen(PORT, () => {
	console.log(`server.js: Server started on port:${PORT}...`);
});