import achievementsDao from '../dataAccess/achievementsDao.js';

const getAchievements = () => achievementsDao.getAchievements();

const getAchievementById = (id) => achievementsDao.getAchievementById(id);

const createAchievement = (achievement) => achievementsDao.createAchievement(achievement);

const updateAchievement = (id, achievement) => achievementsDao.updateAchievement(id, achievement);

const deleteAchievement = (id) => achievementsDao.deleteAchievement(id);

export default {
  getAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
};
