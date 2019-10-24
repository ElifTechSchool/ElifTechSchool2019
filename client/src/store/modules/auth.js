import axios from "axios";

const state = {
  forgotPassDialog: false,
  token: localStorage.getItem("user-token") || "",
  refreshToken: localStorage.getItem("user-refreshToken") || "",
  userMe: {}
};

const getters = {
  token: state => state.token,
  userMe: state => state.userMe,
  isAuthenticated: state => !!state.token
};

const mutations = {
  setUserMe: (state, data) => (state.userMe = data),
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
  async loginUser({ commit, dispatch }, newUser) {
    return await axios
      .post("login", newUser)
      .then(res => {
        commit("setTokens", res.data);
        localStorage.setItem("user-token", `Bearer ${res.data.token}`);
        localStorage.setItem("user-refreshToken", `${res.data.refreshToken}`);
        axios.defaults.headers.common[
          "authorization"
        ] = `Bearer ${res.data.token}`;
        return res;
      })
      .catch(err => {
        dispatch("showSnackBar", {
          response: "Bad email or password",
          color: "red"
        });
        localStorage.removeItem("user-token");
        localStorage.removeItem("user-refreshToken");
      });
  },
  authUser({ commit, dispatch }, token) {
    const tokenParsed = token.split(/(Bearer )/).reverse();
    return axios
      .get("users/me")
      .then(res => commit("setUserMe", res.data))
      .catch(err => {
        dispatch("showSnackBar", { response: err, color: "red" });
        return err;
      });
  },
  logOut({ commit }) {
    commit("destroyAuthData");
    localStorage.removeItem("user-token");
    localStorage.removeItem("user-refreshToken");
  },
  forgotPass(_, email) {
    return axios.post("users/passwords", email).catch(err => err);
  },
  changePasswordToken({ dispatch }, data) {
    return axios
      .put("/users/passwords", data)
      .catch(err => dispatch("showSnackBar", { response: err, color: "red" }));
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
