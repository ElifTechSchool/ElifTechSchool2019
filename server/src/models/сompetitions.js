import Sequelize from 'sequelize';

export default class News extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          name: {
            type: Sequelize.STRING,
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
            type: Sequelize.DATE
          },
          experience: {
            type: Sequelize.INTEGER
          },
        },
    {
      sequelize,
      tableName: 'competitions',
      modelName: 'competitions',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,
      timestamps: true,
      scopes: {
        withoutDefaultColumn: {
          attributes: { exclude: ['createdat', 'deletedat', 'updatedat'] },
        },
      },
    });
  }

  // static associate(models) {
  // }
}
