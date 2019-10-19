import axios from "axios";

const state = {
    showLogin: true,
    authData: {status:200},
    userMe: {},
    forgotPassDialog: false,
}

const getters = {
    showLogin: state => state.showLogin,
    authData: state => state.authData,
    userMe: state => state.userMe,
}

const mutations = {
    setShowLogin: (state, showLogin) => state.showLogin = showLogin,
    setAuthData: (state, data) => state.authData = data,
    setLoginStatus: (state, data) => state.authData.status = data,
    setUserMe: (state, data) => state.userMe = data,
}

const actions = {
    loginUser({ commit, dispatch }, newUser) {
        return axios
            .post("login", newUser)
            .then(res => {
                commit("setAuthData", res);
                return res;
            })
            .catch(err => {
                commit("setLoginStatus", 401);
                return err;
            });
    },
    authUser({ commit }, token){
        return axios
            .get("users/me", {
                params: { token: token }
            })
            .then(res => commit("setUserMe", res.data))
            .catch(err => err);
    }
};
export default {
    state,
    getters,
    mutations,
    actions,
};