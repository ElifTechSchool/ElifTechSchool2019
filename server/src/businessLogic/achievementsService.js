import achievementsDao from '../dataAccess/achievementsDao.js';

const getAchievements = (params) => {
  const { page, limit, types } = params;
  if (page && limit) {
    return getAchievementsPerPage(page, limit, types);
  }
  return achievementsDao.getAchievements();
};

async function getAchievementsPerPage (page, limit, types) {
  const achievements = !types ? await achievementsDao.getAchievements()
    : await achievementsDao.getAchievementByType(types);
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
  getTypes,
};
