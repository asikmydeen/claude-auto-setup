<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot="links">
        <sidebar-item
          true
          :link="{
            name: 'Dashboards',
            icon: 'ni ni-shop text-primary',
          }"
        >
          <sidebar-item
            :link="{ name: 'Dashboard', path: '/dashboard' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: 'Alternative', path: '/alternative' }"
          ></sidebar-item>
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
          />
          <sidebar-item
            v-if="roles.includes('admin')"
            :link="{
              name: 'Role Management',
              path: '/examples/role-management/list-roles',
            }"
          />
          <sidebar-item
            v-if="roles.includes('admin')"
            :link="{
              name: 'User Management',
              path: '/examples/user-management/list-users',
            }"
          />
          <sidebar-item
            v-if="roles.includes('admin') || roles.includes('creator')"
            :link="{
              name: 'Category Management',
              path: '/examples/category-management/list-categories',
            }"
          />
          <sidebar-item
            v-if="roles.includes('admin') || roles.includes('creator')"
            :link="{
              name: 'Tag Management',
              path: '/examples/tag-management/list-tags',
            }"
          />
          <sidebar-item
            :link="{
              name: 'Item Management',
              path: '/examples/item-management/list-items',
            }"
          />
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Pages',
            icon: 'ni ni-ungroup text-orange',
          }"
        >
          <sidebar-item :link="{ name: 'Pricing', path: '/pricing' }" />
          <sidebar-item :link="{ name: 'Lock', path: '/lock' }" />
          <sidebar-item :link="{ name: 'Timeline', path: '/pages/timeline' }" />
          <sidebar-item :link="{ name: 'Profile', path: '/pages/user' }" />
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Components',
            icon: 'ni ni-ui-04 text-info',
          }"
        >
          <sidebar-item
            :link="{ name: 'Buttons', path: '/components/buttons' }"
          />
          <sidebar-item :link="{ name: 'Cards', path: '/components/cards' }" />
          <sidebar-item
            :link="{ name: 'Grid', path: '/components/grid-system' }"
          />
          <sidebar-item
            :link="{ name: 'Notifications', path: '/components/notifications' }"
          />
          <sidebar-item :link="{ name: 'Icons', path: '/components/icons' }" />
          <sidebar-item
            :link="{ name: 'Typography', path: '/components/typography' }"
          />

          <sidebar-item :link="{ name: 'Multi Level' }">
            <sidebar-item :link="{ name: 'Third level menu', path: '#!' }" />
            <sidebar-item :link="{ name: 'Just another link', path: '#a' }" />
            <sidebar-item :link="{ name: 'One last link', path: '#b' }" />
          </sidebar-item>
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Forms',
            icon: 'ni ni-single-copy-04 text-pink',
          }"
        >
          <sidebar-item :link="{ name: 'Elements', path: '/forms/elements' }" />
          <sidebar-item
            :link="{ name: 'Components', path: '/forms/components' }"
          />
          <sidebar-item
            :link="{ name: 'Validation', path: '/forms/validation' }"
          />
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Tables',
            icon: 'ni ni-align-left-2 text-default',
          }"
        >
          <sidebar-item :link="{ name: 'Tables', path: '/tables/regular' }" />
          <sidebar-item
            :link="{ name: 'Sortable', path: '/tables/sortable' }"
          />
          <sidebar-item
            :link="{ name: 'Paginated Tables', path: '/tables/paginated' }"
          />
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Maps',
            icon: 'ni ni-map-big text-primary',
          }"
        >
          <sidebar-item :link="{ name: 'Google', path: '/maps/google' }" />
          <sidebar-item :link="{ name: 'Vector', path: '/maps/vector' }" />
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Widgets',
            icon: 'ni ni-archive-2 text-green',
            path: '/widgets',
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Charts',
            icon: 'ni ni-chart-pie-35 text-info',
            path: '/charts',
          }"
        >
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Calendar',
            icon: 'ni ni-calendar-grid-58 text-red',
            path: '/calendar',
          }"
        >
        </sidebar-item>

        <hr
          class="my-3"
          style="
            border-color: rgba(0, 0, 0, 0.1) currentcolor currentcolor;
            border-style: solid none none;
            border-width: 1px 0px 0px;
            border-image: none 100% / 1 / 0 stretch;
            min-width: 80%;
            overflow: visible;
            box-sizing: content-box;
            height: 0px;
          "
        />
        <sidebar-item
          :link="{
            name: 'Purchase now',
            icon: 'fas fa-download mr-4',
            target: '_blank',
            isRoute: true,
            path:
              'https://www.creative-tim.com/product/vue-argon-dashboard-pro-laravel-bs4',
          }"
          class="btn btn-danger"
          id="purchase-button"
        ></sidebar-item>
        <sidebar-item
          :link="{
            name: 'Get free demo',
            icon: 'fas fa-gift mr-4',
            target: '_blank',
            isRoute: true,
            path:
              'https://www.creative-tim.com/product/vue-argon-dashboard-laravel-bs4',
          }"
          class="btn btn-info"
          id="demo-button"
        ></sidebar-item>
        <sidebar-item
          :link="{
            name: 'Star us on Github',
            icon: 'fab fa-github mr-4',
            target: '_blank',
            isRoute: true,
            path:
              'https://github.com/creativetimofficial/ct-vue-argon-dashboard-pro-laravel-bs4',
          }"
          class="btn btn-dark"
          id="star-button"
        ></sidebar-item>
        <sidebar-item
          :link="{
            name: 'Documentation',
            icon: 'fas fa-file-alt mr-4',
            target: '_blank',
            isRoute: true,
            path:
              'https://vue-argon-dashboard-pro-laravel-bs4.creative-tim.com/documentation/',
          }"
          class="btn btn-neutral"
          id="docs-button"
        ></sidebar-item>
      </template>
    </side-bar>
    <div class="main-content">
      <dashboard-navbar :type="$route.meta.navbarType"></dashboard-navbar>

      <div @click="$sidebar.displaySidebar(false)">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
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

import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import { FadeTransition } from "vue2-transitions";
import Vuex from "vuex";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    FadeTransition,
  },
  data() {
    return {
      roles: [],
    };
  },
  methods: {
    initScrollbar() {
      let isWindows = navigator.platform.startsWith("Win");
      if (isWindows) {
        initScrollbar("sidenav");
      }
    },
  },
  mounted() {
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
  },
};
</script>
<style lang="scss">
body.g-sidenav-hidden {
  #purchase-button,
  #demo-button,
  #star-button,
  #docs-button {
    margin-left: 8px;
    margin-right: 8px;
    padding: 11px 0px;
  }
}
body.g-sidenav-show {
  #purchase-button,
  #demo-button,
  #star-button,
  #docs-button {
    margin-left: 20px;
    margin-right: 20px;
    padding: 11px 0px;
  }
}
</style>
