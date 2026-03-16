<template>
  <div class="wrapper">
    <!-- <div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}"> -->
    <sidebar-fixed-toggle-button />
    <side-bar :background-color="backgroundColor">
      <!-- <mobile-menu slot="content"></mobile-menu> -->
      <template slot="links">
        <sidebar-link
          :link="{
            name: $t('sidebar.dashboard'),
            icon: 'tim-icons icon-chart-pie-36',
            path: '/dashboard'
          }"
        >
        </sidebar-link>
        <sidebar-link
          :link="{
            name: $t('sidebar.pages'),
            icon: 'tim-icons icon-image-02'
          }"
        >
          <sidebar-link
            :link="{ name: $t('sidebar.pricing'), path: '/pricing' }"
          ></sidebar-link>
          <sidebar-link
            :link="{ name: $t('sidebar.rtl'), path: '/rtl' }"
          ></sidebar-link>
          <sidebar-link
            :link="{ name: $t('sidebar.timeline'), path: '/timeline' }"
          ></sidebar-link>
          <sidebar-link
            :link="{ name: $t('sidebar.login'), path: '/login' }"
          ></sidebar-link>
          <sidebar-link
            :link="{ name: $t('sidebar.register'), path: '/register' }"
          ></sidebar-link>
          <sidebar-link
            :link="{ name: $t('sidebar.lock'), path: '/lock' }"
          ></sidebar-link>
          <sidebar-link
            :link="{ name: $t('sidebar.userProfile'), path: '/user' }"
          ></sidebar-link>
        </sidebar-link>
        <sidebar-link
          :link="{
            name: $t('sidebar.components'),
            icon: 'tim-icons icon-molecule-40'
          }"
        >
          <sidebar-link :link="{ name: $t('sidebar.multiLevelCollapse') }">
            <sidebar-link
              :link="{
                name: $t('sidebar.example'),
                isRoute: false,
                path: 'https://google.com',
                target: '_blank'
              }"
            ></sidebar-link>
          </sidebar-link>

          <sidebar-link
            :link="{ name: $t('sidebar.buttons'), path: '/components/buttons' }"
          ></sidebar-link>
          <sidebar-link
            :link="{
              name: $t('sidebar.gridSystem'),
              path: '/components/grid-system'
            }"
          ></sidebar-link>
          <sidebar-link
            :link="{ name: $t('sidebar.panels'), path: '/components/panels' }"
          ></sidebar-link>
          <sidebar-link
            :link="{
              name: $t('sidebar.sweetAlert'),
              path: '/components/sweet-alert'
            }"
          ></sidebar-link>
          <sidebar-link
            :link="{
              name: $t('sidebar.notifications'),
              path: '/components/notifications'
            }"
          ></sidebar-link>
          <sidebar-link
            :link="{ name: $t('sidebar.icons'), path: '/components/icons' }"
          ></sidebar-link>
          <sidebar-link
            :link="{
              name: $t('sidebar.typography'),
              path: '/components/typography'
            }"
          ></sidebar-link>
        </sidebar-link>

        <sidebar-link
          :link="{ name: $t('sidebar.forms'), icon: 'tim-icons icon-notes' }"
        >
          <sidebar-link
            :link="{ name: $t('sidebar.regularForms'), path: '/forms/regular' }"
          ></sidebar-link>
          <sidebar-link
            :link="{
              name: $t('sidebar.extendedForms'),
              path: '/forms/extended'
            }"
          ></sidebar-link>
          <sidebar-link
            :link="{
              name: $t('sidebar.validationForms'),
              path: '/forms/validation'
            }"
          ></sidebar-link>
          <sidebar-link
            :link="{ name: $t('sidebar.wizard'), path: '/forms/wizard' }"
          ></sidebar-link>
        </sidebar-link>
        <sidebar-link
          :link="{
            name: $t('sidebar.tables'),
            icon: 'tim-icons icon-puzzle-10'
          }"
        >
          <sidebar-link
            :link="{
              name: $t('sidebar.regularTables'),
              path: '/table-list/regular'
            }"
          ></sidebar-link>
          <sidebar-link
            :link="{
              name: $t('sidebar.extendedTables'),
              path: '/table-list/extended'
            }"
          ></sidebar-link>
          <sidebar-link
            :link="{
              name: $t('sidebar.paginatedTables'),
              path: '/table-list/paginated'
            }"
          ></sidebar-link>
        </sidebar-link>
        <sidebar-link
          :link="{ name: $t('sidebar.maps'), icon: 'tim-icons icon-pin' }"
        >
          <sidebar-link
            :link="{ name: $t('sidebar.googleMaps'), path: '/maps/google' }"
          ></sidebar-link>
          <sidebar-link
            :link="{
              name: $t('sidebar.fullScreenMaps'),
              path: '/maps/full-screen'
            }"
          ></sidebar-link>
          <sidebar-link
            :link="{ name: $t('sidebar.vectorMaps'), path: '/maps/vector-map' }"
          ></sidebar-link>
        </sidebar-link>
        <sidebar-link
          :link="{
            name: $t('sidebar.widgets'),
            icon: 'tim-icons icon-settings',
            path: '/widgets'
          }"
        ></sidebar-link>
        <sidebar-link
          :link="{
            name: $t('sidebar.charts'),
            icon: 'tim-icons icon-chart-bar-32',
            path: '/charts'
          }"
        ></sidebar-link>
        <sidebar-link
          :link="{
            name: $t('sidebar.calendar'),
            icon: 'tim-icons icon-time-alarm',
            path: '/calendar'
          }"
        ></sidebar-link>
      </template>
    </side-bar>
    <sidebar-share :background-color.sync="backgroundColor"></sidebar-share>

    <div class="main-panel" :data="backgroundColor">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"></dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./DashboardContent.vue";
import SidebarShare from "./SidebarSharePlugin.vue";
import SideBar from "@/components/SidebarPlugin/SideBar.vue";
import SidebarLink from "@/components/SidebarPlugin/SidebarLink.vue";
import SidebarFixedToggleButton from "./SidebarFixedToggleButton.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    SideBar,
    SidebarLink,
    SidebarShare,
    SidebarFixedToggleButton
  },
  data() {
    return {
      backgroundColor: "green"
    };
  },
  computed: {
    isRTL() {
      return this.$rtl.isRTL;
    }
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
