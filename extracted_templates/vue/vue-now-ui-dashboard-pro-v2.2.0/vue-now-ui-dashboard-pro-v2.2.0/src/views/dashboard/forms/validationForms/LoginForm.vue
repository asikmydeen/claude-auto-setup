<template>
  <Form @submit="onSubmit" :validation-schema="schema">
    <vnud-card>
      <template v-slot:header>
        <div>
          <h4 class="card-title">Login Form</h4>
        </div>
      </template>

      <vee-input
        name="fullName"
        type="text"
        placeholder="Full Name"
        label="Full Name"
      />

      <vee-input name="email" type="text" placeholder="Email" label="Email" />

      <vee-input
        name="password"
        type="text"
        placeholder="Password"
        label="Password"
      />

      <div class="d-flex justify-content-center">
        <n-button native-type="submit" type="primary">Login</n-button>
      </div>
    </vnud-card>
  </Form>
</template>
<script>
import { VeeInput } from "@/components";
import { Form } from "vee-validate";
import * as Yup from "yup";

export default {
  components: {
    VeeInput,
    Form,
  },
  setup() {
    function onSubmit(values) {
      alert(JSON.stringify(values, null, 2));
    }

    const schema = Yup.object().shape({
      fullName: Yup.string().required().label("The Full Name"),
      email: Yup.string().email().required().label("The Email"),
      password: Yup.string().min(5).required().label("The Password"),
    });

    return {
      onSubmit,
      schema,
    };
  },
};
</script>
<style></style>
