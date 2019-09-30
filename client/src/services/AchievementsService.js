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
    const response = await axios
      .post("http://localhost:3000/api/v1/achievements", achievement)
      .then(() => {});
    return response;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const getAchievementById = async id => {
  try {
    const response = await axios
      .get(`http://localhost:3000/api/v1/achievements/` + id
    );
    return response;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const updateAchievement = async (id, achievement) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/v1/achievements/` + id,
      achievement
    );
    return response;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const deleteAchievement = async (id) => {
  try {
    return await axios
      .delete(`http://localhost:3000/api/v1/achievements/` + id)
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
