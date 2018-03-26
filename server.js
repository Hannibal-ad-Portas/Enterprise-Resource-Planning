const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const server = express();

// Bring in routes
const company = require('./routes/route');

// Set up mongoose connection
mongoose.connect(process.env.DB_CONNECTION_STRING);

// Configure database connection to mongoose
const db = mongoose.connection;
db.on('error', (error) => {
	console.log(`server.js (line 14): Error connecting to database, error:${error}...`);
});
db.on('open', () => {
	console.log(`server.js (line 17): Connected to database...`);
});

// Body Parser Middleware
server.use(bodyParser.json({extended: true}));

// Set up index route
server.get('/', (req, res) => {
	res.send('server.js (line 27): Invalid endpoint...')
});

// Set up company route
server.use('/api/company', company);

// Start the server
server.listen(process.env.PORT, () => {
	console.log(`server.js (line 26): Server running on port:${process.env.PORT}...`);
});