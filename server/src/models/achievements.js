'use strict';

module.exports = (sequelize, DataTypes) => {
  const Achievements = sequelize.define('achievements', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    description: {
      type: DataTypes.TEXT,
      validate: {
        len: [0, 5120],
      },
    },
    experience: DataTypes.INTEGER,
    photo_url: DataTypes.STRING
  }, {});
  return Achievements;
};
