import achievementsDao from '../dataAccess/achievementsDao.js';

const getAchievements = (params) => {
  const { page, limit } = params;
  if (page && limit) {
    return getAchievementsPerPage(page, limit);
  }
  return achievementsDao.getAchievements();
};

async function getAchievementsPerPage (page, limit) {
  const achievements = await achievementsDao.getAchievements();
  const endIndex = page * limit;
  const startIndex = endIndex - limit;
  console.log('endIndex', endIndex)
  console.log('startIndex', startIndex)
  
  return { 
    data: achievements.slice(startIndex, endIndex),
    count: achievements.length,
  }
};

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
