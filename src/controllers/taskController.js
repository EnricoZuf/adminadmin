const { Task, User, TaskDueDateChanges, TaskAssignments } = require('../models');
const { Op } = require('sequelize');
const { removeDeletedAtFromJson } = require('./util');

class TaskController {
    // Create a new task
    static async createTask(req, res) {
        try {
            const { creatorId, title, description, dueDate, priority } = req.body;

            if (!creatorId || !title || !dueDate || !priority) {
                return res.status(400).json({ error: 'Required fields: creatorId, title, dueDate, priority.' });
            }

            const lowerCasePriority = priority.toLowerCase();
            if (lowerCasePriority !== 'high' & lowerCasePriority !== 'medium' & lowerCasePriority !== 'low'){
                return res.status(400).json({ error: `Priority need to be 'High', 'Medium' or Low'.` });
            }


            const task = await Task.create({ creatorId, title, description, dueDate, priority });
            res.status(201).json(removeDeletedAtFromJson(task));
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // Get all tasks
    static async getAllTasks(req, res) {
        try {
            const { userId } = req.params;

            const user = await User.findByPk(userId);
            console.log(user);
            if(!user){
                return res.status(404).json({error: "user not found"});
            }

            const tasks = await Task.findAll({
                include: [
                    { model: User, as: 'creator' },
                    { model: User, as: 'assignees' },
                    { model: TaskDueDateChanges }
                ],
                where: userId ? {
                    [Op.or]: [
                        { creatorId: userId },
                        {
                            '$assignees.id$': userId
                        }
                    ],
                    deletedAt: { [Op.is]: null } // Ensure tasks are not soft-deleted
                } : {
                    deletedAt: { [Op.is]: null } // Ensure tasks are not soft-deleted
                }
            });
    
            const tasksWithoutDeletedAt = tasks.map(task => removeDeletedAtFromJson(task));
            res.status(200).json(tasksWithoutDeletedAt);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // Get a task by ID
    static async getTaskById(req, res) {
        try {
            const { id } = req.params;
            const task = await Task.findByPk(id, {
                include: [
                    { model: User, as: 'creator' },
                    { model: User, as: 'assignees' },
                    { model: TaskDueDateChanges }
                ]
            });

            if (!task) {
                return res.status(404).json({ error: 'Task not found.' });
            }

            res.status(200).json(removeDeletedAtFromJson(task));
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // Update a task
    static async updateTask(req, res) {
        try {
            const { id } = req.params;
            const { title, description, dueDate, priority, completed } = req.body;

            if(!title & !description & !dueDate & !priority & !completed){
                return res.status(400).json({error: 'missing fields to update.'});
            }

            const task = await Task.findByPk(id);
            if (!task) {
                return res.status(404).json({ error: 'Task not found.' });
            }

            const updateData = { title, description, dueDate, priority, completed };
            if(dueDate !== undefined){
                updateData.dueDateChanged = true;
            }

            await task.update(updateData);

            res.status(200).json(removeDeletedAtFromJson(task));
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // Delete a task
    static async deleteTask(req, res) {
        try {
            const { id } = req.params;
            const task = await Task.findByPk(id);

            if (!task) {
                return res.status(404).json({ error: 'Task not found.' });
            }

            await task.destroy();
            res.status(200).json({ message: 'Task deleted successfully.' });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // Assign a user to a task
    static async assignUserToTask(req, res) {
        try {
            const { taskId, userId } = req.body;

            const task = await Task.findByPk(taskId);
            const user = await User.findByPk(userId);

            if (!task || !user) {
                return res.status(404).json({ error: 'Task or User not found.' });
            }

            await task.addAssignee(user);
            res.status(200).json({ message: 'User assigned to task successfully.' });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

}

module.exports = TaskController;
