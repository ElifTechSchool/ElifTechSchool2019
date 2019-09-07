const Sequelize = require('sequelize');

module.exports = class Rank extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.CHAR(250),
        allowNull: false
      },
      experience: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      photo_url: {
        type: Sequelize.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: 'ranks',
      modelName: 'ranks',
      paranoid: false,
      timestamps: false
    });
  }

  // static associate(models) {
  // }
};