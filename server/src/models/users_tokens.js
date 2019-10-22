const Sequelize = require('sequelize');

module.exports = class  Users_tokens extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: Sequelize.INTEGER,
      refresh_token: Sequelize.STRING,
      expiration_date: Sequelize.STRING,
    },
    {
      sequelize,
      tableName: 'users_tokens',
      modelName: 'users_tokens',
      paranoid: false,
      timestamps: false,
    });
  }
};
