import axios from "axios";

const achievementsURL = "http://localhost:3000/api/v1/achievements/";

function getQuerySrtingURL({ page, limit, types }, url) {
  let result = "";
  if (page && limit) {
    result = result + `${url}?page=${page}&limit=${limit}`;
  }
  if (types && types.length) {
    const typesQuerySrting = types.map(type => `&types[]=${type}`).join("");
    result = result + `${typesQuerySrting}`;
  }
  return result;
}

const state = {
  achievements: [],
  achievementsCount: 0,
  limit: 5
};

const getters = {
  allAchievements: state => {
    return state.achievements;
  },
  achievementById: state => {
    return id => state.achievements.find(el => el.id === id);
  },
  achievementsCount: state => {
    return state.achievementsCount;
  }
};

const mutations = {
  setAchievements: (state, achievements) => {
    state.achievements = achievements;
  },
  addAchievement: (state, achievement) => {
    state.achievements.push(achievement);
  },
  setAchievementsCount: (state, achievementsCount) => {
    state.achievementsCount = achievementsCount;
  }
};

const actions = {
  async getAllAchievements({ commit }, { page, limit, types }) {
    try {
      const response = await axios
        .get(getQuerySrtingURL({ page, limit, types }, achievementsURL))
        .then(res => res.data);
      commit("setAchievements", response.data.data);
      commit("setAchievementsCount", response.data.count);
      return response;
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
