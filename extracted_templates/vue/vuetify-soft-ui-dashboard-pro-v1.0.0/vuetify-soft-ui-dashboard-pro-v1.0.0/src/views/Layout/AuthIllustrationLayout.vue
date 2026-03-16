<template>
  <v-app class="bg-white">
    <v-container class="position-sticky top-0 z-index-2 py-0">
      <v-row>
        <v-col cols="12" class="py-0">
          <app-bar-blur-auth> </app-bar-blur-auth>
        </v-col>
      </v-row>
    </v-container>
    <v-main class="auth-pages">
      <div class="header-auth position-relative border-radius-xl min-vh-100">
        <v-container class="py-0">
          <v-row>
            <v-col lg="4" md="7" class="d-flex flex-column mx-lg-0 mx-auto">
              <fade-transition
                :duration="200"
                origin="center top"
                mode="out-in"
              >
                <!-- your content here -->
                <router-view></router-view>
              </fade-transition>
            </v-col>
            <v-col
              cols="6"
              class="
                d-lg-flex d-none
                h-100
                my-auto
                pe-0
                pt-0
                position-absolute
                top-0
                end-0
                text-center
                justify-center
                flex-column
              "
            >
              <div
                class="
                  position-relative
                  bg-gradient-primary
                  h-100
                  ma-4
                  px-16
                  border-radius-lg
                  d-flex
                  flex-column
                  justify-center
                "
              >
                <v-img
                  src="@/assets/img/shapes/pattern-lines.svg"
                  alt="pattern-lines"
                  class="position-absolute opacity-4 start-0 h-100 w-100"
                >
                </v-img>
                <div class="position-relative">
                  <v-img
                    src="@/assets/img/illustrations/rocket-white.png"
                    alt="rocket"
                    max-width="500"
                    class="w-100 position-relative z-index-2 mx-auto"
                  >
                  </v-img>
                </div>
                <h4 class="text-h4 mt-10 text-white font-weight-bolder mb-2">
                  Your journey starts here
                </h4>
                <p class="text-white">
                  Just as it takes a company to sustain a product, it takes a
                  community to sustain a protocol.
                </p>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-main>
  </v-app>
</template>
<script>
import AppBarBlurAuth from "@/components/AppBarBlurAuth";
import { FadeTransition } from "vue2-transitions";

export default {
  name: "page-layout",
  components: {
    AppBarBlurAuth,
    FadeTransition,
  },
  data() {
    return {};
  },
};
</script>
