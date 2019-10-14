'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.changeColumn('ranks', 'name',
        {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        });
      await queryInterface.changeColumn('ranks', 'experience',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
        });
      await queryInterface.changeColumn('ranks', 'number',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        });
      await queryInterface.changeColumn('ranks', 'photo_id',
        {
          type: Sequelize.STRING,
          allowNull: false,
        });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
};
