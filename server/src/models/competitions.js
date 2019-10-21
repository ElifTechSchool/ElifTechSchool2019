const Sequelize = require('sequelize');

module.exports = class Competitions extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
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
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('now()'),
      },
      experience: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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

  static associate(models) {
    this.competitionUsers = this.belongsTo(models.users);
    
  }
};
