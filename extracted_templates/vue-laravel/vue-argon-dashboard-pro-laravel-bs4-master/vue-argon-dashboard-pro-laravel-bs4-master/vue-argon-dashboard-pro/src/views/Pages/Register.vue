<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 class="text-white">Create an account</h1>
              <p class="text-lead text-white">
                Use these awesome forms to login or create new account in your
                project for free.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            class="fill-default"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <!-- Table -->
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8">
          <div class="card bg-secondary border-0">
            <div class="card-header bg-transparent pb-5">
              <div class="text-muted text-center mt-2 mb-4">
                <small>Sign up with</small>
              </div>
              <div class="text-center">
                <a href="#" class="btn btn-neutral btn-icon mr-4">
                  <span class="btn-inner--icon"
                    ><img src="/img/icons/common/github.svg"
                  /></span>
                  <span class="btn-inner--text">Github</span>
                </a>
                <a href="#" class="btn btn-neutral btn-icon">
                  <span class="btn-inner--icon"
                    ><img src="/img/icons/common/google.svg"
                  /></span>
                  <span class="btn-inner--text">Google</span>
                </a>
              </div>
            </div>
            <div class="card-body px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>Or sign up with credentials</small>
              </div>
              <form role="form" @submit.prevent="handleSubmit()">
                <base-input
                  alternative
                  class="mb-3"
                  prepend-icon="ni ni-hat-3"
                  placeholder="Name"
                  name="Name"
                  v-model="name"
                >
                </base-input>
                <validation-error :errors="apiValidationErrors.name" />

                <base-input
                  alternative
                  class="mb-3"
                  prepend-icon="ni ni-email-83"
                  placeholder="Email"
                  name="Email"
                  v-model="email"
                >
                </base-input>
                <validation-error :errors="apiValidationErrors.email" />

                <base-input
                  alternative
                  class="mb-3"
                  prepend-icon="ni ni-lock-circle-open"
                  placeholder="Password"
                  type="password"
                  name="Password"
                  v-model="password"
                >
                </base-input>
                <password
                  class="mb-3"
                  v-model="password"
                  :strength-meter-only="true"
                  @score="showScore"
                  :showStrengthMeter="false"
                />

                <validation-error :errors="apiValidationErrors.password" />

                <base-input
                  alternative
                  class="mb-3"
                  prepend-icon="ni ni-lock-circle-open"
                  placeholder="Confirm Password"
                  type="password"
                  name="Password confirmation"
                  v-model="password_confirmation"
                >
                </base-input>
                <validation-error
                  :errors="apiValidationErrors.password_confirmation"
                />

                <div class="text-muted font-italic">
                  <small
                    >password strength:
                    <template v-if="scors === 0">
                      <span class="text-danger font-weight-700">
                        very weak
                      </span>
                    </template>

                    <template v-if="scors === 1">
                      <span class="text-danger font-weight-700"> weak </span>
                    </template>

                    <template v-if="scors === 2">
                      <span class="text-warning font-weight-700"> medium </span>
                    </template>

                    <template v-if="scors === 3">
                      <span class="text-success font-weight-700"> strong </span>
                    </template>

                    <template v-if="scors === 4">
                      <span class="text-success font-weight-700">
                        very strong
                      </span>
                    </template>
                  </small>
                </div>
                <div class="row my-4">
                  <div class="col-12">
                    <base-input
                      :rules="{ required: { allowFalse: false } }"
                      name="Privacy"
                      Policy
                    >
                      <base-checkbox v-model="boolean">
                        <span class="text-muted"
                          >I agree with the
                          <a href="#!">Terms and conditions</a></span
                        >
                      </base-checkbox>
                    </base-input>
                  </div>
                </div>
                <div class="text-center">
                  <base-button type="primary" native-type="submit" class="my-4"
                    >Create account</base-button
                  >
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ValidationError from "@/components/ValidationError.vue";
import formMixin from "@/mixins/form-mixin";
import Password from "vue-password-strength-meter";

export default {
  components: {
    ValidationError,
    Password,
  },
  mixins: [formMixin],
  data() {
    return {
      name: null,
      boolean: false,
      email: null,
      password: null,
      password_confirmation: null,
      scors: "",
    };
  },

  methods: {
    showScore(score) {
      this.scors = score;
    },

    async handleSubmit() {
      if (!this.boolean) {
        console.log("ceva");
        await this.$notify({
          type: "danger",
          message: "You need to agree with our terms and conditions.",
        });
        return;
      }

      const user = {
        data: {
          type: "token",
          attributes: {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation,
          },
        },
      };

      const requestOptions = {
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
        },
      };

      try {
        await this.$store.dispatch("register", { user, requestOptions });
        this.$notify({
          type: "success",
          message: "Successfully registered.",
        });
      } catch (error) {
        this.$notify({
          type: "danger",
          message: "Oops, something went wrong!",
        });
        this.setApiValidation(error.response.data.errors);
      }
    },
  },
};
</script>
<style></style>
