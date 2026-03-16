<template>
  <v-container>
    <v-row>
      <v-col cols="4" class="position-relative py-0">
        <v-list v-for="item in pages1" :key="item.title" class="px-3">
          <v-subheader class="d-flex align-center mb-0">
            <v-list-item-icon
              class="
                shadow
                border-radius-md
                bg-gradient-primary
                py-1
                px-1
                align-center
                me-2
                mt-3
              "
            >
              <v-img :src="item.image" height="16" width="16" contain> </v-img>
            </v-list-item-icon>
            <span class="text-dark font-weight-bolder text-sm">{{
              item.title
            }}</span>
            <v-spacer></v-spacer>
          </v-subheader>
          <v-list-item
            v-for="item2 in item.links"
            :key="item2.title"
            class="mb-0 ms-4 ps-4"
          >
            <v-btn
              :ripple="false"
              text
              class="text-body text-capitalize ls-0"
              depressed
              link
              :to="item2.link"
            >
              <span class="text-body mb-1">{{ item2.title }}</span>
              <v-spacer></v-spacer>
            </v-btn>
          </v-list-item>
        </v-list>
        <hr class="vertical dark" />
      </v-col>
      <v-col cols="4" class="position-relative py-0">
        <v-list v-for="item in pages2" :key="item.title" class="px-3">
          <v-subheader class="d-flex align-center mb-0">
            <v-list-item-icon
              class="
                shadow
                border-radius-md
                bg-gradient-primary
                py-1
                px-1
                align-center
                me-2
                mt-3
              "
            >
              <v-img :src="item.image" height="16" width="16" contain> </v-img>
            </v-list-item-icon>
            <span class="text-dark font-weight-bolder text-sm">{{
              item.title
            }}</span>
            <v-spacer></v-spacer>
          </v-subheader>
          <v-list-item
            v-for="item2 in item.links"
            :key="item2.title"
            class="mb-0 ms-4 ps-4"
          >
            <v-btn
              :ripple="false"
              text
              class="text-body text-capitalize ls-0"
              depressed
              link
              :to="item2.link"
            >
              <span class="text-body mb-1">{{ item2.title }}</span>
              <v-spacer></v-spacer>
            </v-btn>
          </v-list-item>
        </v-list>
        <hr class="vertical dark" />
      </v-col>
      <v-col cols="4" class="position-relative py-0">
        <v-list v-for="item in pages3" :key="item.title" class="px-3">
          <v-subheader class="d-flex align-center mb-0">
            <v-list-item-icon
              class="
                shadow
                border-radius-md
                bg-gradient-primary
                py-1
                px-1
                align-center
                me-2
                mt-3
              "
            >
              <v-img :src="item.image" height="16" width="16" contain> </v-img>
            </v-list-item-icon>
            <span class="text-dark font-weight-bolder text-sm">{{
              item.title
            }}</span>
            <v-spacer></v-spacer>
          </v-subheader>
          <v-list-item
            v-for="item2 in item.links"
            :key="item2.title"
            class="mb-0 ms-4 ps-4"
          >
            <v-btn
              :ripple="false"
              text
              class="text-body text-capitalize ls-0"
              depressed
              link
              :to="item2.link"
            >
              <span class="text-body mb-1">{{ item2.title }}</span>
              <v-spacer></v-spacer>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "app-bar-authentication",
  data() {
    return {
      pages1: [
        {
          title: "Dashboards",
          image: require("@/assets/img/icons/rocket.svg"),
          links: [
            {
              title: "Default",
              link: "/pages/dashboards/default",
            },
            {
              title: "Automotive",
              link: "/pages/dashboards/automotive",
            },
            {
              title: "Smart Home",
              link: "/pages/dashboards/smart-home",
            },
            {
              title: "Virtual Reality",
              link: "/dashboards/vr/vr-default",
            },
            {
              title: "CRM",
              link: "/pages/dashboards/crm",
            },
          ],
        },
        {
          title: "Users",
          image: require("@/assets/img/icons/building.svg"),
          links: [
            {
              title: "Reports",
              link: "/pages/pages/users/reports",
            },
            {
              title: "New User",
              link: "/pages/pages/users/new-user",
            },
          ],
        },
      ],
      pages2: [
        {
          title: "Profile",
          image: require("@/assets/img/icons/shop.svg"),
          links: [
            {
              title: "Overview",
              link: "/pages/pages/profile/overview",
            },
            {
              title: "Teams",
              link: "/pages/pages/profile/teams",
            },
            {
              title: "Projects",
              link: "/pages/pages/profile/projects",
            },
          ],
        },
        {
          title: "Projects",
          image: require("@/assets/img/icons/box.svg"),
          links: [
            {
              title: "Timeline",
              link: "/pages/pages/projects/timeline",
            },
          ],
        },
      ],
      pages3: [
        {
          title: "Account",
          image: require("@/assets/img/icons/support.svg"),
          links: [
            {
              title: "Settings",
              link: "/pages/pages/account/settings",
            },
            {
              title: "Billing",
              link: "/pages/pages/account/billing",
            },
            {
              title: "Invoice",
              link: "/pages/pages/account/invoice",
            },
          ],
        },
        {
          title: "Extra",
          image: require("@/assets/img/icons/document.svg"),
          links: [
            {
              title: "Pricing Page",
              link: "/pages/pages/pricing-page",
            },
            {
              title: "RTL Page",
              link: "/pages/pages/rtl",
            },
            {
              title: "Charts",
              link: "/pages/pages/charts",
            },
          ],
        },
      ],
    };
  },
};
</script>
