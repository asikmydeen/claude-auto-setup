<template>
  <v-card class="card-shadow border-radius-xl z-index-2">
    <div class="pa-4 pb-0">
      <h6 class="text-h6 text-typo font-weight-bold">Radar chart</h6>
    </div>
    <div class="card-padding">
      <div class="chart">
        <canvas id="radar-chart" class="chart-canvas" height="100"></canvas>
      </div>
    </div>
  </v-card>
</template>
<script>
import Chart from "chart.js/auto";

export default {
  name: "radar-chart",
  data: function () {
    return {
      radarChartId: "radar-chart",
    };
  },
  mounted() {
    new Chart(document.getElementById(this.radarChartId).getContext("2d"), {
      type: "radar",
      data: {
        labels: [
          "English",
          "Maths",
          "Physics",
          "Chemistry",
          "Biology",
          "History",
        ],
        datasets: [
          {
            label: "Student A",
            backgroundColor: "rgba(58,65,111,0.2)",
            data: [65, 75, 70, 80, 60, 80],
            borderDash: [5, 5],
          },
          {
            label: "Student B",
            backgroundColor: "rgba(203,12,159,0.2)",
            data: [54, 65, 60, 70, 70, 75],
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
