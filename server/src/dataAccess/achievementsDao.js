import Sequelize from 'sequelize';
import { models } from '../models/index.js';

const { achievements: achievementsModel } = models;

const getAchievements = () => achievementsModel.findAll({ 
  raw: true,
  order: [
    ['name', 'ASC'],
  ],
});

const getTypes = () => achievementsModel.findAll({    
  attributes: [
    [Sequelize.fn('DISTINCT', Sequelize.col('type')), 'type'],
  ],
}).then(result => result.map(col => col.type))

const getAchievementByType = (types) => achievementsModel.findAll({
  raw: true,
  order: [
    ['name', 'ASC'],
  ],
  where: {
    type: {
      [Sequelize.Op.in]: types,
    },
  },
});

const getAchievementById = (id) => achievementsModel.findAll({
  where: { id },
});

const createAchievement = (achievement) => achievementsModel.create(achievement);

const updateAchievement = (id, achievement) => achievementsModel.update(
  achievement,
  {
    where: { id },
  },
);

const deleteAchievement = (id) => achievementsModel.destroy({
  where: { id },
});

export default {
  getAchievements,
  getAchievementByType,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  getTypes,
};
