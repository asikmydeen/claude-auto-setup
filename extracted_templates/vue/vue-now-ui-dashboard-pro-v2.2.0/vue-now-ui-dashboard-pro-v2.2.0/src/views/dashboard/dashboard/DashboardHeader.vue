<template>
  <div class="panel-header panel-header-lg">
    <canvas :id="headerChartID"></canvas>
  </div>
</template>

<script>
import headerChart from "./HeaderChart";

export default {
  name: "overview-header",
  data() {
    return {
      headerChartID: "headerChart",
    };
  },
  mounted() {
    headerChart.createChart(this.headerChartID);
  },
};
</script>

<style scoped></style>
