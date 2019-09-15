import ranksService from "../../services/RanksService.js";

const state = {
  ranks: null
};

const getters = {
  allRanks: state => state.ranks
};

const mutations = {
  setRanks: (state, payload) => {
    state.ranks = payload;
  },
  addRank: (state, payload) => {
    state.ranks.push(payload);
  }
};

const actions = {
  async getAllRanks({ commit, dispatch }) {
    const response = await ranksService.getRanks();
    if (response.status == 200) {
      commit("setRanks", response.data);
    } else {
      dispatch("showSnackBar", { response, color: "red" });
    }
  },
  async addRank({ commit }, rank) {
    const response = await ranksService.addRank(rank);
    if (response.status == 201) {
      commit("addRank", response.data);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
