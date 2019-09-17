import Vue from "vue";
import Vuex from "vuex";
import users from "./modules/users";
Vue.use(Vuex);

import axios from "axios";
export default new Vuex.Store({
  modules: {
    users
  }
});
