const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

/*
	TODO: Add Panel Routes
*/

const PORT = 3000 || process.env.PORT;
const server = express();

const companyRoutes = require('./routes/CompanyRoutes');
const employeeRoutes = require('./routes/EmployeeRoutes');
const inventoryRoutes = require('./routes/InventoryRoutes');
const customerRoutes = require('./routes/CustomerRoutes');
const userRoutes = require('./routes/UserRoutes');

require('./config/db');
require('./auth/EmployeeLoginStrategy')(passport);
require('./auth/UserLoginStrategy')(passport);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.use(cors());
server.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

server.use('/api/company', companyRoutes);
server.use('/api/employee', employeeRoutes);
server.use('/api/inventory', inventoryRoutes);
server.use('/api/customer', customerRoutes);
server.use('/api/user', userRoutes);

server.listen(PORT, () => {
	console.log(`server running at http://localhost:${PORT}`);
});
