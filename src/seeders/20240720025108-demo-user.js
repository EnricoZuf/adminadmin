'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Celsin',
        lastName: 'Valdomiro',
        email: 'example@example.com',
        password: '963258741',
        birthdate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Tonin',
        lastName: 'Valdomiro',
        email: 'example@example.com',
        password: '963258741',
        birthdate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'example@example.com',
        password: '963258741',
        birthdate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
