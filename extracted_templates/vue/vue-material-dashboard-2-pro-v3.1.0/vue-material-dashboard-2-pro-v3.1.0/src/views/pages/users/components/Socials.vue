<template>
  <div
    class="multisteps-form__panel border-radius-xl bg-white"
    data-animation="FadeIn"
  >
    <h5 class="font-weight-bolder">Socials</h5>
    <p class="mb-0 text-sm">Please provide at least one social link</p>
    <div class="multisteps-form__content">
      <div class="row mt-3">
        <div class="col-12">
          <material-input
            id="twitter"
            label="Twitter Handle"
            variant="dynamic"
          />
        </div>
        <div class="col-12 mt-3">
          <material-input
            id="facebook"
            label="Facebook Handle"
            variant="dynamic"
          />
        </div>
        <div class="col-12 mt-3">
          <material-input
            id="instagram"
            label="Instagram Handle"
            variant="dynamic"
          />
        </div>
      </div>
      <div class="button-row d-flex mt-4">
        <material-button
          type="button"
          color="light"
          variant="gradient"
          class="js-btn-prev"
          @click="$parent.prevStep"
          >Prev</material-button
        >
        <material-button
          type="button"
          color="dark"
          variant="gradient"
          class="ms-auto js-btn-next"
          @click="$parent.nextStep"
          >Next</material-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialInput from "@/components/MaterialInput.vue";

export default {
  name: "Socials",
  components: {
    MaterialButton,
    MaterialInput,
  },
};
</script>
