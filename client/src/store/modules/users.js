const state = {
  users: [],
};

const getters = {
  users: state => state.users
};

const mutations = {
    updateUsers: (state, payload) => {
        state.users = payload;
    }
};

const actions = {
    loadUsers ({ commit }) {
        axios
        .get('https://next.json-generator.com/api/json/get/NyYareQIw')
        .then(r => r.data)
        .then(users => {
        console.log(users)
        })
    }
};

export default {
  state,
  getters,
  actions,
  mutations,
};