import axios from "axios";

const state = {
  token: localStorage.getItem("user-token") || "",
  refreshToken: localStorage.getItem("user-refreshToken") || "",
  userMe: {}
};

const getters = {
  authData: state => state.authData,
  userMe: state => state.userMe,
  isAuthenticated: state => !!state.token
};

const mutations = {
  setTokens: (state, data) => {
    state.token = data.token;
    state.refreshToken = data.refreshToken;
  },
  setUserMe: (state, data) => (state.userMe = data),
  destroyAuthData: state => {
    state.token = "";
    state.refreshToken = "";
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
        commit("setTokens", res.data);
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
