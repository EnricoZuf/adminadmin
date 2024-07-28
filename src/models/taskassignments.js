'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TaskAssignments extends Model {
    static associate(models) {
      TaskAssignments.belongsTo(models.Task, { foreignKey: 'taskId' });
      TaskAssignments.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  TaskAssignments.init({
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'TaskAssignments',
    tableName: 'task_assignments',
    paranoid: true, // Enables soft deletes
  });
  return TaskAssignments;
};
