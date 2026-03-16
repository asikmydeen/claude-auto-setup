import "@/assets/scss/argon-design-system.scss";
import "@/assets/vendor/nucleo/css/nucleo-icons.css";
import "@/assets/vendor/font-awesome/css/font-awesome.css";
import globalDirectives from "./globalDirectives";
import globalComponents from "./globalComponents";
import globalMixins from "./globalMixins";

export default {
  install(Vue) {
    Vue.use(globalDirectives);
    Vue.use(globalComponents);
    Vue.use(globalMixins);
  },
};
