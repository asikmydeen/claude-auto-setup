import Swal from "sweetalert2";

const state = {};

const mutations = {};

const actions = {
  success({ commit, dispatch }, message) {
    this.$app.$notify({
      message: message,
      icon: "now-ui-icons ui-1_bell-53",
      type: "success",
    });
  },

  error({ commit, dispatch }, message) {
    this.$app.$notify({
      message: message,
      icon: "now-ui-icons ui-1_bell-53",
      type: "danger",
    });
  },
  async confirmation({ commit, dispatch }, title) {
    return await Swal.fire({
      title: title,
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      confirmButtonClass: "btn btn-success btn-fill",
      cancelButtonClass: "btn btn-danger btn-fill",
      buttonsStyling: false,
    });
  },
};

const getters = {};

const alerts = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

export default alerts;
