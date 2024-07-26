const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/user/:email', userController.readUser);
router.get('/user/search?query', userController.searchUsers);
router.get('/user', userController.readAllUsers);

router.post('/user', userController.createUser);

router.put('/user/:id', userController.updateUser);

router.delete('/user/:id', userController.deleteUser);

module.exports = router;