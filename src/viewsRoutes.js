const { Router } = require("express")
const routes = new Router();

//import API routes files


//use API routes files

//use views routes files
routes.get('/login', (req, res) => {
    res.render('login', { formType: 'login'});
});

routes.get('/register', (req, res) => {
    res.render('login', { formType: 'register'});
});

module.exports = routes;