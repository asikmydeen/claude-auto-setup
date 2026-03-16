<template>
  <div class="card overflow-hidden">
    <div class="card-header p-3">
      <p class="text-sm mb-0 text-capitalize">{{ title }}</p>
      <h5 class="font-weight-bolder mb-0">
        {{ value.amount }}
        <span
          class="text-sm font-weight-bolder"
          :class="`text-${value.percentage.color}`"
        >
          {{ value.percentage.value }}
        </span>
      </h5>
    </div>
    <div class="card-body p-0">
      <div class="chart">
        <canvas :id="id" class="chart-canvas" :height="height"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "LineChart",
  props: {
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
  },
  mounted() {
    var ctx = document.getElementById(this.id).getContext("2d");

    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(203,12,159,0.02)");
    gradientStroke.addColorStop(0.2, "rgba(72,72,176,0.0)");
    gradientStroke.addColorStop(0, "rgba(203,12,159,0)"); //purple colors

    let chartStatus = Chart.getChart(this.id);
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }
    new Chart(ctx, {
      type: "line",
      data: {
        labels: this.chart.labels,
        datasets: [
          {
            label: this.chart.datasets.label,
            tension: 0.5,
            pointRadius: 0,
            borderColor: "#252f40",
            borderWidth: 2,
            backgroundColor: "transparent",
            data: this.chart.datasets.data,
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
  },
};
</script>
