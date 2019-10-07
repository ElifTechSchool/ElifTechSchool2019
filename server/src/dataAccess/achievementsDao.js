import { models } from '../models/index.js';

const { achievements: achievementsModel } = models;

const getAchievements = () => achievementsModel.findAll({ raw: true })

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
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
};
