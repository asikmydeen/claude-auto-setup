<template>
  <Form @submit="onSubmit" :validation-schema="schema">
    <div class="col-md-4 ml-auto mr-auto">
      <vnud-card class="card-login card-plain">
        <template v-slot:header>
          <div>
            <div class="logo-container">
              <img src="img/now-logo.png" alt="" />
            </div>
          </div>
        </template>

        <div>
          <vee-input
            name="email"
            type="text"
            inputClasses="no-border form-control-lg"
            placeholder="Email"
            addon-left-icon="now-ui-icons ui-1_email-85"
          />

          <vee-input
            name="password"
            type="text"
            inputClasses="no-border form-control-lg"
            placeholder="Password"
            addon-left-icon="now-ui-icons ui-1_lock-circle-open"
          />
        </div>

        <template v-slot:footer>
          <div>
            <n-button native-type="submit" type="primary" round block>
              Get Started
            </n-button>
            <div class="pull-left">
              <h6>
                <router-link class="link footer-link" to="/register">
                  Create Account
                </router-link>
              </h6>
            </div>

            <div class="pull-right">
              <h6>
                <a href="javascript:;" class="link footer-link">Need Help?</a>
              </h6>
            </div>
          </div>
        </template>
      </vnud-card>
    </div>
  </Form>
</template>
<script>
import { VeeInput } from "@/components";
import { Form } from "vee-validate";
import * as Yup from "yup";
export default {
  name: "vnud-login",
  components: {
    VeeInput,
    Form,
  },
  setup() {
    function onSubmit(values) {
      alert(JSON.stringify(values, null, 2));
    }

    const schema = Yup.object().shape({
      email: Yup.string().email().required().label("The Email"),
      password: Yup.string().min(6).required().label("The Password"),
    });

    return {
      onSubmit,
      schema,
    };
  },
};
</script>
<style>
.navbar-nav .nav-item p {
  line-height: inherit;
  margin-left: 5px;
}
</style>
