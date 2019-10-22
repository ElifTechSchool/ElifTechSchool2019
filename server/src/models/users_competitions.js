const Sequelize = require('sequelize');

module.exports = class Users_competitions extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id"
        }
      },
      competitionId: {
        type: Sequelize.INTEGER,
        references: {
          model: "competitions",
          key: "id"
        }
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
    this.userCompetition = this.belongsTo(models.users);
    this.competitionUser = this.belongsTo(models.competitions);
    
    
 }
};
