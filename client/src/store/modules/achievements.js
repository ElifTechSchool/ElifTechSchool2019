import axios from "axios";

const achievementsURL = "http://localhost:3000/api/v1/achievements/";

const state = {
  achievements: []
};

const getters = {
  allAchievements: state => {
    return state.achievements;
  },
  achievementById(state) {
    return id => state.achievements.find(el => el.id === id);
  }
};

const mutations = {
  setAchievements: (state, achievements) => {
    state.achievements = achievements;
  },
  addAchievement: (state, achievement) => {
    state.achievements.push(achievement);
  }
};

const actions = {
  async getAllAchievements({ commit }) {
    try {
      const response = await axios.get(achievementsURL).then(res => res.data);
      commit("setAchievements", response.data);
    } catch (error) {
      return error;
    }
  },
  async getAchievementById(store, id) {
    try {
      return await axios.get(achievementsURL + id);
    } catch (error) {
      return error;
    }
  },
  async addAchievement({ commit }, achievement) {
    try {
      const response = await axios
        .post(achievementsURL, achievement)
        .then(() => {});
      commit("addAchievement", response.data);
    } catch (error) {
      return error;
    }
  },
  async updateAchievement(store, { achievement, id }) {
    try {
      return await axios.put(achievementsURL + id, achievement);
    } catch (error) {
      return error;
    }
  },
  async deleteAchievement({ dispatch }, { id }) {
    try {
      return await axios
        .delete(achievementsURL + id)
        .then(() => dispatch("getAllAchievements"));
    } catch (error) {
      return error;
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
