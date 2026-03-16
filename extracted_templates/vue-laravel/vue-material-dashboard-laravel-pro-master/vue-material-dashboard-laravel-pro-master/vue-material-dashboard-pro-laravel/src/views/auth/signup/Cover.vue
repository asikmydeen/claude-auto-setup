<template>
  <navbar btn-background="bg-gradient-success" />

  <main class="mt-0 main-content main-content-bg">
    <div
      class="page-header align-items-start min-height-300 m-3 border-radius-xl bg-gray-200"
      style="
        background-image: url('https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
        background-size: cover;
        background-position: center;
      "
    >
      <span class="mask bg-gradient-dark opacity-4"></span>
    </div>
    <div class="container">
      <div class="row mt-lg-n12 mt-md-n12 mt-n11 justify-content-center">
        <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
          <div class="card mt-8">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div
                class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1 text-center py-4"
              >
                <h4 class="font-weight-bolder text-white mt-1">
                  Join us today
                </h4>
                <p class="mb-1 text-white text-sm">
                  Enter your email and password to register
                </p>
              </div>
            </div>
            <div class="card-body pb-3">
              <form role="form">
                <div class="mb-3">
                  <material-input id="name" label="Name" />
                </div>
                <div class="mb-3">
                  <material-input id="email" type="email" label="Email" />
                </div>
                <div class="mb-3">
                  <material-input id="password" type="password" label="Password" />
                </div>
                <material-checkbox
                  id="flexCheckDefault"
                  class="font-weight-light"
                  checked
                >
                  I agree the
                  <a
                    href="../../../pages/privacy.html"
                    class="text-dark font-weight-bolder"
                    >Terms and Conditions</a
                  >
                </material-checkbox>
                <div class="text-center">
                  <material-button
                    color="success"
                    variant="gradient"
                    full-width
                    class="mt-4 mb-0"
                    >Sign up</material-button
                  >
                </div>
              </form>
            </div>
            <div class="card-footer text-center pt-0 px-sm-4 px-1">
              <p class="mb-4 mx-auto">
                Already have an account?
                <router-link
                  :to="{ name: 'Signin Cover' }"
                  class="text-success text-gradient font-weight-bold"
                  >Sign in</router-link
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <app-footer />
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialCheckbox from "@/components/MaterialCheckbox.vue";
import MaterialButton from "@/components/MaterialButton.vue";
const body = document.getElementsByTagName("body")[0];
import { mapMutations } from "vuex";

export default {
  name: "SignupCover",
  components: {
    Navbar,
    AppFooter,
    MaterialInput,
    MaterialCheckbox,
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
