import achievementsService from "../../services/AchievementsService.js";

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
    const response = await achievementsService.getAchievements();
    commit("setAchievements", response.data);
  },
  async getAchievementById(id) {
    await achievementsService.getAchievementById(id);
  },
  async addAchievement({ commit }, achievement) {
    const response = await achievementsService.addAchievement(achievement);
    commit("addAchievement", response.data);
  },
  async updateAchievement(achievement) {
    await achievementsService.updateAchievement(achievement);
  },
  async deleteAchievement(id) {
    await achievementsService.deleteAchievement(id);
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
