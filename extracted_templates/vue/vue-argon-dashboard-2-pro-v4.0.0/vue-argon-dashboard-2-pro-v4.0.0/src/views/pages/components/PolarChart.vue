<script setup>
import { onMounted } from "vue";
import Chart from "chart.js/auto";

const props = defineProps({
  id: {
    type: String,
    default: "polar-chart",
  },
  title: {
    type: String,
    default: "",
  },
  height: {
    type: String,
    default: "100",
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
    type: "polarArea",
    data: {
      labels: props.chart.labels,
      datasets: [
        {
          label: props.chart.datasets.label,
          data: props.chart.datasets.data,
          backgroundColor: [
            "#17c1e8",
            "#5e72e4",
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
