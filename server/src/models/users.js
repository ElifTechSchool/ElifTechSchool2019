const Sequelize = require('sequelize');

module.exports = class Users extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
          len: [0, 100],
        },
      },
      surname: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
          len: [0, 100],
        },
      },
      email: {
        type: Sequelize.STRING(300),
        allowNull: false,
        unique: true,
        validate: {
          len: [0, 300],
        },
      },
      password: {
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
      image_url: {
        type: Sequelize.STRING(300),
        allowNull: true,
        validate: {
          len: [0, 300],
        },
      },
      description: {
        type: Sequelize.STRING(500),
        allowNull: true,
        validate: {
          len: [0, 500],
        },
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'users',
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
