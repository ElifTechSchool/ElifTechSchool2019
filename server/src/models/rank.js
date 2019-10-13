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
        type: STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          len: [0, 50],
        },
      },
      experience: {
        type: INTEGER,
        allowNull: false,
        unique: true,
      },
      number: {
        type: INTEGER,
        allowNull: false,
        unique: true,
      },
      photo_url: {
        type: STRING,
        allowNull: false,
      },
      photo_id: {
        type: STRING,
        allowNull: false,
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
