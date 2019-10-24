const Sequelize = require('sequelize');

module.exports = class Events extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
          len: [0, 100],
        },
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING(100),
        allowNull: true,
        validate: {
          len: [0, 100],
        },
      },
      max_people: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      image_url: {
        type: Sequelize.STRING(300),
        allowNull: true,
        validate: {
          len: [0, 300],
        },
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    },

    {
      sequelize,
      tableName: 'events',
      modelName: 'events',
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
