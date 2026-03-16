<script setup>
import { onBeforeMount, onBeforeUnmount } from "vue";
import { useStore } from "vuex";

import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";

const store = useStore();
const toggleDefaultLayout = () => store.commit("toggleDefaultLayout");

onBeforeMount(() => {
  store.state.hideConfigButton = true;
  toggleDefaultLayout();
});
onBeforeUnmount(() => {
  store.state.hideConfigButton = false;
  toggleDefaultLayout();
});
</script>
<template>
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <navbar
          btn-background="bg-gradient-success"
          :dark-mode="true"
          is-blur="blur border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow"
        />
      </div>
    </div>
  </div>
  <main class="main-content main-content-bg mt-0">
    <div
      class="page-header min-vh-100"
      style="
        background-image: url(&quot;https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/lock-basic.jpg&quot;);
      "
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-md-7">
            <div class="card py-lg-3">
              <div class="card-body text-center">
                <h4 class="mb-0 font-weight-bolder">Mike Priesler</h4>
                <p class="mb-4">Enter password to unlock your account.</p>
                <form role="form">
                  <argon-input
                    id="password"
                    type="password"
                    placeholder="Password"
                    aria-label="password"
                  />
                  <div class="text-center">
                    <argon-button
                      size="lg"
                      full-width
                      color="dark"
                      variant="gradient"
                      class="mb-0"
                      >Unlock</argon-button
                    >
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <app-footer />
</template>
