import axios from "axios";

const state = {
  users: [],
  userById: {},
};

const getters = {
  users: state => state.users,
  userById: state => state.userById,
  findUserById(state) {
    return id => state.users.find(el => el.id === id);
  }
};

const mutations = {
  setUsers: (state, users) => {
    state.users = users;
  },
  setUser: (state, user) => {
    state.userById = user;
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
