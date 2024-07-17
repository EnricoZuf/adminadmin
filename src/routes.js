const { Router } = require("express")

const routes = new Router();

routes.get("/", (req, res) => {
    return res.json({status: "on-line"});
});

module.exports = routes;