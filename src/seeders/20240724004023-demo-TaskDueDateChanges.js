'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Task_Due_Date_Changes', [
      {
        taskId: 1, // Ensure this task ID exists
        oldDueDate: new Date('2024-08-01'),
        newDueDate: new Date('2024-08-05'),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        taskId: 2,
        oldDueDate: new Date('2024-07-30'),
        newDueDate: new Date('2024-08-02'),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        taskId: 2, // Ensure this task ID exists
        oldDueDate: new Date('2024-08-02'),
        newDueDate: new Date('2024-08-03'),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Task_Due_Date_Changes', null, {});
  }
};
