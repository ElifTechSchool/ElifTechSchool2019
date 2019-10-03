import axios from "axios";

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
    try {
      const response = await axios.get("ranks");
      commit("setRanks", response.data);
    } catch (error) {
      const message = error.message;
      dispatch("showSnackBar", { message, color: "red" });
    }
  },
  async addRank({ commit, dispatch }, rank) {
    try {
      const response = await axios.post("ranks", rank);
      commit("addRank", response.data);
    } catch (error) {
      const message = error.message;
      dispatch("showSnackBar", { message, color: "red" });
    }
  },
  async updateRank({ dispatch }, rank) {
    try {
      console.log(rank);
      await axios.put(`ranks/${rank.id}`, rank.data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      dispatch("getAllRanks");
    } catch (error) {
      const message = error.message;
      dispatch("showSnackBar", { message, color: "red" });
    }
  },
  async deleteRank({ dispatch }, id) {
    try {
      await axios.delete(`ranks/${id}`);
      dispatch("getAllRanks");
    } catch (error) {
      const message = error.message;
      dispatch("showSnackBar", { message, color: "red" });
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
