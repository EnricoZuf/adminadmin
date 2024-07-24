'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('TaskAssignments', [
      {
        taskId: 1, // Ensure these task and user IDs exist
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        taskId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        taskId: 3,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TaskAssignments', null, {});
  }
};
