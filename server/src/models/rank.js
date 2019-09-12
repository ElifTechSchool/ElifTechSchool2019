import { Model, INTEGER, CHAR, STRING } from 'sequelize';

export default class Rank extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER,
      },
      name: {
        type: CHAR(250),
        allowNull: false,
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
}
