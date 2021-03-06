import axios from "axios";

function getQuerySrtingURL({ page, limit, types, type }, url) {
  let result = "";
  if (page && limit) {
    result = result + `${url}?page=${page}&limit=${limit}`;
  }
  if (type) {
    const typeQuerySrting = `&type=${type}`;
    result = result + `${typeQuerySrting}`;
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
  type: "all"

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
  },
  getPage: state => {
    return state.page;
  },
  getLimit: state => {
    return state.limit;
  },
  getType: state => {
    return state.type
  },
  getTypes: state => {
    return state.types
  }
};

const mutations = {
  setAchievements: (state, achievements) => {
    state.achievements = achievements;
  },
  addAchievement: (state, achievement) => {
    state.achievements = [achievement].concat(state.achievements);
  },
  setAchievementsCount: (state, achievementsCount) => {
    state.achievementsCount = achievementsCount;
  },
  setCurrentPage: (state, page) => {
    state.page = page;
  },
  setTypes: (state, types) => {
    state.types = types;
  },
  setType: (state, type) => {
    state.type = type;
  },
  setLimit: (state, limit) => {
    state.limit = limit;
  }
};

const actions = {
  async getAllAchievements({ commit, state }) {
    const { page, limit, types, type } = state;
    try {
      const response = await axios
        .get(getQuerySrtingURL({ page, limit, types, type }, `achievements`))
        .then(res => res.data);
      commit("setAchievements", response.data.data);
      commit("setAchievementsCount", response.data.count);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  setInitialStateParams: ({ commit }, { type, types, limit, page }) => {
    if (type) {
      commit('setType', type)
    }
    if (types) {
      commit('setTypes', types)
    }
    if (page) {
      commit("setCurrentPage", page);
    }
    if (limit) {
      commit("setLimit", limit)
    }
  },
  setCurrentPage: ({ commit }, currentPage) => {
    commit("setCurrentPage", parseInt(currentPage));
  },
  setType: ({ commit }, type) => {
    commit("setType", type);
  },
  setTypes: ({ commit }, types) => {
    commit("setTypes", types);
  },
  async getAchievementById(store, id) {
    try {
      return await axios.get(`achievements/${id}`);
    } catch (error) {
      console.log(error);
    }
  },
  async addAchievement({ commit }, achievement) {
    try {
      await axios.post(`achievements`, achievement);
    } catch (error) {
      console.log(error);
    }
  },
  async updateAchievement(store, { achievement, id }) {
    try {
      await axios.put(`achievements/${id}`, achievement);
    } catch (error) {
      console.log(error);
    }
  },
  async deleteAchievement({ dispatch }, { id }) {
    try {
      await axios.delete(`achievements/${id}`);
      dispatch("getAllAchievements");
    } catch (error) {
      console.log(error);
    }
  },
  addUsersToAchiev(_, { id, users }) {
    axios
      .post(`achievements/${id}/users`, { users: users })
      .then(res => {
        console.log(res);
        //commit("setUserAchiv", res.data[0])
      })
      .catch(err => console.log(err));
  },
  getAllAchiev(_) {
    return axios
      .get("achievements/")
      .then(res => res.data.data)
      .catch(err => {
        console.log(err);
      })
  },
  getOwnAchievements(_, id) {
    return axios.get(`users/${id}/achievements`)
      .then(res => res.data)
      .catch(err => {
        console.log(err);
      })
  },
  /*getOwnAchievements() {
    axios.get(`users/${this.id}/achievements`)
      .then(res => {
        console.log(res.data);
        this.achievements = res.data;
      })
      .catch(err => {
        console.log(err);
      })
  }, */
  getUsersByAchiev(_, id){
    return axios
      .get(`achievements/${id}/users`)
      .then(res => res.data)
      .catch(err => console.log(err))
  },
  addAchievToUser(_, { id, achievData }){
    axios
      .post(`users/${id}/achievements`, { achievements: achievData })
      .then(res => {
        console.log(res);
        //commit("setUserAchiv", res.data[0])
      })
      .catch(err => console.log(err));
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
