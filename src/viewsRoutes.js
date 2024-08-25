const { Router } = require("express")
const routes = new Router();

//import API routes files
const loginRoutes = require('./routes/views/login');

//use views routes files
routes.use('/', loginRoutes);

module.exports = routes;