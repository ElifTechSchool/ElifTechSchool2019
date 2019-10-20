import axios from "axios";

const state = {
  showLogin: true,
  authData: {},
  userMe: {}
};

const getters = {
  showLogin: state => state.showLogin,
  authData: state => state.authData,
  userMe: state => state.userMe
};

const mutations = {
  setShowLogin: (state, showLogin) => (state.showLogin = showLogin),
  setAuthData: (state, data) => (state.authData = data),
  setUserMe: (state, data) => (state.userMe = data),
  destroyAuthData: state => {
    state.authData.token = null;
    state.authData.refreshToken = null;
    state.showLogin = true;
    state.userMe = {};
  }
};

const actions = {
  loginUser({ commit }, newUser) {
    return axios
      .post("login", newUser)
      .then(res => {
        localStorage.setItem("user-token", `Bearer ${res.data.token}`);
        localStorage.setItem(
          "user-refreshToken",
          `Bearer ${res.data.refreshToken}`
        );
        axios.defaults.headers.common[
          "authorization"
        ] = `Bearer ${res.data.token}`;
        commit("setAuthData", res.data);
        return res;
      })
      .catch(err => {
        localStorage.removeItem("user-token");
        localStorage.removeItem("user-refreshToken");
        console.log(err.message);
      });
  },
  authUser({ commit }, token) {
    return axios
      .get("users/me", {
        params: { token: token }
      })
      .then(res => commit("setUserMe", res.data))
      .catch(err => err);
  },
  logOut({ commit }) {
    commit("destroyAuthData");
    localStorage.removeItem("user-token");
    localStorage.removeItem("user-refreshToken");
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
