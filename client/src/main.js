import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import httpHandler from "./helpers/httpHandler";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
//axios config
httpHandler();

new Vue({
  router,
  store,
  vuetify,
  icons: {
    iconfont: "md"
  },
  render: h => h(App)
}).$mount("#app");
