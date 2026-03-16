<template>
  <div class="chart">
    <canvas :id="id" class="chart-canvas" :height="height"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
export default {
  name: "PolarChart",
  props: {
    id: {
      type: String,
      default: "polar-chart",
    },
    height: {
      type: [String, Number],
      default: "100",
    },
    chart: {
      type: Object,
      required: true,
      labels: Array,
      datasets: {
        type: Object,
        required: true,
        label: String,
        data: Array,
      },
    },
  },
  mounted() {
    //Polar Chart
    var ctx = document.getElementById(this.id).getContext("2d");

    let chartStatus = Chart.getChart(this.id);
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }

    new Chart(ctx, {
      type: "polarArea",
      data: {
        labels: this.chart.labels,
        datasets: [
          {
            label: this.chart.datasets.label,
            data: this.chart.datasets.data,
            backgroundColor: [
              "#03A9F4",
              "#e91e63",
              "#3A416F",
              "#a8b8d8",
              "#4CAF50",
            ],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  },
};
</script>
