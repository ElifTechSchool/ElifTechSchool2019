import Vue from "vue";
import Vuex from "vuex";
import users from "./modules/users";
import ranks from "./modules/ranks";
import snackbar from "./modules/snackbar";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    ranks,
    snackbar
  }
});
