<template>
  <div class="row">
    <div class="col-md-6">
      <register-form></register-form>
    </div>
    <div class="col-md-6">
      <login-form></login-form>
    </div>
    <div class="col-md-12">
      <type-validation-form></type-validation-form>
    </div>
    <div class="col-md-12">
      <range-validation-form></range-validation-form>
    </div>
  </div>
</template>
<script>
import RegisterForm from "./validationForms/RegisterForm.vue";
import LoginForm from "./validationForms/LoginForm.vue";
import TypeValidationForm from "./validationForms/TypeValidationForm.vue";
import RangeValidationForm from "./validationForms/RangeValidationForm";
export default {
  components: {
    RegisterForm,
    LoginForm,
    TypeValidationForm,
    RangeValidationForm,
  },
};
</script>
<style></style>
