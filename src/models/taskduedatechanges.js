'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TaskDueDateChanges extends Model {
    static associate(models) {
      TaskDueDateChanges.belongsTo(models.Task, { foreignKey: 'taskId' });
    }
  }
  TaskDueDateChanges.init({
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    oldDueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    newDueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'TaskDueDateChanges',
    tableName: 'task_due_date_changes',
    paranoid: true, // Enables soft deletes
  });
  return TaskDueDateChanges;
};
