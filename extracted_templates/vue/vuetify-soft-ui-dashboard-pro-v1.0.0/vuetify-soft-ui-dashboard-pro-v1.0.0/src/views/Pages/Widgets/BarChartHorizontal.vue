<template>
  <v-card class="card-shadow border-radius-xl z-index-2">
    <div class="pa-4 pb-0">
      <h6 class="text-h6 text-typo font-weight-bold">Bar chart horizontal</h6>
    </div>
    <div class="card-padding">
      <div class="chart">
        <canvas
          id="bar-chart-horizontal"
          class="chart-canvas"
          height="300"
        ></canvas>
      </div>
    </div>
  </v-card>
</template>
<script>
import Chart from "chart.js/auto";

export default {
  name: "bar-chart-horizontal",
  data: function () {
    return {
      barChartHorizontalId: "bar-chart-horizontal",
    };
  },
  mounted() {
    new Chart(
      document.getElementById(this.barChartHorizontalId).getContext("2d"),
      {
        type: "bar",
        data: {
          labels: ["16-20", "21-25", "26-30", "31-36", "36-42", "42+"],
          datasets: [
            {
              label: "Sales by age",
              weight: 5,
              borderWidth: 0,
              borderRadius: 4,
              backgroundColor: "#3A416F",
              data: [15, 20, 12, 60, 20, 15],
              fill: false,
            },
          ],
        },
        options: {
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              grid: {
                drawBorder: false,
                display: true,
                drawOnChartArea: true,
                drawTicks: false,
                borderDash: [5, 5],
              },
              ticks: {
                display: true,
                padding: 10,
                color: "#9ca2b7",
              },
            },
            x: {
              grid: {
                drawBorder: false,
                display: false,
                drawOnChartArea: true,
                drawTicks: true,
              },
              ticks: {
                display: true,
                color: "#9ca2b7",
                padding: 10,
              },
            },
          },
        },
      }
    );
  },
};
</script>
