import Sequelize from 'sequelize';
import { models } from '../models/index.js';

const { user_achievements: userAchievements } = models;

const createUserAchievements = (users) => userAchievements
  .bulkCreate(users);

const getUsersOfSpecificAchievement = (achievementId) => userAchievements.findAll({
  where: { achievement_id: achievementId },
  attributes: [
    [Sequelize.fn('DISTINCT', Sequelize.col('user_id')), 'user_id'],
  ],
}).then((result) => result.map((col) => col.user_id));

const getUserAchievements = () => userAchievements.findAll({ raw: true });

const getAchievementsByUserId = (userId) => userAchievements.findAll({
  where: { user_id: userId },
  attributes: [
    [Sequelize.fn('DISTINCT', Sequelize.col('achievement_id')), 'achievement_id'],
  ],
}).then((result) => result.map((col) => col.achievement_id));

export default {
  createUserAchievements,
  getUserAchievements,
  getUsersOfSpecificAchievement,
  getAchievementsByUserId,
};
