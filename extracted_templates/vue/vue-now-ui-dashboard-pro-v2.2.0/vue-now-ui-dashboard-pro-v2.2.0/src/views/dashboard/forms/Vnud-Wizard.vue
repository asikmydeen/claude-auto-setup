<template>
  <div>
    <div class="row d-flex justify-content-center">
      <div class="col-md-10 mr-auto ml-auto">
        <simple-wizard>
          <template v-slot:header>
            <h3 class="card-title">Build your profile</h3>
            <h3 class="description">
              This information will let us know more about you.
            </h3>
          </template>

          <wizard-tab
            :before-change="() => validateStep('step1')"
            label="About"
            icon="now-ui-icons users_circle-08"
          >
            <first-step
              ref="step1"
              @on-validated="onStepValidated"
            ></first-step>
          </wizard-tab>

          <wizard-tab
            :before-change="() => validateStep('step2')"
            label="Account"
            icon="now-ui-icons ui-1_settings-gear-63"
          >
            <second-step
              ref="step2"
              @on-validated="onStepValidated"
            ></second-step>
          </wizard-tab>

          <wizard-tab
            :before-change="() => validateStep('step3')"
            label="Address"
            icon="now-ui-icons ui-1_email-85"
          >
            <third-step ref="step3" @on-validated="wizardComplete"></third-step>
          </wizard-tab>
        </simple-wizard>
      </div>
    </div>
  </div>
</template>
<script>
import FirstStep from "./wizard/FirstStep.vue";
import SecondStep from "./wizard/SecondStep.vue";
import ThirdStep from "./wizard/ThirdStep.vue";
import Swal from "sweetalert2";
import { SimpleWizard, WizardTab } from "@/components";
export default {
  data() {
    return {
      wizardModel: {},
    };
  },
  components: {
    FirstStep,
    SecondStep,
    ThirdStep,
    SimpleWizard,
    WizardTab,
  },
  methods: {
    validateStep(ref) {
      return this.$refs[ref].validate();
    },
    onStepValidated(validated, model) {
      this.wizardModel = { ...this.wizardModel, ...model };
    },
    wizardComplete() {
      Swal.fire({
        title: "Good job!",
        text: "You clicked the finish button!",
        type: "success",
        confirmButtonClass: "btn btn-success",
        buttonsStyling: false,
      });
    },
  },
};
</script>
