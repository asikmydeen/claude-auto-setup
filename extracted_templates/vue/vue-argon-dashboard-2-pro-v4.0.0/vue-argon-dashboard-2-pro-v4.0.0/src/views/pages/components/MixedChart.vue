<script setup>
import { onMounted } from "vue";
import Chart from "chart.js/auto";

const props = defineProps({
  id: {
    type: String,
    default: "mixed-chart",
  },
  title: {
    type: String,
    default: "",
  },
  height: {
    type: String,
    default: "300",
  },
  chart: {
    type: Object,
    required: true,
    labels: Array,
    datasets: {
      type: Array,
      label: String,
      data: Array,
    },
  },
});

onMounted(() => {
  let ctx = document.getElementById(props.id).getContext("2d");

  let gradientStroke1 = ctx.createLinearGradient(0, 230, 0, 50);

  gradientStroke1.addColorStop(1, "rgba(203,12,159,0.2)");
  gradientStroke1.addColorStop(0.2, "rgba(72,72,176,0.0)");
  gradientStroke1.addColorStop(0, "rgba(203,12,159,0)"); //purple colors

  let chartStatus = Chart.getChart(props.id);
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }

  new Chart(ctx, {
    data: {
      labels: props.chart.labels,
      datasets: [
        {
          type: "bar",
          label: props.chart.datasets[0].label,
          weight: 5,
          tension: 0.4,
          borderWidth: 0,
          pointBackgroundColor: "#3A416F",
          borderColor: "#3A416F",
          backgroundColor: "#3A416F",
          borderRadius: 4,
          borderSkipped: false,
          data: props.chart.datasets[0].data,
          maxBarThickness: 10,
        },
        {
          type: "line",
          label: props.chart.datasets[1].label,
          tension: 0.4,
          borderWidth: 0,
          pointRadius: 0,
          pointBackgroundColor: "#4BB543 ",
          borderColor: "#4BB543 ",
          // eslint-disable-next-line no-dupe-keys
          borderWidth: 3,
          backgroundColor: gradientStroke1,
          data: props.chart.datasets[1].data,
          fill: true,
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
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            padding: 10,
            color: "#b2b9bf",
            font: {
              size: 11,
              family: "Open Sans",
              style: "normal",
              lineHeight: 2,
            },
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: true,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            color: "#b2b9bf",
            padding: 10,
            font: {
              size: 11,
              family: "Open Sans",
              style: "normal",
              lineHeight: 2,
            },
          },
        },
      },
    },
  });
});
</script>
<template>
  <div class="card z-index-2">
    <div class="p-3 pb-0 card-header">
      <h6>{{ props.title }}</h6>
    </div>
    <div class="p-3 card-body">
      <div class="chart">
        <canvas
          :id="props.id"
          class="chart-canvas"
          :height="props.height"
        ></canvas>
      </div>
    </div>
  </div>
</template>
