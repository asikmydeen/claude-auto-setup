<script setup>
import { onMounted } from "vue";
import Chart from "chart.js/auto";

const props = defineProps({
  id: {
    type: String,
    default: "thin-bar-chart",
  },
  title: {
    type: String,
    default: "Thin Bar Chart",
  },
  height: {
    type: [String, Number],
    default: "200",
  },
  chart: {
    type: Object,
    required: true,
    labels: Array,
    datasets: {
      type: Object,
      label: String,
      data: Array,
    },
  },
});

onMounted(() => {
  var ctx = document.getElementById(props.id).getContext("2d");

  let chartStatus = Chart.getChart(props.id);
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: props.chart.labels,
      datasets: [
        {
          label: props.chart.datasets.label,
          tension: 0.4,
          borderWidth: 0,
          borderRadius: 4,
          borderSkipped: false,
          backgroundColor: "#3A416F",
          data: props.chart.datasets.data,
          maxBarThickness: 6,
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
            beginAtZero: true,
            font: {
              size: 12,
              family: "Open Sans",
              style: "normal",
            },
            color: "#9ca2b7",
          },
        },
        // eslint-disable-next-line no-dupe-keys
        y: {
          grid: {
            drawBorder: false,
            display: false,
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
        // eslint-disable-next-line no-dupe-keys
        x: {
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
      },
    },
  });
});
</script>
<template>
  <div class="card h-100">
    <div class="p-3 card-body">
      <h6>{{ props.title }}</h6>
      <div class="pt-3 chart">
        <canvas
          :id="props.id"
          class="chart-canvas"
          :height="props.height"
        ></canvas>
      </div>
    </div>
  </div>
</template>
