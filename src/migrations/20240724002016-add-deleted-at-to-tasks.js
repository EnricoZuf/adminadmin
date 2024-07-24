'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tasks', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
      after: 'updatedAt' // optional: specify the column position
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tasks', 'deletedAt');
  }
};
