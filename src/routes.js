const { Router } = require("express")
const routes = new Router();

//import routes files
const userRoutes = require('./routes/userRoutes');

//use routes files
routes.use('/', userRoutes);

//check if API is online
routes.get("/", (req, res) => {
    return res.json({status: "on-line"});
});

module.exports = routes;