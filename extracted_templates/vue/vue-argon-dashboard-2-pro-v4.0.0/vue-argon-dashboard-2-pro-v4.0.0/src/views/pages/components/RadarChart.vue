<script setup>
import { onMounted } from "vue";
import Chart from "chart.js/auto";

const props = defineProps({
  id: {
    type: String,
    default: "radar-chart",
  },
  title: {
    type: String,
    default: "",
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
      type: Array,
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
    type: "radar",
    data: {
      labels: props.chart.labels,
      datasets: [
        {
          label: props.chart.datasets[0].label,
          backgroundColor: "rgba(58,65,111,0.2)",
          data: props.chart.datasets[0].data,
          borderDash: [5, 5],
        },
        {
          label: props.chart.datasets[1].label,
          backgroundColor: "rgba(203,12,159,0.2)",
          data: props.chart.datasets[1].label,
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
});
</script>
<template>
  <div class="card z-index-2">
    <div class="p-3 pb-0 card-header">
      <h6>{{ props.title }}</h6>
    </div>
    <div class="p-5 card-body">
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
