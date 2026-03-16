<template>
  <div>
    <div class="row">
      <div class="col-md-5 ml-auto">
        <vnud-card class="card-chart" no-footer-line>
          <template v-slot:header>
            <h5 class="card-category">Simple with gradient</h5>
            <h4 class="card-title">Line Chart</h4>
            <drop-down position="right">
              <template v-slot:title>
                <n-button class="dropdown-toggle no-caret" round simple icon>
                  <i class="now-ui-icons loader_gear"></i>
                </n-button>
              </template>

              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
              <a class="dropdown-item text-danger" href="#">Remove Data</a>
            </drop-down>
          </template>
          <div class="chart-area">
            <canvas :id="lineChart1ChartID"></canvas>
          </div>
          <template v-slot:footer>
            <div class="stats">
              <i class="now-ui-icons arrows-1_refresh-69"></i> Just Updated
            </div>
          </template>
        </vnud-card>
      </div>

      <div class="col-md-5 mr-auto">
        <vnud-card class="card-chart" no-footer-line>
          <template v-slot:header>
            <h5 class="card-category">With Numbers And Grid</h5>
            <h4 class="card-title">Line Chart 2</h4>
            <drop-down position="right">
              <template v-slot:title>
                <n-button class="dropdown-toggle no-caret" round simple icon>
                  <i class="now-ui-icons loader_gear"></i>
                </n-button>
              </template>

              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
              <a class="dropdown-item text-danger" href="#">Remove Data</a>
            </drop-down>
          </template>
          <div class="chart-area">
            <canvas :id="lineChart2ChartID"></canvas>
          </div>
          <template v-slot:footer>
            <div class="stats">
              <i class="now-ui-icons arrows-1_refresh-69"></i> Just Updated
            </div>
          </template>
        </vnud-card>
      </div>
    </div>
    <div class="row">
      <div class="col-md-5 ml-auto">
        <vnud-card class="card-chart" no-footer-line>
          <template v-slot:header>
            <h5 class="card-category">Simple With Grids And Numbers</h5>
            <h4 class="card-title">Bar Chart</h4>
          </template>
          <div class="chart-area">
            <canvas :id="barChart1ChartID"></canvas>
          </div>
          <template v-slot:footer>
            <div class="stats">
              <i class="now-ui-icons ui-2_time-alarm"></i> Last 7 days
            </div>
          </template>
        </vnud-card>
      </div>

      <div class="col-md-5 mr-auto">
        <vnud-card class="card-chart" no-footer-line>
          <template v-slot:header>
            <h5 class="card-category">Multiple Bars No Gradient</h5>
            <h4 class="card-title">Bar Chart 2</h4>
          </template>
          <div class="chart-area">
            <canvas :id="barChart2ChartID"></canvas>
          </div>
          <template v-slot:footer>
            <div class="stats">
              <i class="now-ui-icons ui-2_time-alarm"></i> Last 7 days
            </div>
          </template>
        </vnud-card>
      </div>
    </div>
  </div>
</template>
<script>
import { lineChart1, lineChart2 } from "@/components/Charts/LineChart";
import { barChart1, barChart2 } from "@/components/Charts/BarChart";

export default {
  data() {
    return {
      barChart2: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            backgroundColor: "#f96332",
            data: [40, 26, 28, 45, 20, 25, 30, 25, 20, 25, 20, 15],
          },
          {
            backgroundColor: "#2CA8FF",
            data: [15, 20, 25, 30, 25, 20, 15, 20, 25, 30, 25, 20],
          },
        ],
      },
      lineChart1ChartID: "lineChart1ChartID",
      lineChart2ChartID: "lineChart2ChartID",
      barChart1ChartID: "barChart1ChartID",
      barChart2ChartID: "barChart2ChartID",
    };
  },
  mounted() {
    lineChart1.createChart(this.lineChart1ChartID);
    lineChart2.createChart(this.lineChart2ChartID);
    barChart1.createChart(this.barChart1ChartID);
    barChart2.createChart(this.barChart2ChartID);
  },
};
</script>
<style></style>
