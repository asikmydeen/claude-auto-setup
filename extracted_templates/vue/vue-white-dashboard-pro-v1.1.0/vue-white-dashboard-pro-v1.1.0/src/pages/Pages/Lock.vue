<template>
  <div class="container">
    <div class="col-lg-4 col-md-6 ml-auto mr-auto">
      <card class="card-lock card-white text-center">
        <div class="card-header">
          <img slot="header" src="img/emilyz.jpg" alt="..." />
        </div>
        <div class="card-body">
          <h4 class="card-title">Joe Gardner</h4>
          <base-input
            type="password"
            placeholder="Password"
            addon-left-icon="tim-icons icon-key-25"
          >
          </base-input>
        </div>
        <div class="card-footer">
          <base-button type="primary" size="lg" round>
            Unlock
          </base-button>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { Card, BaseInput } from "@/components/index";
export default {
  components: {
    Card,
    BaseInput
  }
};
</script>
<style></style>
