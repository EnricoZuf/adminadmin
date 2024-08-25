const { Router } = require("express")
const routes = new Router();
const userController = require('../../controllers/userController');


//get
routes.get('/login', (req, res) => {
    res.render('login', { formType: 'login', errorMessage: null });
});

routes.get('/register', (req, res) => {
    res.render('login', { formType: 'register', errorMessage: null});
});

//post
routes.post('/login', userController.viewLogin);
routes.post('/register', userController.viewRegister);

module.exports = routes;