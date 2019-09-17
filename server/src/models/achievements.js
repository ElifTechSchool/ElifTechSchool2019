const Sequelize = require('sequelize');

module.exports = class Achievement extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: Sequelize.STRING,
      description: {
        type: Sequelize.TEXT,
        validate: {
          len: [0, 5120],
        },
      },
      type: Sequelize.STRING,
      experience: Sequelize.INTEGER,
      photo_url: Sequelize.STRING,
    },
    {
      sequelize,
      tableName: 'Achievements',
      modelName: 'achievements',
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
};
