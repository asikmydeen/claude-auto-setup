<template>
  <Form ref="form" @submit="validate" :validation-schema="schema">
    <h5 class="info-text">Are you living in a nice area?</h5>
    <div class="row justify-content-center">
      <div class="col-sm-4">
        <vee-input name="streetName" type="text" label="Street Name" />

        <vee-input name="zipCode" type="number" label="Zip Code" />
      </div>
      <div class="col-sm-4">
        <vee-input name="city" type="text" label="City" />

        <vee-input name="streetNumber" type="text" label="Street Number" />
      </div>
    </div>
  </Form>
</template>
<script>
import { ElSelect, ElOption } from "element-plus";
import { VeeInput } from "@/components";
import { Form } from "vee-validate";
import * as Yup from "yup";

export default {
  components: {
    [ElSelect.name]: ElSelect,
    [ElOption.name]: ElOption,
    VeeInput,
    Form,
  },
  data() {
    const schema = Yup.object().shape({
      streetNumber: Yup.string().required().label("The Street Number"),
      streetName: Yup.string().required().label("The Street Name"),
      city: Yup.string().required().label("The City"),
      country: Yup.string().required().label("The Country"),
      zipCode: Yup.string().min(6).required().label("The Zip Code"),
    });

    return {
      imageUrl: "img/default-avatar.png",
      countryOptions: ["One", "Two", "Three", "Four", "Five", "Six"],
      country1: "",
      schema,
    };
  },
  methods: {
    validate() {
      return this.$refs.form.validate().then((res) => {
        if (!res.valid) {
          return !res;
        }
        this.$emit("on-validated", res);
        return res;
      });
    },
  },
};
</script>
<style></style>
