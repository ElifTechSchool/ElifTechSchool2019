export default (sequelize, DataTypes) => {
  const сompetitions = sequelize.define('сompetitions', {
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
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {});
  сompetitions.associate = function(models) {
    // associations can be defined here
  };
  return сompetitions;
};