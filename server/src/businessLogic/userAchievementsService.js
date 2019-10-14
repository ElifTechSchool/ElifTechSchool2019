import { models } from '../models/index.js';

const { user_achievements: userAchievements } = models;

const createUserAchievements = ({ userId, achievementId }) => userAchievements.create({ user_id: userId, achievement_id: achievementId });

const getUserAchievements = () => {
    return userAchievements.findAll({ raw: true });
  };

export default {
  createUserAchievements,
  getUserAchievements,
}