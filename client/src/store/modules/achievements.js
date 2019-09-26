import achievementsService from "../../services/AchievementsService.js";

const state = {
  achievements: []
};

const getters = {
  allAchievements: state => {
    console.log("11111", state.achievements)
    return state.achievements;
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
    const response = await achievementsService.getAchievements();
    commit("setAchievements", response.data);
    console.log("-----", response.data);
  },
  async addAchievement({ commit }, achievement) {
    const response = await achievementsService.addAchievement(achievement);
    if (response.status == 201) {
      commit("addAchievement", response.data);
    }
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
