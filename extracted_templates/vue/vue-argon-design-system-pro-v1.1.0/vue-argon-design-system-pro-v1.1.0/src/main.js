/**
  =========================================================
  * Vue Argon Design System PRO - v1.1.0
  =========================================================
  * Product Page: https://creative-tim.com/product/vue-argon-design-system-pro
  * Copyright 2023 Creative Tim (https://www.creative-tim.com)
  Coded by www.creative-tim.com
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Argon from "./plugins/argon-kit";

Vue.config.productionTip = false;
Vue.use(Argon);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
