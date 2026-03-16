<template>
  <div
    class="multisteps-form__panel border-radius-xl bg-white"
    data-animation="FadeIn"
  >
    <h5 class="font-weight-bolder mb-0">Profile</h5>
    <p class="mb-0 text-sm">Optional informations</p>
    <div class="multisteps-form__content mt-4">
      <div class="row">
        <div class="col-12">
          <material-textarea
            id="information"
            variant="dynamic"
            placeholder="Say a few words about who you are or what you're working on."
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
          class="ms-auto"
          >Send</material-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialTextarea from "@/components/MaterialTextarea.vue";

export default {
  name: "Profile",
  components: {
    MaterialButton,
    MaterialTextarea,
  },
};
</script>
