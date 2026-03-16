<template>
  <div class="row">
    <div class="col-md-6">
      <register-form @on-submit="onRegisterSubmit"></register-form>
    </div>
    <div class="col-md-6">
      <login-form @on-submit="onLoginSubmit"></login-form>
    </div>
    <div class="col-md-12">
      <type-validation-form
        @on-submit="onTypeValidationSubmit"
      ></type-validation-form>
    </div>
    <div class="col-md-12">
      <range-validation-form
        @on-submit="onRangeValidationSubmit"
      ></range-validation-form>
    </div>
  </div>
</template>
<script>
import RegisterForm from '../../components/ValidationForms/RegisterForm.vue';
import LoginForm from '../../components/ValidationForms/LoginForm.vue';
import TypeValidationForm from '../../components/ValidationForms/TypeValidationForm.vue';
import RangeValidationForm from '../../components/ValidationForms/RangeValidationForm';

export default {
  name: 'validation-forms',
  components: {
    RegisterForm,
    LoginForm,
    TypeValidationForm,
    RangeValidationForm
  },
  data() {
    return {
      registerModel: {},
      loginModel: {},
      typeValidationModel: {},
      rangeValidationModel: {}
    };
  },
  methods: {
    onRegisterSubmit(model) {
      this.registerModel = model;
    },
    onLoginSubmit(model) {
      this.loginModel = model;
    },
    onTypeValidationSubmit(model) {
      this.typeValidationModel = model;
    },
    onRangeValidationSubmit(model) {
      this.rangeValidationModel = model;
    }
  }
};
</script>
<style></style>
