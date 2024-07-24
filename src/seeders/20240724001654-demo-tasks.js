'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Tasks', [
      {
        creatorId: 2, // Ensure this user ID exists in the Users table
        title: 'Complete Project Proposal',
        description: 'Finish writing and submit the project proposal for the upcoming meeting.',
        dueDate: new Date('2024-08-01'),
        dueDateChanged: false,
        completed: false,
        priority: 'high',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        creatorId: 2, // Ensure this user ID exists in the Users table
        title: 'Prepare Presentation Slides',
        description: 'Create slides for the presentation next week.',
        dueDate: new Date('2024-07-30'),
        dueDateChanged: false,
        completed: false,
        priority: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        creatorId: 3, // Ensure this user ID exists in the Users table
        title: 'Book Conference Room',
        description: 'Reserve the conference room for the team meeting on Friday.',
        dueDate: new Date('2024-07-28'),
        dueDateChanged: false,
        completed: true,
        priority: 'low',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
