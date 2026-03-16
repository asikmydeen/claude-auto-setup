import BaseButton from "./components/BaseButton.vue";
import BaseCheckbox from "./components/BaseCheckbox.vue";
import BaseRadio from "./components/BaseRadio.vue";
import SideBar from "./components/SidebarPlugin/SideBar.vue";
import DropDown from "./components/Dropdown.vue";
import Notify from "./components/NotificationPlugin";
import { Tooltip, Popover } from "element-ui";
import VeeValidate from "vee-validate";

import "@/assets/scss/white-dashboard.scss";
import "@/assets/css/nucleo-icons.css";
import "@/assets/demo/demo.css";

/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install(Vue) {
    Vue.component("base-button", BaseButton);
    Vue.component("base-checkbox", BaseCheckbox);
    Vue.component("base-radio", BaseRadio);
    Vue.component("side-bar", SideBar);

    Vue.component("drop-down", DropDown);
    Vue.component("notify", Notify);
    Vue.use(Tooltip);
    Vue.use(Popover);
    Vue.use(VeeValidate, { fieldsBagName: "veeFields" });
  }
};

export default GlobalComponents;
