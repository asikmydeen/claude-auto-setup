<template>
  <Form @submit="onSubmit" :validation-schema="schema">
    <vnud-card>
      <template v-slot:header>
        <h4 class="card-title">Range Validation</h4>
      </template>

      <div>
        <div class="row">
          <label class="col-sm-2 col-form-label">Min Length</label>
          <div class="col-sm-7">
            <vee-input name="minLength" type="text" />
          </div>
          <label class="col-sm-3 label-on-right"><code>min="5"</code></label>
        </div>

        <div class="row">
          <label class="col-sm-2 col-form-label">Max Length</label>
          <div class="col-sm-7">
            <vee-input name="maxLength" type="text" />
          </div>
          <label class="col-sm-3 label-on-right"><code>max="5"</code></label>
        </div>

        <div class="row">
          <label class="col-sm-2 col-form-label">Range</label>
          <div class="col-sm-7">
            <vee-input name="range" type="text" />
          </div>
          <label class="col-sm-3 label-on-right"
            ><code>min_value="6", max_value="10"</code></label
          >
        </div>

        <div class="row">
          <label class="col-sm-2 col-form-label">Min Value</label>
          <div class="col-sm-7">
            <vee-input name="minValue" type="text" />
          </div>
          <label class="col-sm-3 label-on-right"
            ><code>min_value="6"</code></label
          >
        </div>

        <div class="row">
          <label class="col-sm-2 col-form-label">Max Value</label>
          <div class="col-sm-7">
            <vee-input name="maxValue" type="text" />
          </div>
          <label class="col-sm-3 label-on-right"
            ><code>max_value="6"</code></label
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
      minLength: Yup.string().min(5).required().label("The Min Length"),
      maxLength: Yup.string().max(5).required().label("The Max Length"),
      minValue: Yup.number().min(6).required().label("The Min Value"),
      maxValue: Yup.number().max(6).required().label("The Max Value"),
      range: Yup.string().min(6).max(10).required().label("The Range"),
    });

    return {
      onSubmit,
      schema,
    };
  },
};
</script>
<style></style>
