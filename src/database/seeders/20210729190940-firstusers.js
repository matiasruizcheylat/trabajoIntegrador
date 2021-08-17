'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {         
          firstName: "Franco",
          lastName: "El profe del curso",
          email: "john@doe.com",
          username:"franbellino",
          password: bcrypt.hashSync('una', 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "curso",
          lastName: "node",
          username:"cursonode",
          password: bcrypt.hashSync('segunda', 8),
          email: "johnnyBravo@doe.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
