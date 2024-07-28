'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Task, { as: 'createdTasks', foreignKey: 'creatorId' });
      User.belongsToMany(models.Task, { through: 'TaskAssignments', as: 'assignedTasks', foreignKey: 'userId' });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    birthDate: DataTypes.DATEONLY
  }, {
    sequelize,
    paranoid: true,
    modelName: 'User',
  });
  return User;
};