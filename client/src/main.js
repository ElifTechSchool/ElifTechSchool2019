import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import httpHandler from "./helpers/httpHandler";
import vuetify from "./plugins/vuetify";
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  httpHandler,
  vuetify,
  icons: {
    iconfont: 'md',
  },
  render: h => h(App)
}).$mount("#app");
