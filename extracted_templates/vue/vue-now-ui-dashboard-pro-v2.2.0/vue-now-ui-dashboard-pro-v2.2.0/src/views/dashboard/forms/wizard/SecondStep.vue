<template>
  <Form ref="form" @submit="validate" :validation-schema="schema">
    <h5 class="info-text">What are you doing? (checkboxes)</h5>
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="row">
          <div class="col-sm-4">
            <icon-checkbox
              v-model="model.design"
              icon="now-ui-icons design-2_ruler-pencil"
              title="Design"
            >
            </icon-checkbox>
          </div>
          <div class="col-sm-4">
            <icon-checkbox
              v-model="model.code"
              icon="now-ui-icons business_bulb-63"
              title="Code"
            >
            </icon-checkbox>
          </div>
          <div class="col-sm-4">
            <icon-checkbox
              v-model="model.develop"
              icon="now-ui-icons tech_tv"
              title="Develop"
            >
            </icon-checkbox>
          </div>
        </div>
      </div>
    </div>
  </Form>
</template>
<script>
import { IconCheckbox } from "@/components";
import { Form } from "vee-validate";
import * as Yup from "yup";

export default {
  components: {
    IconCheckbox,
    Form,
  },
  data() {
    const schema = Yup.object().shape({
      // your validation
    });

    return {
      schema,
      model: {
        design: true,
        code: false,
        develop: false,
      },
    };
  },
  methods: {
    validate() {
      return this.$refs.form.validate().then((res) => {
        this.$emit("on-validated", res);
        return res;
      });
    },
  },
};
</script>
<style></style>
