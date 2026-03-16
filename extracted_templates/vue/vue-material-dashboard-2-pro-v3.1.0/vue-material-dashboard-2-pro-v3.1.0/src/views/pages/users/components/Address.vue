<template>
  <div
    class="multisteps-form__panel border-radius-xl bg-white"
    data-animation="FadeIn"
  >
    <h5 class="font-weight-bolder">Address</h5>
    <div class="multisteps-form__content">
      <div class="row mt-3">
        <div class="col">
          <material-input id="address1" label="Address 1" variant="dynamic" />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <material-input id="address2" label="Address 2" variant="dynamic" />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12 col-sm-6">
          <material-input id="city" label="City" variant="dynamic" />
        </div>
        <div class="col-6 col-sm-3 mt-3 mt-sm-0">
          <select
            id="choices-state"
            class="multisteps-form__select form-control"
            name="choices-state"
          >
            <option selected="selected">...</option>
            <option value="1">State 1</option>
            <option value="2">State 2</option>
          </select>
        </div>
        <div class="col-6 col-sm-3 mt-3 mt-sm-0">
          <material-input id="zip" label="Zip" variant="dynamic" />
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
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import Choices from "choices.js";

export default {
  name: "TheAddress",
  components: {
    MaterialInput,
    MaterialButton,
  },
  mounted() {
    if (document.getElementById("choices-state")) {
      var element = document.getElementById("choices-state");
      new Choices(element, {
        searchEnabled: false,
        allowHTML: true,
      });
    }
  },
};
</script>

<style></style>
