const Sequelize = require('sequelize');

module.exports = class Roles extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [0, 50],
        },
      },
      description: {
        type: Sequelize.TEXT,
        validate: {
          len: [0, 5120],
        },
      },
    },
    {
      sequelize,
      tableName: 'roles',
      modelName: 'roles',
      paranoid: false,
      timestamps: false,
    });
  }
};
