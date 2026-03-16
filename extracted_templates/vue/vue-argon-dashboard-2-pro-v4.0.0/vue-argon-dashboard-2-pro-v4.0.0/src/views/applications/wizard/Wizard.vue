<script setup>
import { ref } from "vue";
import About from "./components/About.vue";
import Account from "./components/Account.vue";
import WizardAddress from "./components/Address.vue";

const activeClass = "js-active position-relative";
const activeStep = ref(0);
const formSteps = 2;

const nextStep = () => {
  if (activeStep.value < formSteps) {
    activeStep.value += 1;
  }
};
const prevStep = () => {
  if (activeStep.value > 0) {
    activeStep.value -= 1;
  }
};
</script>
<template>
  <div class="py-4 h-100 container-fluid">
    <div class="row">
      <div class="text-center col-12">
        <h3 class="mt-5 text-white">Build Your Profile</h3>
        <h5 class="text-white font-weight-normal">
          This information will let us know more about you.
        </h5>
        <div class="mb-5 multisteps-form">
          <!--progress bar-->
          <div class="row mt-5">
            <div class="mx-auto my-5 col-12 col-lg-8">
              <div class="multisteps-form__progress">
                <button
                  class="multisteps-form__progress-btn"
                  type="button"
                  title="User Info"
                  :class="activeStep >= 0 ? activeClass : ''"
                  @click="activeStep = 0"
                >
                  <span>About</span>
                </button>
                <button
                  class="multisteps-form__progress-btn"
                  type="button"
                  title="Address"
                  :class="activeStep >= 1 ? activeClass : ''"
                  @click="activeStep = 1"
                >
                  <span>Account</span>
                </button>
                <button
                  class="multisteps-form__progress-btn"
                  type="button"
                  title="Order Info"
                  :class="activeStep === 2 ? activeClass : ''"
                  @click="activeStep = 2"
                >
                  <span>Address</span>
                </button>
              </div>
            </div>
          </div>
          <!--form panels-->
          <div class="row">
            <div class="m-auto col-12 col-lg-8">
              <form class="multisteps-form__form">
                <!--single form panel-->
                <about v-if="activeStep === 0" @next-step="nextStep" />
                <!--single form panel-->
                <account
                  :class="activeStep === 1 ? activeClass : ''"
                  @next-step="nextStep"
                  @prev-step="prevStep"
                />
                <!--single form panel-->
                <wizard-address
                  :class="activeStep === 2 ? activeClass : ''"
                  @prev-step="prevStep"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
