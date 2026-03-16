<template>
  <Form @submit="onSubmit" :validation-schema="schema">
    <div class="row">
      <div class="col-lg-5 ml-auto">
        <div class="info-area info-horizontal mt-5">
          <div class="icon icon-primary">
            <i class="now-ui-icons media-2_sound-wave"></i>
          </div>
          <div class="description">
            <h5 class="info-title">Marketing</h5>
            <p class="description">
              We've created the marketing campaign of the website. It was a very
              interesting collaboration.
            </p>
          </div>
        </div>

        <div class="info-area info-horizontal">
          <div class="icon icon-primary">
            <i class="now-ui-icons media-1_button-pause"></i>
          </div>
          <div class="description">
            <h5 class="info-title">Fully Coded in HTML5</h5>
            <p class="description">
              We've developed the website with HTML5 and CSS3. The client has
              access to the code using GitHub.
            </p>
          </div>
        </div>

        <div class="info-area info-horizontal">
          <div class="icon icon-info">
            <i class="now-ui-icons users_single-02"></i>
          </div>
          <div class="description">
            <h5 class="info-title">Built Audience</h5>
            <p class="description">
              There is also a Fully Customizable CMS Admin Dashboard for this
              product.
            </p>
          </div>
        </div>
      </div>
      <div class="col-lg-4 mr-auto">
        <vnud-card class="card-signup text-center" no-footer-line>
          <template v-slot:header>
            <h4 class="card-title">Register</h4>
            <div class="social">
              <button class="btn btn-icon btn-round btn-twitter">
                <i class="fa fa-twitter"></i>
              </button>
              <button class="btn btn-icon btn-round btn-dribbble">
                <i class="fa fa-dribbble"></i>
              </button>
              <button class="btn btn-icon btn-round btn-facebook">
                <i class="fa fa-facebook"> </i>
              </button>
              <h5 class="card-description">or be classical</h5>
            </div>
          </template>

          <vee-input
            name="firstName"
            type="text"
            placeholder="First Name..."
            addon-left-icon="now-ui-icons users_circle-08"
          />

          <vee-input
            name="lastName"
            type="text"
            placeholder="Last Name..."
            addon-left-icon="now-ui-icons text_caps-small"
          />

          <vee-input
            name="email"
            type="text"
            placeholder="Email..."
            addon-left-icon="now-ui-icons ui-1_email-85"
          />

          <checkbox class="text-left" v-model="agree">
            I agree to the <a href="#something">terms and conditions</a>.
          </checkbox>

          <template v-slot:footer>
            <n-button type="primary" native-type="submit" round size="lg">
              Get Started
            </n-button>
          </template>
        </vnud-card>
      </div>
    </div>
  </Form>
</template>
<script>
import { Checkbox, VeeInput } from "@/components";
import { Form } from "vee-validate";
import * as Yup from "yup";
export default {
  name: "vnud-register",
  components: {
    Checkbox,
    VeeInput,
    Form,
  },
  data() {
    return {
      agree: false,
    };
  },
  setup() {
    function onSubmit(values) {
      alert(JSON.stringify(values, null, 2));
    }

    const schema = Yup.object().shape({
      firstName: Yup.string().required().label("The First Name"),
      lastName: Yup.string().required().label("The Last Name"),
      email: Yup.string().email().required().label("The Email"),
    });

    return {
      onSubmit,
      schema,
    };
  },
};
</script>
<style></style>
