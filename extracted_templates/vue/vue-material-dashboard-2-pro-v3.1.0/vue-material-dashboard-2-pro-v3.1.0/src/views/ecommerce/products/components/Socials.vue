<template>
  <div
    class="pt-3 bg-white multisteps-form__panel border-radius-xl"
    data-animation="FadeIn"
  >
    <h5 class="font-weight-bolder">Socials</h5>
    <div class="multisteps-form__content">
      <div class="mt-3 row">
        <div class="col-12">
          <material-input
            id="shopify"
            label="Shopify Handle"
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
      <div class="row">
        <div class="mt-4 button-row d-flex col-12">
          <material-button
            color="secondary"
            variant="gradient"
            class="mb-0 js-btn-prev"
            title="Prev"
            @click="$parent.prevStep"
            >Prev</material-button
          >
          <material-button
            type="button"
            color="dark"
            variant="gradient"
            class="mb-0 ms-auto js-btn-next"
            title="Next"
            @click="$parent.nextStep"
            >Next</material-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";

export default {
  name: "Socials",
  components: {
    MaterialInput,
    MaterialButton,
  },
};
</script>
