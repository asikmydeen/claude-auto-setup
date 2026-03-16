<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>
    <side-bar :background-color="sidebarBackground">
      <template slot-scope="props" slot="links">
        <user-menu></user-menu>
        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'now-ui-icons design_app',
            path: '/dashboard',
          }"
        >
        </sidebar-item>
        <sidebar-item
          opened
          v-if="roles"
          :link="{
            name: 'Examples (API)',
            icon: 'fab fa-vuejs',
          }"
        >
          <sidebar-item
            :link="{ name: 'User Profile', path: '/examples/user-profile' }"
          ></sidebar-item>
          <sidebar-item
            v-if="roles.includes('admin')"
            :link="{
              name: 'Role Management',
              path: '/examples/role-management/list-roles',
            }"
          ></sidebar-item>
          <sidebar-item
            v-if="roles.includes('admin')"
            :link="{
              name: 'User Management',
              path: '/examples/user-management/list-users',
            }"
          ></sidebar-item>
          <sidebar-item
            v-if="roles.includes('admin') || roles.includes('creator')"
            :link="{
              name: 'Category Management',
              path: '/examples/category-management/list-categories',
            }"
          ></sidebar-item>
          <sidebar-item
            v-if="roles.includes('admin') || roles.includes('creator')"
            :link="{
              name: 'Tag Management',
              path: '/examples/tag-management/list-tags',
            }"
          ></sidebar-item>
          <sidebar-item
            :link="{
              name: 'Item Management',
              path: '/examples/item-management/list-items',
            }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item
          :link="{ name: 'Pages', icon: 'now-ui-icons design_image' }"
        >
          <sidebar-item
            :link="{ name: 'Pricing', path: '/pricing' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Timeline', path: '/pages/timeline' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Lock Screen', path: '/lock' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'User Profile', path: '/pages/user' }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item
          :link="{ name: 'Components', icon: 'now-ui-icons education_atom' }"
        >
          <sidebar-item
            :link="{ name: 'Buttons', path: '/components/buttons' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Grid System', path: '/components/grid-system' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Panels', path: '/components/panels' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Sweet Alert', path: '/components/sweet-alert' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Notifications', path: '/components/notifications' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Icons', path: '/components/icons' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Typography', path: '/components/typography' }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item
          :link="{ name: 'Forms', icon: 'now-ui-icons files_single-copy-04' }"
        >
          <sidebar-item
            :link="{ name: 'Regular Forms', path: '/forms/regular' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Extended Forms', path: '/forms/extended' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Validation Forms', path: '/forms/validation' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Wizard', path: '/forms/wizard' }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item
          :link="{ name: 'Tables', icon: 'now-ui-icons design_bullet-list-67' }"
        >
          <sidebar-item
            :link="{ name: 'Regular Tables', path: '/table-list/regular' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Extended Tables', path: '/table-list/extended' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Paginated Tables', path: '/table-list/paginated' }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item
          :link="{ name: 'Maps', icon: 'now-ui-icons location_pin' }"
        >
          <sidebar-item
            :link="{ name: 'Google Maps', path: '/maps/google' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Full Screen Maps', path: '/maps/full-screen' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Vector Maps', path: '/maps/vector-map' }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Widgets',
            icon: 'now-ui-icons objects_diamond',
            path: '/widgets',
          }"
        ></sidebar-item>
        <sidebar-item
          :link="{
            name: 'Charts',
            icon: 'now-ui-icons business_chart-pie-36',
            path: '/charts',
          }"
        ></sidebar-item>
        <sidebar-item
          :link="{
            name: 'Calendar',
            icon: 'now-ui-icons media-1_album',
            path: '/calendar',
          }"
        ></sidebar-item>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>
      <sidebar-share
        :color.sync="sidebarBackground"
        :fixed-navbar.sync="fixedNavbar"
        :sidebarMini.sync="sidebarMini"
        style="cursor: pointer"
      >
      </sidebar-share>
      <router-view name="header"></router-view>

      <div
        :class="{ content: !$route.meta.hideContent }"
        @click="toggleSidebar"
      >
        <zoom-center-transition :duration="200" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </zoom-center-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import UserMenu from "./Extra/UserMenu.vue";
import { ZoomCenterTransition } from "vue2-transitions";
import Vuex from "vuex";
import SidebarShare from "./Extra/SidebarSharePlugin";

export default {
  components: {
    TopNavbar,
    ContentFooter,
    UserMenu,
    ZoomCenterTransition,
    SidebarShare,
  },
  data() {
    return {
      roles: [],
      sidebarBackground: "black",
      fixedNavbar: false,
      sidebarMini: false,
    };
  },
  methods: {
    initScrollbar() {
      let isWindows = navigator.platform.startsWith("Win");
      if (isWindows) {
        initScrollbar("sidenav");
      }
    },
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
        let text = this.$sidebar.isMinimized ? "activated" : "deactivated";
        this.$notify({ type: "info", message: `Sidebar mini ${text}...` });
      }
    },
  },
  mounted() {
    let docClasses = document.body.classList;
    let isWindows = navigator.platform.startsWith("Win");
    if (isWindows) {
      // if we are on windows OS we activate the perfectScrollbar function
      initScrollbar("sidebar");
      initScrollbar("sidebar-wrapper");

      docClasses.add("perfect-scrollbar-on");
    } else {
      docClasses.add("perfect-scrollbar-off");
    }
    this.initScrollbar(), this.$store.dispatch("profile/me");
  },
  computed: {
    ...Vuex.mapState({
      me: (state) => state.profile.me,
    }),
  },
  watch: {
    me: {
      handler: function (val) {
        this.roles = val.roles.map((r) => r.name);
      },
      deep: true,
    },
    sidebarMini() {
      this.minimizeSidebar();
    },
  },
};
</script>
<style lang="scss">
$scaleSize: 0.95;
@keyframes zoomIn95 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  to {
    opacity: 1;
  }
}
.main-panel .zoomIn {
  animation-name: zoomIn95;
}
@keyframes zoomOut95 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}
.main-panel .zoomOut {
  animation-name: zoomOut95;
}
</style>
