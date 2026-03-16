<template>
  <v-card class="card-shadow border-radius-xl z-index-2">
    <div class="pa-4 pb-0">
      <h6 class="text-h6 text-typo font-weight-bold">Doughnut chart</h6>
    </div>
    <div class="card-padding">
      <div class="chart">
        <canvas id="doughnut-chart" class="chart-canvas" height="300"></canvas>
      </div>
    </div>
  </v-card>
</template>
<script>
import Chart from "chart.js/auto";

export default {
  name: "doughnut-chart",
  data: function () {
    return {
      doughnutChartId: "doughnut-chart",
    };
  },
  mounted() {
    new Chart(document.getElementById(this.doughnutChartId).getContext("2d"), {
      type: "doughnut",
      data: {
        labels: ["Creative Tim", "Github", "Bootsnipp", "Dev.to", "Codeinwp"],
        datasets: [
          {
            label: "Projects",
            weight: 9,
            cutout: 60,
            tension: 0.9,
            pointRadius: 2,
            borderWidth: 2,
            backgroundColor: [
              "#2152ff",
              "#3A416F",
              "#f53939",
              "#a8b8d8",
              "#cb0c9f",
            ],
            data: [15, 20, 12, 60, 20],
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
