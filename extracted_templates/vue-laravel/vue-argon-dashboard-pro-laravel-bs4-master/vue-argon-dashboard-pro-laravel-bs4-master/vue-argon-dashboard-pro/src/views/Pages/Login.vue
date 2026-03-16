<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="text-center" style="margin-bottom: 5px">
              <h1 class="text-white">
                Log in to Vue Argon Dashboard PRO Laravel Live Preview
              </h1>
              <p class="text-lead text-white">
                Log in to see how you can save more than 300 hours of work with
                an integrated Laravel API backend and ready-made CRUDs for
                managing: #users, #roles, #items, #categories, #tags.
              </p>
            </div>

            <div class="text-white">
              <h3 class="text-white">
                <strong>You can log in with 3 user types:</strong>
              </h3>
              <div>
                Username <b>admin@jsonapi.com</b> Password <b>secret</b>
              </div>
              <div>
                Username <b>creator@jsonapi.com</b> Password <b>secret</b>
              </div>
              <div>
                Username <b>member@jsonapi.com</b> Password <b>secret</b>
              </div>
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
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
          <div class="card bg-secondary border-0 mb-0">
            <div class="card-header bg-transparent pb-5">
              <div class="text-muted text-center mt-2 mb-3">
                <small>Sign in with</small>
              </div>
              <div class="btn-wrapper text-center">
                <a href="#" class="btn btn-neutral btn-icon">
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
                <small>Or sign in with credentials</small>
              </div>
              <form role="form" @submit.prevent="handleSubmit()">
                <base-input
                  alternative
                  class="mb-3"
                  name="Email"
                  prepend-icon="ni ni-email-83"
                  placeholder="Email"
                  v-model="email"
                />
                <validation-error :errors="apiValidationErrors.email" />

                <base-input
                  alternative
                  class="mb-3"
                  name="Password"
                  prepend-icon="ni ni-lock-circle-open"
                  type="password"
                  placeholder="Password"
                  v-model="password"
                >
                </base-input>
                <validation-error :errors="apiValidationErrors.password" />

                <div class="text-center">
                  <base-button type="primary" native-type="submit" class="my-4"
                    >Sign in</base-button
                  >
                </div>
              </form>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <a href="/password/reset" class="text-light"
                ><small>Forgot password?</small></a
              >
            </div>
            <div class="col-6 text-right">
              <a href="/register" class="text-light"
                ><small>Create new account</small></a
              >
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
export default {
  components: {
    ValidationError,
  },
  mixins: [formMixin],
  data: () => ({
    email: "admin@jsonapi.com",
    password: "secret",
  }),
  computed: {
    isAuthenticated: function () {
      return this.$store.getters.isAuthenticated();
    },
  },
  methods: {
    async handleSubmit() {
      const user = {
        data: {
          type: "token",
          attributes: {
            email: this.email,
            password: this.password,
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
        await this.$store.dispatch("login", { user, requestOptions });
      } catch (error) {
        this.$notify({
          type: "danger",
          message: "Invalid credentials!",
        });
        this.setApiValidation(error.response.data.errors);
      }
    },
  },
};
</script>
