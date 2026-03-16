<template>
  <div
    class="multisteps-form__panel border-radius-xl bg-white"
    data-animation="FadeIn"
  >
    <h5 class="font-weight-bolder mb-0">About me</h5>
    <p class="mb-0 text-sm">Mandatory informations</p>
    <div class="multisteps-form__content">
      <div class="row mt-3">
        <div class="col-12 col-sm-6">
          <material-input id="firstName" label="First Name" variant="dynamic" />
        </div>
        <div class="col-12 col-sm-6 mt-3 mt-sm-0">
          <material-input id="lastName" label="Last Name" variant="dynamic" />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12 col-sm-6">
          <material-input id="company" label="Company" variant="dynamic" />
        </div>
        <div class="col-12 col-sm-6 mt-3 mt-sm-0">
          <material-input
            id="email"
            type="email"
            label="Email Address"
            variant="dynamic"
          />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12 col-sm-6">
          <material-input
            id="password"
            type="password"
            label="Password"
            variant="dynamic"
          />
        </div>
        <div class="col-12 col-sm-6 mt-3 mt-sm-0">
          <material-input
            id="repeatPassword"
            type="password"
            label="Repeat Password"
            variant="dynamic"
          />
        </div>
      </div>
      <div class="button-row d-flex mt-4">
        <material-button
          type="button"
          color="dark"
          variant="gradient"
          class="ms-auto mb-0 js-btn-next"
          @click="$parent.nextStep"
          >Next</material-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";

export default {
  name: "UserInfo",
  components: {
    MaterialInput,
    MaterialButton,
  },
};
</script>
