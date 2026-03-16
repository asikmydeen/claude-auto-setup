<script setup>
import { onMounted } from "vue";
import Chart from "chart.js/auto";

const props = defineProps({
  id: {
    type: String,
    default: "chart-widgets-2",
  },
  height: {
    type: String,
    default: "100",
  },
  title: {
    type: String,
    default: "",
  },
  value: {
    type: Object,
    amount: String,
    percentage: {
      type: Object,
      value: [Number, String],
      color: String,
    },
    default: () => {},
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
    default: () => {},
  },
});

onMounted(() => {
  var ctx1 = document.getElementById(props.id).getContext("2d");
  var gradientStroke2 = ctx1.createLinearGradient(0, 230, 0, 50);

  gradientStroke2.addColorStop(1, "rgba(37,47,64,0.05)");
  gradientStroke2.addColorStop(0.2, "rgba(37,47,64,0.0)");
  gradientStroke2.addColorStop(0, "rgba(37,47,64,0)");

  let chartStatus = Chart.getChart(props.id);
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }

  new Chart(ctx1, {
    type: "line",
    data: {
      labels: props.chart.labels,
      datasets: [
        {
          label: props.chart.datasets.label,
          tension: 0.5,
          borderWidth: 0,
          pointRadius: 0,
          borderColor: "#252f40",
          // eslint-disable-next-line no-dupe-keys
          borderWidth: 2,
          backgroundColor: gradientStroke2,
          data: props.chart.datasets.data,
          maxBarThickness: 6,
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
});
</script>
<template>
  <div class="card overflow-hidden">
    <div class="card-header p-3 pb-0">
      <p class="text-sm mb-0 text-capitalize font-weight-bold">
        {{ props.title }}
      </p>
      <h5 class="font-weight-bolder mb-0">
        {{ props.value.amount }}
        <span
          class="text-sm font-weight-bolder"
          :class="`text-${props.value.percentage.color}`"
        >
          {{ props.value.percentage.value }}
        </span>
      </h5>
    </div>
    <div class="card-body p-0">
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
