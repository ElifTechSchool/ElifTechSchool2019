const Sequelize = require('sequelize');

module.exports = class User_achievements extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id"
        },
      },
      achievement_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "achievements",
          key: "id"
        },
      },
    },
    {
      sequelize,
      tableName: 'user_achievements',
      modelName: 'user_achievements',
      paranoid: false,
      timestamps: false,
    });
  }
};