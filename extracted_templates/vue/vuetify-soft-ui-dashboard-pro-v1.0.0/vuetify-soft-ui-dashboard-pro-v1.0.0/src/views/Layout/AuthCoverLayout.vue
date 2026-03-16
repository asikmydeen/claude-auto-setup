<template>
  <v-app class="bg-white">
    <v-container class="position-sticky top-0 z-index-2">
      <v-row>
        <v-col cols="12">
          <app-bar-blur-auth> </app-bar-blur-auth>
        </v-col>
      </v-row>
    </v-container>
    <v-main class="auth-pages">
      <div
        class="
          header-auth
          position-relative
          pb-16
          pt-16
          border-radius-xl
          min-vh-75
        "
      >
        <v-container>
          <v-row>
            <v-col lg="4" md="6" cols="12" class="d-flex flex-column mx-auto">
              <fade-transition
                :duration="200"
                origin="center top"
                mode="out-in"
              >
                <!-- your content here -->
                <router-view></router-view>
              </fade-transition>
            </v-col>
            <v-col md="6">
              <div
                class="
                  oblique
                  position-absolute
                  top-0
                  h-100
                  d-md-block d-none
                  me-n8
                "
              >
                <div
                  class="
                    oblique-image
                    position-absolute
                    fixed-top
                    ms-auto
                    h-100
                    w-100
                    z-index-0
                    ms-n16
                  "
                  :style="`background-image: url(${require('../../assets/img/curved-images/curved11.jpg')}`"
                ></div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <content-footer auth v-if="!$route.meta.hideFooter"></content-footer>
    </v-main>
  </v-app>
</template>
<script>
import AppBarBlurAuth from "@/components/AppBarBlurAuth";
import { FadeTransition } from "vue2-transitions";
import ContentFooter from "@/components/Footer.vue";

export default {
  name: "page-layout",
  components: {
    AppBarBlurAuth,
    FadeTransition,
    ContentFooter,
  },
  data() {
    return {};
  },
};
</script>
