const Sequelize = require('sequelize');

module.exports = class Sessions extends Sequelize.Model {
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
    },
    {
      sequelize,
      tableName: 'Sessions',
      modelName: 'Sessions',
      paranoid: false,
      timestamps: false,
    });
  }
};
