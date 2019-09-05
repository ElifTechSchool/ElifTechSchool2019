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
    description: DataTypes.TEXT,
    experience: DataTypes.STRING,
    photo_url: DataTypes.STRING
  }, {});
  return Achievements;
};
