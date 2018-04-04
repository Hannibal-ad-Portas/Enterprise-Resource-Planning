const express = require('express');
const bodyParser = require('body-parser');

/*
	TODO: Add Panel Routes
*/

const PORT = 3000 || process.env.PORT;
const server = express();

const companyRoutes = require('./routes/CompanyRoutes');
const employeeRoutes = require('./routes/EmployeeRoutes');
const inventoryRoutes = require('./routes/InventoryRoutes');

require('./config/db');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.use('/api/company', companyRoutes);
server.use('/api/employee', employeeRoutes);
server.use('/api/inventory', inventoryRoutes);

server.listen(PORT, () => {
	console.log(`server running at http://localhost:${PORT}`);
});
