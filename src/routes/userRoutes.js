const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/user/:email', userController.readUser);
router.get('/users/:param', userController.searchUsers);
router.get('/user', userController.readAllUsers);

router.post('/user', userController.createUser);

module.exports = router;