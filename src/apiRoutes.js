const { Router } = require("express")
const routes = new Router();

//import API routes files
const userRoutes = require('./routes/api/userRoutes');
const taskRoutes = require('./routes/api/taskRoutes');

//use API routes files
routes.use('/', userRoutes);
routes.use('/', taskRoutes);

//check if API is online
routes.get("/api", (req, res) => {
    return res.json({status: "on-line"});
});

module.exports = routes;