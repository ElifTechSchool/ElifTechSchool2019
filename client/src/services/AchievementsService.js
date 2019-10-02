import axios from "axios";

const achievementsURL = "http://localhost:3000/api/v1/achievements/"

const getAchievements = async () => {
  try {
    const response = await axios.get(achievementsURL).then(res => res.data);
    return response;
  } catch (error) {
    return error;
  }
};

const addAchievement = async achievement => {
  try {
    const response = await axios
      .post(achievementsURL, achievement)
      .then(() => {});
    return response;
  } catch (error) {
    return error;
  }
};

const getAchievementById = async id => {
  try {
    return await axios.get(achievementsURL + id);
  } catch (error) {
    return error;
  }
};

const updateAchievement = async (achievement, id) => {
  try {
    return await axios.put(achievementsURL + id, achievement);
  } catch (error) {
    return error;
  }
};

const deleteAchievement = async id => {
  try {
    return await axios.delete(achievementsURL + id);
  } catch (error) {
    return error;
  }
};

export default {
  getAchievements,
  addAchievement,
  getAchievementById,
  updateAchievement,
  deleteAchievement
};
