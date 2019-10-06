'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
          len: [0, 100],
        },
      },
      surname: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
          len: [0, 100],
        },
      },
      email: {
        type: Sequelize.STRING(300),
        allowNull: false,
        unique: true,
        validate: {
          len: [0, 300],
        },
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
          len: [0, 100],
        },
      },
      experience: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      image_url: {
        type: Sequelize.STRING(300),
        allowNull: true,
        validate: {
          len: [0, 300],
        },
      },
      description: {
        type: Sequelize.STRING(500),
        allowNull: true,
        validate: {
          len: [0, 500],
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ranks');
  }
};