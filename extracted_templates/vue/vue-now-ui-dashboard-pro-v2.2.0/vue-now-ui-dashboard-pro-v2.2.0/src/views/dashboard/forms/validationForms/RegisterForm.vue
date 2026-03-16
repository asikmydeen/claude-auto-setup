<template>
  <Form @submit="onSubmit" :validation-schema="schema">
    <vnud-card>
      <template v-slot:header>
        <div>
          <h4 class="card-title">Register Form</h4>
        </div>
      </template>

      <vee-input name="email" type="text" placeholder="Email" label="Email" />

      <vee-input
        name="password"
        type="text"
        placeholder="Password"
        label="Password"
      />

      <vee-input
        name="confirm_password"
        type="text"
        placeholder="Confirm Password"
        label="Confirm Password"
      />
      <div class="category form-category">* Required fields</div>
      <div class="d-flex justify-content-between align-items-center">
        <checkbox v-model="subscribe" class="pull-left">
          Subscribe to newsletter
        </checkbox>

        <n-button native-type="submit" type="primary">Register</n-button>
      </div>
    </vnud-card>
  </Form>
</template>
<script>
import { VeeInput, Checkbox } from "@/components";
import { Form } from "vee-validate";
import * as Yup from "yup";

export default {
  components: {
    Checkbox,
    VeeInput,
    Form,
  },
  data() {
    return {
      subscribe: false,
    };
  },
  setup() {
    function onSubmit(values) {
      alert(JSON.stringify(values, null, 2));
    }

    const schema = Yup.object().shape({
      email: Yup.string().email().required().label("The Email"),
      password: Yup.string().min(5).required().label("The Password"),
      confirm_password: Yup.string()
        .required()
        .oneOf([Yup.ref("password")], "Passwords do not match"),
    });

    return {
      onSubmit,
      schema,
    };
  },
};
</script>
<style></style>
