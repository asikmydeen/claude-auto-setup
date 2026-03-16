<template>
  <div>
    <v-container fluid class="px-6 py-6">
      <v-row>
        <v-col md="6">
          <h5 class="text-h5 text-typo font-weight-bold mb-0">Charts</h5>
          <p class="text-sm text-body mb-0">
            Charts on this page use Chart.js - Simple yet flexible JavaScript
            charting for designers &amp; developers.
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6" cols="12">
          <line-chart></line-chart>
        </v-col>
        <v-col md="6" cols="12">
          <line-chart-gradient></line-chart-gradient>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6" cols="12">
          <bar-chart></bar-chart>
        </v-col>
        <v-col md="6" cols="12">
          <bar-chart-horizontal></bar-chart-horizontal>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6" cols="12">
          <mixed-chart></mixed-chart>
        </v-col>
        <v-col md="6" cols="12">
          <bubble-chart></bubble-chart>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6" cols="12">
          <doughnut-chart></doughnut-chart>
        </v-col>
        <v-col md="6" cols="12">
          <pie-chart></pie-chart>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6" cols="12">
          <radar-chart></radar-chart>
        </v-col>
        <v-col md="6" cols="12">
          <polar-chart></polar-chart>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import LineChart from "./Widgets/LineChart.vue";
import LineChartGradient from "./Widgets/LineChartGradient.vue";
import BarChart from "./Widgets/BarChart.vue";
import BarChartHorizontal from "./Widgets/BarChartHorizontal.vue";
import MixedChart from "./Widgets/MixedChart.vue";
import BubbleChart from "./Widgets/BubbleChart.vue";
import DoughnutChart from "./Widgets/DoughnutChart.vue";
import PieChart from "./Widgets/PieChart.vue";
import RadarChart from "./Widgets/RadarChart.vue";
import PolarChart from "./Widgets/PolarChart.vue";

export default {
  name: "Charts",
  components: {
    LineChart,
    LineChartGradient,
    BarChart,
    BarChartHorizontal,
    MixedChart,
    BubbleChart,
    DoughnutChart,
    PieChart,
    RadarChart,
    PolarChart,
  },
};
</script>
