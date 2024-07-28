const express = require('express');
const TaskController = require('../controllers/taskController');
const router = express.Router();

router.get('/tasks/:userId', TaskController.getAllTasks);       // Get all tasks of a user
router.get('/task/:id', TaskController.getTaskById);            // Get a task by ID

router.put('/task/:id', TaskController.updateTask);             // Update a task

router.delete('/task/:id', TaskController.deleteTask);          // Delete a task

router.post('/task', TaskController.createTask);                // Create a new task
router.post('/task/assign', TaskController.assignUserToTask);   // Assign a user to a task

module.exports = router;
