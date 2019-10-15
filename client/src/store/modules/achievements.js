import axios from "axios";

const achievementsURL = "http://localhost:3000/api/v1/achievements/";

function getQuerySrtingURL({ page, limit, types }, url) {
  debugger;
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
  limit: 5,
  types: [],
  page: 1,
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
    state.achievements = [achievement].concat(state.achievements)
  },
  setAchievementsCount: (state, achievementsCount) => {
    state.achievementsCount = achievementsCount;
  },
  setCurrentPage: (state, page) => {
    state.page = page;
  },
  setTypes: (state, types) => {
    console.log("types", types)
    state.types = types;
  }
};

const actions = {
  async getAllAchievements({ commit, state }) {
    const { page, limit, types } = state;
    try {
      const response = await axios
        .get(
          getQuerySrtingURL({ page, limit, types }, achievementsURL),
        )
        .then(res => res.data);
      commit("setAchievements", response.data.data);
      commit("setAchievementsCount", response.data.count);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  setCurrentPage: ({ commit }, currentPage) => {
    commit('setCurrentPage', currentPage);
  },
  setTypes: ({ commit }, types) => {
    commit('setTypes', types);
  },
  async getAchievementById(store, id) {
    try {
      return await axios.get(achievementsURL + id);
    } catch (error) {
      console.log(error);
    }
  },
  async addAchievement({ commit }, achievement) {
    try {
      const response = await axios.post(achievementsURL, achievement)
    } catch (error) {
      console.log(error)
    }
  },
  async updateAchievement(store, { achievement, id }) {
    try {
      await axios.put(achievementsURL + id, achievement);
    } catch (error) {
      console.log(error);
    }
  },
  async deleteAchievement({ dispatch }, { id }) {
    try {
      await axios.delete(achievementsURL + id)
      dispatch("getAllAchievements");
    } catch (error) {
      console.log(error)
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
