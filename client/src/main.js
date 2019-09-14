import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import httpHandler from "./helpers/httpHandler";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  httpHandler,
  render: h => h(App)
}).$mount("#app");
