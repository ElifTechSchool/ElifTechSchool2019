const Sequelize = require('sequelize');

module.exports = class Users_roles extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: Sequelize.INTEGER,
      role_id: Sequelize.INTEGER,
    },
    {
      sequelize,
      tableName: 'users_roles',
      modelName: 'users_roles',
      paranoid: false,
      timestamps: false,
    });
  }
};
