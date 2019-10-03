import axios from "axios";

const state = {
  users: [],
  userById: {},
  usersCount: 0,
  pageSize: 3,
  numOfPages: 0
};

const getters = {
  users: state => state.users,
  userById: state => state.userById,
  findUserById(state) {
    return id => state.users.find(el => el.id === id);
  },
  usersCount: state => state.usersCount,
  pageSize: state => state.pageSize,
  numOfPages: state => state.numOfPages,
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
  setNumOfPages: (state) => {
    state.numOfPages = Math.ceil(state.usersCount / state.pageSize);
  }
};

const actions = {
  loadUsers({ commit }, query) {
    axios
      .get(`users/${query.page}/${query.pageSize}`)
      .then(res => res.data)
      .then(data => {
        commit("setUsers", data.rows);
        commit("setUsersCount", data.count);
        commit("setNumOfPages");
      })
      .catch(err => console.log(err));
  },
  getUserById({commit}, id) {
    axios
      .get(`users/${id}`)
      .then(res => res.data)
      .then(user => 
        commit("setUser", user))
      .catch(err => console.log(err))
  },
  submitUser(_, newUser) {
    axios.post("users", newUser).catch(err => console.log(err));
  },
  updateUser({dispatch}, {formData, id}) {
    axios.put(`users/${id}`, formData).catch(err => console.log(err));
    dispatch("getUserById", id);
  },
  async deleteUser({ dispatch }, id) {
    await axios.delete(`users/${id}`);
    dispatch("loadUsers");
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
