<script setup>
import { onBeforeMount, onBeforeUnmount } from "vue";
import { useStore } from "vuex";

const body = document.getElementsByTagName("body")[0];
const store = useStore();

onBeforeMount(() => {
  store.state.layout = "landing";
  store.state.showNavbar = false;
  store.state.showFooter = false;
  store.state.hideConfigButton = true;
  body.classList.add("landing");
});

onBeforeUnmount(() => {
  store.state.layout = "default";
  store.state.showNavbar = true;
  store.state.showFooter = true;
  store.state.hideConfigButton = false;
  body.classList.remove("landing");
});
</script>
<template>
  <main class="main-content position-relative border-radius-lg">
    <div class="container-fluid py-4">
      <div class="row min-vh-80">
        <div class="d-none d-lg-block">
          <div class="col-lg-10">
            <div
              class="position-absolute p-3 border-radius-xl blur shadow-xl perspective-right z-index-3 mt-7"
            >
              <router-link class="w-100" to="/dashboards/dashboard-default">
                <img
                  class="w-100 border-radius-lg"
                  src="../../assets/img/default.png"
                  alt="default page"
                />
              </router-link>
            </div>
            <div
              class="position-absolute p-3 border-radius-xl blur shadow-xl perspective-right-sm z-index-2 mt-3"
            >
              <img
                class="w-100 border-radius-lg"
                src="../../assets/img/automotive.png"
                alt="default page"
              />
            </div>
            <div
              class="position-absolute p-3 border-radius-xl blur shadow-xl perspective-right-xs z-index-1"
            >
              <img
                class="w-100 border-radius-lg"
                src="../../assets/img/crm.png"
                alt="default page"
              />
            </div>
          </div>
        </div>
        <div class="d-lg-none d-none d-md-block">
          <div class="col-lg-10">
            <div class="p-3 border-radius-xl blur shadow-xl z-index-3 mt-5">
              <img
                class="w-100 border-radius-lg"
                src="../../assets/img/default.png"
                alt="default page"
              />
            </div>
            <div class="p-3 border-radius-xl blur shadow-xl z-index-2 mt-4">
              <img
                class="w-100 border-radius-lg"
                src="../../assets/img/automotive.png"
                alt="default page"
              />
            </div>
          </div>
        </div>
        <div class="d-lg-none d-md-none">
          <div class="col-lg-10">
            <div class="p-3 border-radius-xl blur shadow-xl z-index-3 mt-5">
              <img
                class="w-100 border-radius-lg"
                src="../../assets/img/default.png"
                alt="default page"
              />
            </div>
            <div class="p-3 border-radius-xl blur shadow-xl z-index-2 mt-4">
              <img
                class="w-100 border-radius-lg"
                src="../../assets/img/automotive.png"
                alt="default page"
              />
            </div>
            <div class="p-3 border-radius-xl blur shadow-xl z-index-1 mt-4">
              <img
                class="w-100 border-radius-lg"
                src="../../assets/img/crm.png"
                alt="default page"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
