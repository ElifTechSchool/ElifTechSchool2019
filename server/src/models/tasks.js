const Sequelize = require('sequelize');

module.exports = class Tasks extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
          len: [0, 100],
        },
      },
      experience: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      name: {
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
      owner_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,

      },
      deadline_date: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,

      },
      status: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
          len: [0, 100],
        },
      },
      max_participants: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

    },
    {
      sequelize,
      tableName: 'tasks',
      modelName: 'tasks',
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
};
