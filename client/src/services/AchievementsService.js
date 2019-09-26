import axios from "axios";

const getAchievements = async () => {
  try {
    const response = await axios
      .get("http://localhost:3000/api/v1/achievements")
      .then(res => res.data);
    return response;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

const addAchievement = async achievement => {
  try {
    const response = await axios.post("achievements", achievement);
    return response;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const getAchievementById = async id => {
  try {
    const response = await axios.get(`achievements/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const updateAchievement = async (id, achievement) => {
  try {
    const response = await axios.put(`achievements/${id}`, achievement);
    return response;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const deleteAchievement = async id => {
  try {
    const response = await axios.delete(`achievements/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

export default {
  getAchievements,
  addAchievement,
  getAchievementById,
  updateAchievement,
  deleteAchievement
};
