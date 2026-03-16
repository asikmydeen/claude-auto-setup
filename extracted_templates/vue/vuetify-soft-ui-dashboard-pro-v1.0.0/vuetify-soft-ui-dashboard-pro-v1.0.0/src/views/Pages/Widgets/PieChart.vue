<template>
  <v-card class="card-shadow border-radius-xl z-index-2">
    <div class="pa-4 pb-0">
      <h6 class="text-h6 text-typo font-weight-bold">Pie chart</h6>
    </div>
    <div class="card-padding">
      <div class="chart">
        <canvas id="pie-chart" class="chart-canvas" height="300"></canvas>
      </div>
    </div>
  </v-card>
</template>
<script>
import Chart from "chart.js/auto";

export default {
  name: "pie-chart",
  data: function () {
    return {
      pieChartId: "pie-chart",
    };
  },
  mounted() {
    new Chart(document.getElementById(this.pieChartId).getContext("2d"), {
      type: "pie",
      data: {
        labels: ["Facebook", "Direct", "Organic", "Referral"],
        datasets: [
          {
            label: "Projects",
            weight: 9,
            cutout: 0,
            tension: 0.9,
            pointRadius: 2,
            borderWidth: 2,
            backgroundColor: ["#17c1e8", "#cb0c9f", "#3A416F", "#a8b8d8"],
            data: [15, 20, 12, 60],
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        scales: {
          y: {
            grid: {
              drawBorder: false,
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
            },
            ticks: {
              display: false,
            },
          },
          x: {
            grid: {
              drawBorder: false,
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
            },
            ticks: {
              display: false,
            },
          },
        },
      },
    });
  },
};
</script>
