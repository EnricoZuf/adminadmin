const { Router } = require("express")
const routes = new Router();

//import routes files
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

//use routes files
routes.use('/', userRoutes);
routes.use('/', taskRoutes);

//check if API is online
routes.get("/", (req, res) => {
    return res.json({status: "on-line"});
});

module.exports = routes;