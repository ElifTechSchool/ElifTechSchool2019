import axios from "axios";

const state = {
  users: []
};

const getters = {
  users: state => state.users,
  userById(state) {
    return id => state.users.find(el => el.id === id);
  }
};

const mutations = {
  setUsers: (state, users) => {
    state.users = users;
    console.log(state.users);
  }
};

const actions = {
  loadUsers({ commit }) {
    axios
      .get("users")
      .then(res => res.data)
      .then(users => {
        commit("setUsers", users);
      })
      .catch(err => console.log(err));
  },
  submitUser(_, newUser) {
    axios.post("users", newUser).catch(err => console.log(err));
  },
  updateUser(_, userData) {
    axios.put(`users/${userData.id}`, userData).catch(err => console.log(err));
  },
  async deleteUser({ dispatch }, id) {
    await axios.delete(`users/${id}`)
      dispatch("loadUsers")
      .catch(err => console.log(err));
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
