import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import VueSweetalert2 from "vue-sweetalert2";
import MaterialDashboard from "./material-dashboard";

const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);
appInstance.use(VueSweetalert2);
appInstance.use(MaterialDashboard);
appInstance.mount("#app");
