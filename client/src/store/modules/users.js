import axios from "axios";

const state = {
  users: [],
  userById: {},
  usersCount: 0,
  pageSize: 3
};

const getters = {
  users: state => state.users,
  userById: state => state.userById,
  findUserById(state) {
    return id => state.users.find(el => el.id === id);
  },
  usersCount: state => state.usersCount,
  pageSize: state => state.pageSize,
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
  }
};

const actions = {
  loadUsers({ commit }, {page, pageSize}) {
    axios
      .get(`users/${page}/${pageSize}`)
      .then(res => res.data)
      .then(data => {
        commit("setUsers", data.rows);
        commit("setUsersCount", data.count);
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
  updateUser(_, {formData, id}) {
    axios.put(`users/${id}`, formData).catch(err => console.log(err));
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
