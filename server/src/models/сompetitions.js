'use strict';
module.exports = (sequelize, DataTypes) => {
  const сompetitions = sequelize.define('сompetitions', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    deadline_date: DataTypes.DATE,
    experience: DataTypes.INTEGER
  }, {});
  сompetitions.associate = function(models) {
    // associations can be defined here
  };
  return сompetitions;
};