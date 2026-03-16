<template>
  <div class="fixed-plugin" v-click-outside="closeDropDown">
    <div class="dropdown show-dropdown" :class="{ show: isOpen }">
      <a data-toggle="dropdown" class="settings-icon">
        <i class="fa fa-cog fa-2x" @click="toggleDropDown"> </i>
      </a>
      <ul class="dropdown-menu" :class="{ show: isOpen }">
        <li class="header-title">Sidebar Background</li>
        <li class="adjustments-line">
          <a class="switch-trigger background-color">
            <div class="badge-colors text-center">
              <span
                v-for="item in sidebarColors"
                :key="item.color"
                class="badge filter"
                :class="[`badge-${item.color}`, { active: item.active }]"
                :data-color="item.color"
                @click="changeSidebarBackground(item)"
              >
              </span>
            </div>
            <div class="clearfix"></div>
          </a>
        </li>

        <li class="header-title">Sidebar Mini</li>
        <li class="adjustments-line">
          <div class="togglebutton switch-sidebar-mini">
            <span class="label-switch">OFF</span>
            <base-switch v-model="sidebarMini" @input="minimizeSidebar">
            </base-switch>
            <span class="label-switch label-right">ON</span>
          </div>
        </li>
        <li class="button-container">
          <a
            href="https://demos.creative-tim.com/vue-white-dashboard-pro/documentation"
            target="_blank"
            class="btn btn-default btn-block btn-round"
          >
            Documentation
          </a>
          <a
            href="https://www.creative-tim.com/product/vue-white-dashboard-pro"
            target="_blank"
            class="btn btn-primary btn-block btn-round"
            >Buy for $59</a
          >
          <a
            href="https://www.creative-tim.com/product/vue-white-dashboard"
            target="_blank"
            class="btn btn-success btn-block btn-round"
            >Free Version</a
          >
        </li>

        <li class="header-title">Thank you for sharing!</li>

        <li class="button-container text-center">
          <social-sharing
            url="https://www.creative-tim.com/product/vue-white-dashboard-pro"
            inline-template
            title="Vue White Dashboard PRO - Bootstrap Admin Template for Vue.js"
            hashtags="vuejs, dashboard, bootstrap"
            twitter-user="creativetim"
          >
            <div>
              <base-button
                network="twitter"
                class="btn btn-round btn-info sharrre"
              >
                <i class="fab fa-twitter"></i>
              </base-button>
              <base-button
                network="facebook"
                class="btn btn-round btn-info sharrre"
              >
                <i class="fab fa-facebook"></i>
              </base-button>
            </div>
          </social-sharing>
        </li>

        <!-- <li class="button-container d-flex justify-content-center">
          <gh-btns-star slug="creativetimofficial/vue-white-dashboard" show-count></gh-btns-star>
          <gh-btns-fork slug="creativetimofficial/vue-white-dashboard" show-count></gh-btns-fork>
        </li> -->
      </ul>
    </div>
  </div>
</template>
<script>
import BaseSwitch from "@/components/BaseSwitch";
export default {
  components: {
    BaseSwitch
  },
  props: {
    backgroundColor: String
  },
  data() {
    return {
      sidebarMini: false,
      isOpen: false,
      sidebarColors: [
        { color: "primary", active: false, value: "primary" },
        { color: "info", active: false, value: "blue" },
        { color: "success", active: false, value: "green" },
        { color: "warning", active: false, value: "orange" },
        { color: "danger", active: false, value: "red" }
      ]
    };
  },
  methods: {
    toggleDropDown() {
      this.isOpen = !this.isOpen;
    },
    closeDropDown() {
      this.isOpen = false;
    },
    toggleList(list, itemToActivate) {
      list.forEach(listItem => {
        listItem.active = false;
      });
      itemToActivate.active = true;
    },
    changeSidebarBackground(item) {
      this.$emit("update:backgroundColor", item.value);
      this.toggleList(this.sidebarColors, item);
    },
    minimizeSidebar() {
      this.$sidebar.toggleMinimize();
    }
  }
};
</script>
<style></style>
