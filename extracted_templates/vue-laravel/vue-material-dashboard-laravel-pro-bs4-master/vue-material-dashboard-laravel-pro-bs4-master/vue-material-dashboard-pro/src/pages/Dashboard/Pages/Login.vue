<template>
  <div class="md-layout text-center login-fix-page">
    <div class="md-layout-item md-size-100">
      <div class="text-center">
        <h3>Log in to Vue Material Dashboard Laravel PRO Live Preview</h3>
        <p>
          Log in to see how you can save more than 300 hours of work with an
          integrated Laravel API backend and ready-made CRUDs for managing:
          #users, #roles, #items, #categories, #tags.
        </p>
      </div>
      <div class="text-center" style="margin-bottom: 32px;">
        <h5><strong>You can log in with 3 user types:</strong></h5>
        <div>Username <b>admin@jsonapi.com</b> Password <b>secret</b></div>
        <div>Username <b>creator@jsonapi.com</b> Password <b>secret</b></div>
        <div>Username <b>member@jsonapi.com</b> Password <b>secret</b></div>
      </div>
    </div>

    <div
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100 login-page-fix"
    >
      <form @submit.prevent="login">
        <login-card header-color="green">
          <h4 slot="title" class="title">Log in</h4>
          <md-button
            slot="buttons"
            ref="#facebook"
            class="md-just-icon md-simple md-white"
          >
            <i class="fab fa-facebook-square"></i>
          </md-button>
          <md-button
            slot="buttons"
            href="#twitter"
            class="md-just-icon md-simple md-white"
          >
            <i class="fab fa-twitter"></i>
          </md-button>
          <md-button
            slot="buttons"
            href="#google"
            class="md-just-icon md-simple md-white"
          >
            <i class="fab fa-google-plus-g"></i>
          </md-button>
          <p slot="description" class="description">Or Be Classical</p>
          <md-field
            class="form-group md-invalid"
            slot="inputs"
            style="margin-bottom: 28px"
          >
            <md-icon>email</md-icon>
            <label>Email...</label>
            <md-input v-model="email" type="email" />
            <validation-error :errors="apiValidationErrors.email" />
          </md-field>
          <md-field class="form-group md-invalid" slot="inputs">
            <md-icon>lock_outline</md-icon>
            <label>Password...</label>
            <md-input v-model="password" type="password" />
          </md-field>
          <md-button
            slot="footer"
            class="md-simple md-success md-lg"
            type="submit"
          >
            Lets Go
          </md-button>
        </login-card>
      </form>
    </div>
  </div>
</template>

<script>
import { LoginCard, ValidationError } from "@/components";
import formMixin from "@/mixins/form-mixin";

export default {
  components: {
    LoginCard,
    ValidationError,
  },
  mixins: [formMixin],
  computed: {
    isAuthenticated: function() {
      return this.$store.getters.isAuthenticated();
    },
  },
  data: () => ({
    email: "admin@jsonapi.com",
    password: "secret",
  }),
  methods: {
    async login() {
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
      } catch (e) {
        await this.$store.dispatch("alerts/error", "Invalid credentials!");
        this.setApiValidation(e.response.data.errors);
      }
    },
  },
};
</script>
<style scoped>
.login-fix-page {
  padding-bottom: 7em;
  padding-top: 4em;
}
</style>
