import 'devextreme/dist/css/dx.common.css';
import './themes/generated/theme.base.css';
import './themes/generated/theme.additional.css';
import Vue from "vue";

import router from "./router";
import appInfo from "./app-info";

import axios from 'axios'
import App from "@/App.vue";
Vue.config.productionTip = false;
Vue.prototype.$appInfo = appInfo;
Vue.prototype.$axios = axios;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
