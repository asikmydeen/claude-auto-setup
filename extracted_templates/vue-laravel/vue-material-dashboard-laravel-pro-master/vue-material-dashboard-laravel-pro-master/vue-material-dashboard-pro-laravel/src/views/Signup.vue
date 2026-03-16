<template>
    <navbar btn-background="bg-gradient-success" />

    <main class="mt-0 main-content main-content-bg">
        <div class="page-header align-items-start min-height-300 m-3 border-radius-xl bg-gray-200" style="background-image: url('https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
        background-size: cover;
        background-position: center;
      ">
            <span class="mask bg-gradient-dark opacity-4"></span>
        </div>
        <div class="container">
            <div class="row mt-lg-n12 mt-md-n12 mt-n11 justify-content-center">
                <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
                    <div class="card mt-8">
                        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                            <div class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1 text-center py-4">
                                <h4 class="font-weight-bolder text-white mt-1">
                                    Join us today
                                </h4>
                                <p class="mb-1 text-white text-sm">
                                    Enter your email and password to register
                                </p>
                            </div>
                        </div>
                        <div class="card-body pb-3">
                            <Form role="form" :validation-schema="schema" @submit="handleSignup">
                                <div class="mb-3">
                                    <material-input-field id="name" v-model:value="user.name" label="Name"
                                        name="name" variant="static"/>
                                </div>
                                <div class="mb-3">
                                    <material-input-field id="email" v-model:value="user.email" type="email"
                                        label="Email" name="email" variant="static"/>
                                </div>
                                <div class="mb-3">
                                    <material-input-field id="password" v-model:value="user.password" type="password"
                                        label="Password" name="password" variant="static"/>
                                </div>
                                <div class="mb-3">
                                    <material-input-field id="confirmPassword" v-model:value="user.confirmPassword"
                                        type="password" label="Confirm Password" name="confirmPassword" variant="static"/>
                                </div>
                                <material-checkbox-field id="flexCheckDefault" v-model:checked="termsChecked"
                                    name="checkbox">
                                    I agree the
                                    <a href="../../../pages/privacy.html" class="text-dark font-weight-bolder">Terms and
                                        Conditions</a>
                                </material-checkbox-field>
                                <div class="text-center">
                                    <material-button color="success" variant="gradient" full-width
                                        class="mt-4 mb-0">Sign up</material-button>
                                </div>
                            </Form>
                        </div>
                        <div class="card-footer text-center pt-0 px-sm-4 px-1 mt-4">
                            <p class="my-2 mx-auto">
                                Already have an account?
                                <router-link :to="{ name: 'Login' }"
                                    class="text-success text-gradient font-weight-bold">Sign in</router-link>
                            </p>
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
import MaterialInputField from "@/components/MaterialInputField.vue";
import MaterialCheckboxField from "@/components/MaterialCheckboxField.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import showSwal from "../mixins/showSwal";
const body = document.getElementsByTagName("body")[0];
import { mapMutations } from "vuex";

import { Form } from "vee-validate"
import * as Yup from 'yup'

export default {
    name: "Signup",
    components: {
        Navbar,
        AppFooter,
        MaterialInputField,
        MaterialCheckboxField,
        MaterialButton,
        Form,
    },
    data() {
        return {
            user: [],
            termsChecked: true,
            schema: Yup.object().shape({
                name: Yup.string().required("Name is a required input"),
                email: Yup.string().email("Email has to be a valid email address").required("Email is a required input"),
                password: Yup.string().required("Password is a required input").min(8, "Password must have at least 8 characters"),
                confirmPassword: Yup.string().required("Confirm password is a required input").oneOf([Yup.ref('password')], 'Your passwords do not match.'),
                checkbox: Yup.boolean().test('is-checked', 'You must agree to the terms and conditions', value => value === true)
            }),
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
        async handleSignup() {
            try {
                await this.$store.dispatch('auth/register', this.user);
                showSwal.methods.showSwal({
                    type: "success",
                    message: "Successfully registered!",
                    width: 500
                });
                this.$router.push({ name: 'Profile Overview' })
            } catch (error) {
                showSwal.methods.showSwal({
                    type: "error",
                    message: "Oops, something went wrong!",
                    width: 500
                });
            }
        },
    },
};
</script>
