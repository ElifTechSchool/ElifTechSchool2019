const { Model, INTEGER, STRING } = require('sequelize');

module.exports = class Rank extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER,
      },
      name: {
        type: STRING(250),
        allowNull: false,
        validate: {
          len: [0, 250],
        },
      },
      experience: {
        type: INTEGER,
        allowNull: false,
      },
      number: {
        type: INTEGER,
        allowNull: false,
      },
      photo_url: {
        type: STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'ranks',
      modelName: 'ranks',
      paranoid: false,
      timestamps: false,
    });
  }

  // static associate(models) {
  // }
};
