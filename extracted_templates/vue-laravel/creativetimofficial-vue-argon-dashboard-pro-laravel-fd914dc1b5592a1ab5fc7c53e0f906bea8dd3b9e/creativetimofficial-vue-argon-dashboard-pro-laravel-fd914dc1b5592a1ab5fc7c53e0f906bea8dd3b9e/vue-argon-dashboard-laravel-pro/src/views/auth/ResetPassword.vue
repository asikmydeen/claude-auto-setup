<template>
    <div class="container top-0 position-sticky z-index-sticky">
      <div class="row">
        <div class="col-12">
          <navbar
            is-blur="blur border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow"
            btn-background="bg-gradient-success"
            :dark-mode="true"
          />
        </div>
      </div>
    </div>
  
    <main class="main-content main-content-bg mt-0">
      <div
        class="page-header min-vh-100"
        style="
          background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/reset-basic.jpg');
        "
      >
        <span class="mask bg-gradient-dark opacity-6"></span>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-7">
              <div class="card z-index-0 mb-7">
                <div class="card-header text-center pt-4 pb-1">
                  <h4 class="font-weight-bolder mb-1">Reset password</h4>
                </div>
                <div class="card-body">
                  <form role="form" @submit.prevent="handleResetPassword">
                    <argon-input
                      id="password"
                      v-model="newPassword.password"
                      type="password"
                      :value="newPassword.password"
                      placeholder="New Password"
                      aria-label="New Password"
                    />
                    <div>
                        <validation-error :errors="apiValidationErrors.password" />
                    </div>
                    <argon-input
                      id="password_confirmation"
                      v-model="newPassword.password_confirmation"
                      type="password"
                      :value="newPassword.password_confirmation"
                      placeholder="Repeat Password"
                      aria-label="Repeat Password"
                    />
                    <div>
                        <validation-error :errors="apiValidationErrors.token" />
                    </div>
                    <div class="text-center">
                      <argon-button
                        color="dark"
                        variant="gradient"
                        class="my-4 mb-2"
                        full-width
                        ><div v-if="!loading">Submit</div> <i v-else class="fas fa-spinner fa-pulse"></i>
                        </argon-button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <app-footer />
  </template>
  
<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
const body = document.getElementsByTagName("body")[0];
import { mapMutations } from "vuex";
import showSwal from "../../mixins/showSwal";
import formMixin from "../../mixins/form-mixin";
import ValidationError from "../../components/ValidationError.vue";

export default {
  name: "ResetPassword",
  components: {
    Navbar,
    AppFooter,
    ArgonInput,
    ArgonButton,
    ValidationError
  },
  mixins: [showSwal, formMixin],
  data() {
      return {
          newPassword: {
              password: '',
              password_confirmation: '',
              email: this.$route.query.email,
              token: this.$route.query.token
          },
          loading: false
      }
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.toggleDefaultLayout();
    body.classList.remove("bg-gray-200");
  },
  mounted() {
      if(!this.$route.query.email || !this.$route.query.token){
          this.$router.push({name: 'Login'});
      }
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.toggleDefaultLayout();
    body.classList.add("bg-gray-200");
  },
  methods: {
    ...mapMutations(["toggleDefaultLayout"]),
    async handleResetPassword() {
      try{
        if(this.$isDemo == 1) {
          this.showSwal({
            type: "error",
            message: "Password reset is disabled in the demo.",
            width: 350
          });
        }
        else{
          this.loading = true;
          this.resetApiValidation();
          await this.$store.dispatch("auth/resetPassword", this.newPassword);
          this.showSwal({
              type: "success",
              message: "Password was reseted successfully!",
              width: 330
          });
          await this.$store.dispatch("auth/login", {email: this.newPassword.email, password: this.newPassword.password});
          await this.$router.push({name: 'Default'});
          this.loading = false;
        }
      }
      catch(error)
      {
        this.loading = false;
        this.setApiValidation(error.response.data.errors);
        this.showSwal({
          type:"error",
          message: "Oops, something went wrong!"
        });
      }
    }
  },
};
</script>
  