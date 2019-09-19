import axios from "axios";

const state = {
  users: []
};

const getters = {
  users: state => state.users
};

const mutations = {
  setUsers: (state, users) => {
    state.users = users;
  }
};

const actions = {
  loadUsers({ commit }) {
    axios
      .get("http://localhost:3000/api/v1/users")
      .then(res => res.data)
      .then(users => {
        commit("setUsers", users);
      })
      .catch(err => console.log(err));
  },
  submitUser({ dispatch }, newUser) {
    axios
      .post("http://localhost:3000/api/v1/users", newUser)
      .catch(err => console.log(err));
  },
  deleteUser({ dispatch }, id) {
    axios
      .delete(`http://localhost:3000/api/v1/users/${id}`)
      .then(dispatch("loadUsers"))
      .catch(err => console.log(err));
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
