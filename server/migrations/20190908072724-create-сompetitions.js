module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(async (t) => {
    await queryInterface.createTable('competitions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          len: [0, 55],
        },
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
        validate: {
          len: [0, 5120],
        },
      },
      deadline_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('now()'),
      },
      experience: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      owner_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    }, {
      transaction: t,
    });
  }),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(async (t) => {
    await queryInterface.dropTable('competitions', { transaction: t });
  }),
};
