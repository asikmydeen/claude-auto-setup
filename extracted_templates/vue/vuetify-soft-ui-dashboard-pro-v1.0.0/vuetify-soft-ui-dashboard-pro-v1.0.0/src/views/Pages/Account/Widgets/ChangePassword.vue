<template>
  <v-card class="card-shadow border-radius-xl mt-6" id="change">
    <div class="px-6 py-6">
      <h5 class="text-h5 font-weight-bold text-typo">Change Password</h5>
    </div>
    <div class="px-6 pb-6 pt-0">
      <v-row>
        <v-col cols="12">
          <label class="text-xs text-typo font-weight-bolder ms-1"
            >Current password</label
          >
          <v-text-field
            hide-details
            outlined
            color="rgba(0,0,0,.6)"
            light
            placeholder="Current password"
            class="
              font-size-input
              placeholder-lighter
              border border-radius-md
              mt-2
            "
          >
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <label class="text-xs text-typo font-weight-bolder ms-1"
            >New password</label
          >
          <v-text-field
            hide-details
            outlined
            color="rgba(0,0,0,.6)"
            light
            placeholder="New password"
            class="
              font-size-input
              placeholder-lighter
              border border-radius-md
              mt-2
            "
          >
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <label class="text-xs text-typo font-weight-bolder ms-1"
            >Confirm new password</label
          >
          <v-text-field
            hide-details
            outlined
            color="rgba(0,0,0,.6)"
            light
            placeholder="Confirm new password"
            class="
              font-size-input
              placeholder-lighter
              border border-radius-md
              mt-2
            "
          >
          </v-text-field>
        </v-col>
      </v-row>

      <h5 class="mt-10 mb-2 text-h5 font-weight-bold text-typo">
        Password requirements
      </h5>
      <p class="text-muted mb-2">
        Please follow this guide for a strong password:
      </p>
      <div class="d-sm-flex">
        <ul class="text-muted ps-6 mb-0">
          <li>
            <span class="text-sm">One special characters</span>
          </li>
          <li>
            <span class="text-sm">Min 6 characters</span>
          </li>
          <li>
            <span class="text-sm">One number (2 are recommended)</span>
          </li>
          <li>
            <span class="text-sm">Change it often</span>
          </li>
        </ul>
        <v-btn
          color="#cb0c9f"
          class="
            font-weight-bolder
            btn-default
            bg-gradient-default
            py-4
            px-8
            ms-auto
            mt-sm-auto mt-4
          "
          small
        >
          Update password
        </v-btn>
      </div>
    </div>
  </v-card>
</template>
<script>
export default {
  name: "change-password",
};
</script>
