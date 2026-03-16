<template>
  <v-card class="card-shadow border-radius-xl mt-6" id="delete">
    <div class="px-6 py-6">
      <h5 class="text-h5 font-weight-bold text-typo">Delete Account</h5>
      <p class="text-sm text-body">
        Once you delete your account, there is no going back. Please be certain.
      </p>
    </div>
    <div class="px-6 pb-6 pt-0">
      <div class="d-sm-flex align-center ms-2">
        <v-switch
          :ripple="false"
          class="mt-0 pt-0 switch"
          v-model="switche"
          hide-details
          color="#3a416ff2"
          inset
        ></v-switch>
        <div class="ms-sm-3 mb-sm-0 mb-3">
          <span class="text-dark font-weight-bold d-block text-sm"
            >Confirm</span
          >
          <span class="text-xs text-body d-block"
            >I want to delete my account.</span
          >
        </div>
        <v-btn
          :ripple="false"
          elevation="0"
          color="#fff"
          class="font-weight-bolder btn-outline-secondary py-5 px-6 ms-auto"
          small
        >
          Deactivate
        </v-btn>
        <v-btn
          :ripple="false"
          elevation="0"
          color="#fff"
          class="
            font-weight-bolder
            btn-danger
            bg-gradient-danger
            py-5
            px-6
            ms-2
          "
          small
        >
          Delete Account
        </v-btn>
      </div>
    </div>
  </v-card>
</template>
<script>
export default {
  name: "delete-account",
  data() {
    return {
      switche: false,
    };
  },
};
</script>
