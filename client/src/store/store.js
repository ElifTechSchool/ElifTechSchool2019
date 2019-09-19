import Vue from "vue";
import Vuex from "vuex";
import competition from "./modules/competition";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    competition
  }
});
