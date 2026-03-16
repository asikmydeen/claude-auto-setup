<template>
    <navbar btn-background="btn-white" />
    <div class="page-header align-items-start min-height-300 m-3 border-radius-xl" style="
                                        background-image: url('https://images.unsplash.com/photo-1491466424936-e304919aada7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1949&q=80');
                                      ">
        <span class="mask bg-gradient-dark opacity-6"></span>
        <div class="header py-7 py-lg-8 pt-lg-9 w-100  d-flex justify-content-center">
            <div class="container">
                <div class="header-body text-center mb-7">
                    <div class="row justify-content-center">
                        <div class="text-center" style="margin-bottom: 5px;">
                            <h3 class="text-white"> Log in to Vue Material Dashboard 2 Laravel PRO Live Preview </h3>
                            <p class="text-lead text-white"> Log in to see how you can save more than 300 hours of work with
                                an integrated Laravel API backend and ready-made CRUDs for managing: #users, #roles, #items,
                                #categories, #tags. </p>
                        </div>
                        <div class="text-white">
                            <h3 class="text-white"><strong>You can log in with 3 user types:</strong></h3>
                            <div> Username: <b>admin@jsonapi.com</b> &nbsp;&nbsp; Password: <b>secret</b></div>
                            <div> Username: <b>creator@jsonapi.com</b> &nbsp;&nbsp; Password: <b>secret</b></div>
                            <div> Username: <b>member@jsonapi.com</b> &nbsp;&nbsp; Password: <b>secret</b></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container mb-4">
        <div class="row mt-lg-n12 mt-md-n12 mt-n12 justify-content-center">
            <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
                <div class="card mt-8">
                    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                        <div class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1 text-center py-4">
                            <h4 class="font-weight-bolder text-white mt-1">Sign In</h4>
                            <p class="mb-1 text-sm text-white">
                                Enter your email and password to sign in
                            </p>
                        </div>
                    </div>
                    <div class="card-body">
                        <Form role="form" class="text-start mt-3" :validation-schema="schema" @submit="handleLogin"
                            @invalid-submit="badSubmit">
                            <div class="mb-3">
                                <material-input-field id="email" v-model:value="user.email" type="email" label="Email"
                                    name="email" variant="static"/>
                            </div>
                            <div class="mb-3">
                                <material-input-field id="password" v-model:value="user.password" type="password"
                                    label="Password" name="password" variant="static"/>
                            </div>
                            <material-switch id="rememberMe" name="Remember Me">Remember me</material-switch>
                            <div class="text-center">
                                <material-button class="my-4 mb-2" variant="gradient" color="success" full-width>
                                    <span>Sign in</span>
                                </material-button>
                            </div>
                        </Form>
                    </div>
                    <div class="card-footer text-center pt-0 px-sm-4 px-1 mt-4">
                        <p class="my-2 mx-auto">
                            Don't have an account?
                            <router-link :to="{ name: 'Signup' }" class="text-success text-gradient font-weight-bold">Sign
                                up</router-link>
                        </p>
                        <p class="mb-2 mx-auto">
                            <router-link :to="{ name: 'PasswordForgot' }"
                                class="text-success text-gradient font-weight-bold">Recover
                                Password</router-link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
<app-footer />
</template>
  
<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import MaterialInputField from "@/components/MaterialInputField.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import showSwal from "@/mixins/showSwal";
import { mapMutations } from "vuex";
import { Form } from "vee-validate"
import * as Yup from 'yup'
const body = document.getElementsByTagName("body")[0];

export default {
    name: "Login",
    components: {
        Navbar,
        AppFooter,
        MaterialInputField,
        MaterialSwitch,
        MaterialButton,
        Form,
    },
    data() {
        return {
            user: {email: "admin@jsonapi.com", password: "secret"},
            schema: Yup.object().shape({
                email: Yup.string().email("Email has to be a valid email address").required("Email is a required input"),
                password: Yup.string().required("Password is a required input")
            }),
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.loggedIn;
        }
    },
  beforeMount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.add("bg-gray-100");
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    async handleLogin() {
      try {
        await this.$store.dispatch("auth/login", this.user);
        this.$router.push({ name: "Default" });
      } catch (error) {
        showSwal.methods.showSwal({
          type: "error",
          message: "Invalid credentials!",
          width: 500,
        });
      }
    },
  },
};
  
</script>
