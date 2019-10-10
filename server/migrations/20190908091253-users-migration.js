'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
     
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ranks');
  }
};