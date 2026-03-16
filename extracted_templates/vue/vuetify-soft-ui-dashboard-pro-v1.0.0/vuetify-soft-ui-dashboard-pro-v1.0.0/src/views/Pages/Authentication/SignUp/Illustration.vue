<template>
  <v-card class="mt-sm-8 mt-md-5 mt-7 bg-transparent">
    <div class="card-padding pb-0">
      <h4 class="text-h4 font-weight-bolder text-typo mb-2">Sign up</h4>
      <p class="mb-0 text-body">Enter your email and password to register</p>
    </div>
    <div class="card-padding pb-4">
      <label class="text-xs text-typo font-weight-bolder ms-1">Name</label>
      <v-text-field
        hide-details
        outlined
        background-color="rgba(255,255,255,.9)"
        color="rgba(0,0,0,.6)"
        light
        height="40"
        placeholder="Name"
        class="
          input-style
          font-size-input
          border border-radius-md
          placeholder-lighter
          text-color-light
          mb-4
          mt-2
        "
      >
      </v-text-field>

      <label class="text-xs text-typo font-weight-bolder ms-1">Email</label>
      <v-text-field
        hide-details
        outlined
        background-color="rgba(255,255,255,.9)"
        color="rgba(0,0,0,.6)"
        light
        height="40"
        placeholder="Email"
        class="
          input-style
          font-size-input
          border border-radius-md
          placeholder-lighter
          text-color-light
          mb-4
          mt-2
        "
      >
      </v-text-field>

      <label class="text-xs text-typo font-weight-bolder ms-1">Password</label>
      <v-text-field
        hide-details
        outlined
        background-color="rgba(255,255,255,.9)"
        color="rgba(0,0,0,.6)"
        light
        height="40"
        placeholder="Password"
        class="
          input-style
          font-size-input
          border border-radius-md
          placeholder-lighter
          text-color-light
          mb-4
          mt-2
        "
      >
      </v-text-field>

      <v-checkbox
        v-model="checkbox"
        color="#141727"
        :ripple="false"
        class="ma-0 checkbox-custom checkbox-thinner"
        hide-details
      >
        <template v-slot:label>
          <span class="text-typo text-body-2 ls-0"
            >I agree the
            <a
              href="javascript:;"
              class="text-dark font-weight-bolder text-decoration-none"
              >Terms and Conditions</a
            ></span
          >
        </template>
      </v-checkbox>

      <v-btn
        elevation="0"
        :ripple="false"
        height="43"
        class="
          font-weight-bold
          text-uppercase
          btn-primary
          bg-gradient-primary
          py-2
          px-6
          me-2
          mt-7
          mb-2
          w-100
        "
        color="#5e72e4"
        small
        >Sign Up</v-btn
      >
      <div class="text-center">
        <p class="text-sm text-body mt-3 mb-0">
          Already have an account?
          <a
            href="javascript:;"
            class="
              text-primary text-gradient text-decoration-none
              font-weight-bold
            "
            >Sign in</a
          >
        </p>
      </div>
    </div>
  </v-card>
</template>
<script>
export default {
  name: "sign-up-illustration",
  data() {
    return {
      checkbox: false,
    };
  },
};
</script>
