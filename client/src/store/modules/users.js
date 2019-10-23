import axios from "axios";

const state = {
  users: [],
  userById: {},
  usersCount: 0,
  pageSize: 4,
  numOfPages: 0,
  search: ""
};

const getters = {
  users: state => state.users,
  userById: state => state.userById.user,
  rankData: state => state.userById.userRank,
  findUserById(state) {
    return id => state.users.find(el => el.id === id);
  },
  usersCount: state => state.usersCount,
  pageSize: state => state.pageSize,
  numOfPages: state => state.numOfPages,
  search: state => state.search
};

const mutations = {
  setUsers: (state, users) => {
    state.users = users;
  },
  setUser: (state, user) => {
    state.userById = user;
  },
  setUsersCount: (state, usersCount) => {
    state.usersCount = usersCount;
  },
  setPageSize: (state, pageSize) => {
    state.pageSize = pageSize;
  },
  setNumOfPages: state => {
    state.numOfPages = Math.ceil(state.usersCount / state.pageSize);
  },
  setSearch: (state, search) => {
    state.search = search;
  }
};

const actions = {
  async loadUsers({ commit }, query) {
    if (query.page) {
      commit("setPageSize", query.pageSize);
      commit("setSearch", query.search);
      await axios
        .get(`users`, {
          params: { ...query }
        })
        .then(res => res.data)
        .then(data => {
          commit("setUsers", data.rows);
          commit("setUsersCount", data.count);
          commit("setNumOfPages");
        })
        .catch(err => console.log(err));
    } else {
      await axios
        .get(`users`)
        .then(res => res.data)
        .then(data => {
          commit("setUsers", data.rows);
        });
    }
  },
  getUserById({ commit }, id) {
    axios
      .get(`users/${id}`)
      .then(res => res.data)
      .then(user => commit("setUser", user))
      .catch(err => dispatch("showSnackBar", { response: err, color: "red" }));
  },
  submitUser({ dispatch }, newUser) {
    axios
      .post("users", newUser)
      .then(res => dispatch("showSnackBar", { response: res.statusText, color: "primary" }))
      .catch(err => dispatch("showSnackBar", { response: err, color: "red" }));
  },
  async updateUser(_, { formData, id }) {
    await axios
    .put(`users/${id}`, formData)
    .catch(err => dispatch("showSnackBar", { response: err, color: "red" }));
  },
  changePassword({ dispatch }, { passData, id }) {
    axios
    .put(`users/${id}/passwords`, passData)
    .catch(err => dispatch("showSnackBar", { response: err, color: "red" }));
    dispatch("getUserById", id);
  },
  async deleteUser({ dispatch }, { id, page, pageSize, search }) {
    await axios.delete(`users/${id}`);
    dispatch("loadUsers", { page, pageSize, search });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
