import axios from "axios";
import router from "../../router";

const state = {
  ranks: [],
  isEmpty: false,
  ranksPageSize: 4,
  pageQty: 0,
  ranksQty: 0,
  searchRank: ""
};

const getters = {
  allRanks: state => state.ranks,
  rankIsEmpty: state => state.isEmpty,
  ranksPageSize: state => state.ranksPageSize,
  pageQty: state => state.pageQty,
  ranksQty: state => state.ranksQty,
  searchRank: state => state.searchRank
};

const mutations = {
  setRanks: (state, payload) => {
    state.ranks = payload;
  },
  addRank: (state, payload) => {
    state.ranks.push(payload);
  },
  setPageSize: (state, payload) => {
    state.ranksPageSize = payload;
  },
  setPageQty: state => {
    state.pageQty = Math.ceil(state.ranksQty / state.ranksPageSize);
  },
  setSearch: (state, payload) => {
    state.searchRank = payload;
  },
  setRanksQty: (state, payload) => {
    state.ranksQty = payload;
  }
};

const actions = {
  async getAllRanks({ commit, dispatch }, query) {
    try {
      commit("setPageSize", query.pageSize);
      commit("setSearch", query.search);
      const response = await axios.get("ranks", { params: { ...query } });
      commit("setRanks", response.data.rows);
      commit("setRanksQty", response.data.count);
      commit("setPageQty");
      if (state.ranks.length === 0 && state.ranksQty > 0) {
        dispatch("getAllRanks", {
          page: 1,
          pageSize: state.ranksPageSize,
          search: state.searchRank
        });
        router.push({ path: "/ranks", query: { page: 1 } });
      }
      if (state.ranks.length === 0 && state.ranksQty === 0) {
        state.isEmpty = true;
      }
    } catch (error) {
      const message = error.message;
      dispatch("showSnackBar", { response: message, color: "red" });
    }
  },
  async addRank({ commit, dispatch }, rank) {
    try {
      const response = await axios.post("ranks", rank, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      commit("addRank", response.data);
      router.push({ path: "/ranks" });
      dispatch("showSnackBar", {
        response: "Rank added succesfully",
        color: "primary"
      });
    } catch (error) {
      const message = error.message;
      dispatch("showSnackBar", { response: message, color: "red" });
    }
  },
  async updateRank({ dispatch }, rank) {
    await axios.put(`ranks/${rank.id}`, rank.data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    const page = Number(router.currentRoute.query.page);
    const pageSize = this.getters.ranksPageSize;
    const search = router.currentRoute.query.search;
    dispatch("getAllRanks", { page, pageSize, search });
  },
  async deleteRank({ dispatch }, id) {
    try {
      await axios.delete(`ranks/${id}`);
      let currentPage = Number(router.currentRoute.query.page);
      const pageSize = this.getters.ranksPageSize;
      const search = router.currentRoute.query.search;
      if (
        (this.getters.ranksQty - 1) % this.getters.ranksPageSize === 0 &&
        currentPage === this.getters.pageQty
      ) {
        currentPage -= 1;
        router.push({ path: "/ranks", query: { page: currentPage } });
      }
      dispatch("getAllRanks", {
        page: currentPage,
        pageSize,
        search
      });
      dispatch("showSnackBar", {
        response: "Rank deleted successfully!",
        color: "primary"
      });
    } catch (error) {
      const message = error.message;
      dispatch("showSnackBar", { response: message, color: "red" });
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
