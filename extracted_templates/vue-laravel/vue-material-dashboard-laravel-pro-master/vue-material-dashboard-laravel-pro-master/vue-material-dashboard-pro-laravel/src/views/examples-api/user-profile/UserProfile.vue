<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="multisteps-form mb-9">
          <div class="row">
            <div class="col-12 col-lg-8 m-auto">
              <div class="card">
                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
                    <div class="multisteps-form__progress">
                      <button class="multisteps-form__progress-btn" type="button" title="User Info"
                        :class="activeStep >= 0 ? activeClass : ''" @click="activeStep = 0">
                        <span>User Info</span>
                      </button>

                      <button class="multisteps-form__progress-btn" type="button" title="Change Password"
                        :class="activeStep >= 1 ? activeClass : ''" @click="activeStep = 1">
                        Password
                      </button>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <form>
                    <info :class="activeStep === 0 ? activeClass : ''" />
                  </form>
                  <form>
                    <password :class="activeStep === 1 ? activeClass : ''" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Info from "./Info.vue";
import Password from "./Password.vue";
export default {
  name: "UserProfile",
  components: {
    Info,
    Password,
  },
  data() {
    return {
      activeClass: "js-active position-relative",
      activeStep: 0,
      formSteps: 1,
    };
  },
};
</script>

