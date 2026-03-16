<template>
  <Form @submit="onSubmit" :validation-schema="schema">
    <vnud-card>
      <template v-slot:header>
        <h4 class="card-title">Type Validation</h4>
      </template>

      <div>
        <div class="row">
          <label class="col-sm-2 col-form-label">Required Text</label>
          <div class="col-sm-7">
            <vee-input name="required" type="text" />
          </div>
          <label class="col-sm-3 label-on-right"
            ><code>required="true"</code></label
          >
        </div>

        <div class="row">
          <label class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-7">
            <vee-input name="email" type="email" />
          </div>
          <label class="col-sm-3 label-on-right"
            ><code>email="true"</code></label
          >
        </div>

        <div class="row">
          <label class="col-sm-2 col-form-label">Number</label>
          <div class="col-sm-7">
            <vee-input name="number" type="number" />
          </div>
          <label class="col-sm-3 label-on-right"
            ><code>integer="true"</code></label
          >
        </div>

        <div class="row">
          <label class="col-sm-2 col-form-label">Url</label>
          <div class="col-sm-7">
            <vee-input name="url" type="url" />
          </div>
          <label class="col-sm-3 label-on-right"><code>url="true"</code></label>
        </div>

        <div class="row">
          <label class="col-sm-2 col-form-label">Equal To</label>
          <div class="col-sm-3">
            <vee-input name="sourceField" type="text" />
          </div>
          <div class="col-sm-3">
            <vee-input name="destField" type="text" />
          </div>

          <label class="col-sm-4 label-on-right"
            ><code>confirmed="equalToSource"</code></label
          >
        </div>
      </div>
      <div class="text-center">
        <n-button native-type="submit" type="primary">Validate inputs</n-button>
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
      required: Yup.string().required().label("Required"),
      email: Yup.string().email().required().label("The Email"),
      number: Yup.number().integer().required().label("The Number Value"),
      url: Yup.string().url().required().label("The Url Value"),
      sourceField: Yup.string().required(),
      destField: Yup.string()
        .required()
        .oneOf([Yup.ref("sourceField")], "The EqualToSource do not match"),
    });

    return {
      onSubmit,
      schema,
    };
  },
};
</script>
<style></style>
