const Sequelize = require('sequelize');

module.exports = class UsersCompetitions extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      competition_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'competitions',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'users_competitions',
      modelName: 'users_competitions',
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
    this.user_id = this.hasMany(models.users);
    this.competition_id = this.hasMany(models.competitions);
  }
};
