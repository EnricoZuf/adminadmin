'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, { as: 'creator', foreignKey: 'creatorId' });
      Task.belongsToMany(models.User, { through: 'TaskAssignments', as: 'assignees', foreignKey: 'taskId' });
      Task.hasMany(models.TaskDueDateChanges, { foreignKey: 'taskId' });
    }
  }
  Task.init({
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dueDateChanged: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Task',
    paranoid: true // Enables soft deletes
  });
  return Task;
};
