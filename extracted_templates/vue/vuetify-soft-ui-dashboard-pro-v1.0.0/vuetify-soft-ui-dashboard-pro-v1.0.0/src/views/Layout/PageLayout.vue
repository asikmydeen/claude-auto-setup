<template>
  <v-app>
    <v-main class="auth-pages">
      <div
        class="header-auth position-relative ma-4 pb-16 pt-16 border-radius-xl"
        :class="this.$route.name == 'Pricing' ? 'bg-gradient-primary' : ''"
      >
        <v-img
          src="@/assets/img/shapes/waves-white.svg"
          alt="pattern-lines"
          class="position-absolute opacity-6 start-0 top-0 w-100"
          v-if="this.$route.name == 'Pricing'"
        ></v-img>
        <v-container>
          <v-row class="d-flex mt-5">
            <v-col cols="12" md="6" class="mx-auto py-0">
              <h3
                class="text-h3 font-weight-bold text-white text-center mb-2"
                v-if="this.$route.name == 'Pricing'"
              >
                {{ headerTitle() }}
              </h3>
              <h1
                class="
                  text-h1 text-white
                  font-weight-bolder
                  text-center
                  mb-2
                  mt-5
                "
                v-else
              >
                {{ headerTitle() }}
              </h1>
              <p
                class="
                  text-white
                  font-size-root
                  text-center
                  font-weight-thin
                  mb-12
                "
              >
                {{ paragraphs }}
              </p>

              <v-col
                md="6"
                cols="7"
                class="mx-auto text-center mb-14"
                v-if="this.$route.name == 'Pricing'"
              >
                <v-tabs v-model="tab" hide-slider class="border-radius-lg">
                  <v-tabs-slider></v-tabs-slider>

                  <v-tab :ripple="false" class="ms-auto" href="#tab-1">
                    Monthly
                  </v-tab>

                  <v-tab :ripple="false" class="me-auto" href="#tab-2">
                    Annual
                  </v-tab>
                </v-tabs>
              </v-col>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <app-bar-auth background="transparent" has-bg linkColor="white">
      </app-bar-auth>
      <fade-transition :duration="200" origin="center top" mode="out-in">
        <!-- your content here -->
        <v-container class="mt-n16 pb-0">
          <router-view></router-view>
          <content-footer auth v-if="!$route.meta.hideFooter"></content-footer>
        </v-container>
      </fade-transition>
    </v-main>
  </v-app>
</template>
<script>
import AppBarAuth from "@/components/AppBarAuth";
import { FadeTransition } from "vue2-transitions";
import ContentFooter from "@/components/Footer.vue";

export default {
  name: "page-layout",
  components: {
    AppBarAuth,
    FadeTransition,
    ContentFooter,
  },
  data() {
    return {
      paragraphs: "",
      tab: null,
    };
  },
  methods: {
    headerTitle() {
      switch (this.$route.name) {
        case "Pricing":
          this.paragraphs =
            "You have Free Unlimited Updates and Premium Support on each package.";
          return "See our pricing";
        case "SignUpBasic":
          this.paragraphs =
            "Use these awesome forms to login or create new account in your project for free.";
          return "Welcome!";
        case "Register":
          this.paragraphs =
            "Use these awesome forms to login or create new account in your project for free.";
          return "Create an account";
        case "Lock":
          this.paragraphs = "Better to be safe than sorry.";
          return "Lock screen";
        default:
          break;
      }
    },
  },
};
</script>
