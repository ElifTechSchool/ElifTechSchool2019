import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import users from "./modules/users";
import ranks from "./modules/ranks";
import achievements from "./modules/achievements";
import competitions from "./modules/competitions";
import snackbar from "./modules/snackbar";
import passReset from "./modules/passReset";


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    users,
    ranks,
    achievements,
    competitions,
    snackbar,
    passReset,
  }
});
