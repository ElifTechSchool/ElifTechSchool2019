const state = {
  snackText: "",
  snackColor: ""
};

const getters = {
  getSnackText: state => state.snackText,
  getSnackColor: state => state.snackColor
};

const mutations = {
  setSnack: (state, payload) => {
    state.snackText = payload.response;
    state.snackColor = payload.color;
  }
};

const actions = {
  showSnackBar(context, payload) {
    context.commit("setSnack", payload);
  }
};

export default {
  state,
  mutations,
  getters,
  actions
};
