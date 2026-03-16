<template>
  <v-card class="card-shadow border-radius-xl z-index-2">
    <div class="pa-4 pb-0">
      <h6 class="text-h6 text-typo font-weight-bold">Polar chart</h6>
    </div>
    <div class="card-padding">
      <div class="chart">
        <canvas id="polar-chart" class="chart-canvas" height="100"></canvas>
      </div>
    </div>
  </v-card>
</template>
<script>
import Chart from "chart.js/auto";

export default {
  name: "polar-chart",
  data: function () {
    return {
      polarChartId: "polar-chart",
    };
  },
  mounted() {
    new Chart(document.getElementById(this.polarChartId).getContext("2d"), {
      type: "polarArea",
      data: {
        labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
        datasets: [
          {
            label: "My First Dataset",
            data: [11, 16, 7, 3, 14],
            backgroundColor: [
              "#17c1e8",
              "#cb0c9f",
              "#3A416F",
              "#a8b8d8",
              "#82d616",
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
