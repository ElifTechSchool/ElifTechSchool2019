import jwt from 'jsonwebtoken';
import achievementsDao from '../dataAccess/achievementsDao.js';
import userAchievementsService from './userAchievementsService.js';
import config from '../../config/env.js';

const getAchievements = (params, token) => {
  const decoded = jwt.verify(token.split(/(Bearer )/)[2], config.jwtSecret);
  const userId = decoded.id;
  const { page, limit, types, type } = params;
  if (page && limit) {
    return getAchievementsPerPage({ page, limit, types, type, userId });
  }
  return achievementsDao.getAchievements();
};

async function getAchievementsPerPage ({ page, limit, types, type, userId }) {
  let achievements;
  if (type) {
    if (type === 'my') {
      achievements = await getAchievementsByUserId(userId);
    }
    if (type === 'wanted') {
      achievements = await getWantedAchievements(userId);
    }
    if (type === 'all') {
      achievements = await achievementsDao.getAchievements();
    }
  } else {
    achievements = await achievementsDao.getAchievements();
  }
  achievements = !types ? achievements
    : achievements.filter((ach) => types.indexOf(ach.type) > -1);

  if (achievements.length <= limit) {
    return {
      data: achievements,
      count: achievements.length,
    };
  }
  const endIndex = page * limit;
  const startIndex = endIndex - limit;
  return {
    data: achievements.slice(startIndex, endIndex),
    count: achievements.length,
  };
}

const getTypes = () => achievementsDao.getTypes();

const getAchievementsByUserId = async (userId) => (
  await achievementsDao.getAchievementsByIds(
    await userAchievementsService.getAchievementsByUserId(userId)
  )
)

const getWantedAchievements = async (userId) => (
  await achievementsDao.getWantedAchievements(
    await userAchievementsService.getAchievementsByUserId(userId)
  )
)

const getAchievementById = (id) => achievementsDao.getAchievementById(id);

const createAchievement = (req) => {
  const achievement = req.body;
  if (req.file) {
    achievement.photo_url = req.file.secure_url;
  }
  return achievementsDao.createAchievement(achievement);
};

const updateAchievement = (id, achievement) => achievementsDao.updateAchievement(id, achievement);

const deleteAchievement = (id) => achievementsDao.deleteAchievement(id);

export default {
  getAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  getTypes,
  getAchievementsByUserId,
};
