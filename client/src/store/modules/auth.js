import axios from "axios";

const state = {
  showLogin: true,
  authData: {status:200},
  forgotPassDialog: false,
  token: localStorage.getItem("user-token") || "",
  refreshToken: localStorage.getItem("user-refreshToken") || "",
  userMe: {}
};

const getters = {
  authData: state => state.authData,
  token: state => state.token,
  userMe: state => state.userMe,
  isAuthenticated: state => !!state.token
};

const mutations = {
  setShowLogin: (state, showLogin) => state.showLogin = showLogin,
  setAuthData: (state, data) => state.authData = data,
  setLoginStatus: (state, data) => state.authData.status = data,
  setUserMe: (state, data) => state.userMe = data,
  setTokens: (state, data) => {
    state.token = data.token;
    state.refreshToken = data.refreshToken;
  },
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
