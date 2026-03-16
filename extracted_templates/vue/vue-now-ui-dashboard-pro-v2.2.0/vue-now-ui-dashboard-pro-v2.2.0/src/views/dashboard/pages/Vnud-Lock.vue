<template>
  <div class="col-md-4 ml-auto mr-auto">
    <vnud-card class="card-lock text-center" no-footer-line>
      <template v-slot:header>
        <img src="img/emilyz.jpg" alt="..." />
      </template>

      <h4 class="card-title">Joe Gardner</h4>
      <fg-input type="password" placeholder="Enter Password.."> </fg-input>
      <template v-slot:footer>
        <n-button type="primary" round wide>Unlock</n-button>
      </template>
    </vnud-card>
  </div>
</template>
<script>
export default {
  name: "vnud-lock",
};
</script>
<style></style>
