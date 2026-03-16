<template>
  <navbar btn-background="btn-white" />
  <div
    class="page-header align-items-start min-height-300 m-3 border-radius-xl"
    style="
      background-image: url('https://images.unsplash.com/photo-1491466424936-e304919aada7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1949&q=80');
    "
  >
    <span class="mask bg-gradient-dark opacity-6"></span>
  </div>
  <div class="container mb-4">
    <div class="row mt-lg-n12 mt-md-n12 mt-n12 justify-content-center">
      <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
        <div class="card mt-8">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div
              class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1 text-center py-4"
            >
              <h4 class="font-weight-bolder text-white mt-1">Sign In</h4>
              <p class="mb-1 text-sm text-white">
                Enter your email and password to Sign In
              </p>
            </div>
          </div>
          <div class="card-body">
            <form role="form" class="text-start">
              <div class="mb-4">
                <material-input
                  id="email"
                  type="email"
                  placeholder="john@email.com"
                  name="email"
                  label="Email"
                  variant="static"
                />
              </div>
              <div class="mb-4">
                <material-input
                  id="password"
                  type="password"
                  placeholder="password"
                  name="password"
                  label="Password"
                  variant="static"
                />
              </div>
              <material-switch id="rememberMe" name="Remember Me" checked
                >Remember me</material-switch
              >
              <div class="text-center">
                <material-button
                  class="my-4 mb-2"
                  variant="gradient"
                  color="dark"
                  full-width
                  >Sign in</material-button
                >
              </div>
            </form>
            <div class="px-1 pt-0 text-center card-footer px-lg-2 mt-3">
              <p class="mx-auto mb-4 text-sm">
                Don't have an account?
                <router-link
                  :to="{ name: 'Signup Cover' }"
                  class="text-success text-gradient font-weight-bold"
                  >Sign up</router-link
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <app-footer />
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";
import MaterialButton from "@/components/MaterialButton.vue";
const body = document.getElementsByTagName("body")[0];
import { mapMutations } from "vuex";

export default {
  name: "SigninCover",
  components: {
    Navbar,
    AppFooter,
    MaterialInput,
    MaterialSwitch,
    MaterialButton,
  },
  beforeMount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.add("bg-gray-100");
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
  },
};
</script>
