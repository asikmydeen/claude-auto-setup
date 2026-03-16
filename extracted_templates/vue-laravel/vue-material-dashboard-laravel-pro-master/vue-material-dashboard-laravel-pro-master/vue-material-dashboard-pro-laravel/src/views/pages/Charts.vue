<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-md-6">
        <h5 class="mb-0">Charts</h5>
        <p class="mb-0 text-sm">
          Charts on this page use Chart.js - Simple yet flexible JavaScript
          charting for designers & developers.
        </p>
      </div>
    </div>
    <div class="mt-4 row">
      <div class="col-md-6 col-12">
        <div class="card z-index-2 mt-4">
          <div class="card-header p-3 pt-2">
            <div
              class="icon icon-lg icon-shape bg-gradient-info shadow-info text-center border-radius-xl mt-n4 me-3 float-start"
            >
              <i class="material-icons opacity-10">insights</i>
            </div>
            <div class="d-block d-md-flex">
              <div class="me-auto">
                <h6 class="mb-0">Line chart</h6>
                <p class="mb-0 text-sm">Product insights</p>
              </div>
              <span
                class="badge badge-lg badge-dot me-4 d-inline-block text-start"
              >
                <i class="bg-success"></i>
                <span class="text-dark">Organic</span>
              </span>
              <span
                class="badge badge-lg badge-dot me-4 d-inline-block text-start"
              >
                <i class="bg-dark"></i>
                <span class="text-dark">Refferal</span>
              </span>
              <span
                class="badge badge-lg badge-dot me-4 d-inline-block text-start"
              >
                <i class="bg-info"></i>
                <span class="text-dark">Direct</span>
              </span>
            </div>
          </div>
          <div class="p-3 card-body">
            <div class="chart">
              <default-line-chart
                id="line-chart"
                title="Line chart"
                :chart="{
                  labels: [
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                  ],
                  datasets: [
                    {
                      label: 'Organic Search',
                      data: [50, 40, 300, 220, 500, 250, 400, 230, 500]
                    },
                    {
                      label: 'Referral',
                      data: [30, 90, 40, 140, 290, 290, 340, 230, 400]
                    },
                    {
                      label: 'Direct',
                      data: [40, 80, 70, 90, 30, 90, 140, 130, 200]
                    }
                  ]
                }"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-12 mt-md-0 mt-4">
        <div class="card z-index-2 mt-4">
          <div class="card-header p-3 pt-2">
            <div
              class="icon icon-lg icon-shape bg-gradient-info shadow-info text-center border-radius-xl mt-n4 me-3 float-start"
            >
              <i class="material-icons opacity-10">show_chart</i>
            </div>
            <div class="d-block d-md-flex">
              <div class="me-auto">
                <h6 class="mb-0">Line chart without dots</h6>
                <p class="mb-0 text-sm">Visits from devices</p>
              </div>
              <span
                class="badge badge-lg badge-dot me-4 d-inline-block text-start"
              >
                <i class="bg-success"></i>
                <span class="text-dark">Mobile Apps</span>
              </span>
              <span
                class="badge badge-lg badge-dot me-4 d-inline-block text-start"
              >
                <i class="bg-dark"></i>
                <span class="text-dark">Websites</span>
              </span>
            </div>
          </div>
          <div class="p-3 card-body">
            <gradient-line-chart
              id="chart-line"
              title="Line chart with gradient"
              :chart="{
                labels: [
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec'
                ],
                datasets: [
                  {
                    label: 'Mobile Apps',
                    data: [50, 40, 300, 220, 500, 250, 400, 230, 500]
                  },
                  {
                    label: 'Websites',
                    data: [30, 90, 40, 140, 290, 290, 340, 230, 400]
                  }
                ]
              }"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 row">
      <div class="col-md-6 col-12">
        <div class="card z-index-2 mt-4">
          <div class="card-header p-3 pt-2">
            <div
              class="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 me-3 float-start"
            >
              <i class="material-icons opacity-10">leaderboard</i>
            </div>
            <h6 class="mb-0">Bar chart</h6>
            <p class="mb-0 text-sm">Sales related to age average</p>
          </div>
          <div class="p-3 card-body">
            <bar-chart
              :chart="{
                labels: ['16-20', '21-25', '26-30', '31-36', '36-42', '42+'],
                datasets: {
                  label: 'Sales by age',
                  data: [15, 20, 12, 60, 20, 15]
                }
              }"
            />
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-12 mt-md-0 mt-4">
        <div class="card z-index-2 mt-4">
          <div class="card-header p-3 pt-2">
            <div
              class="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 me-3 float-start"
            >
              <i class="material-icons opacity-10">splitscreen</i>
            </div>
            <h6 class="mb-0">Bar chart horizontal</h6>
            <p class="mb-0 text-sm">Sales related to age average</p>
          </div>
          <div class="p-3 card-body">
            <bar-chart-horizontal
              :chart="{
                labels: ['16-20', '21-25', '26-30', '31-36', '36-42', '42+'],
                datasets: {
                  label: 'Sales by age',
                  data: [15, 20, 12, 60, 20, 15]
                }
              }"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 row">
      <div class="col-md-6 col-12">
        <div class="card z-index-2 mt-4">
          <div class="card-header p-3 pt-2">
            <div
              class="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 me-3 float-start"
            >
              <i class="material-icons opacity-10">auto_graph</i>
            </div>
            <h6 class="mb-0">Mixed chart</h6>
            <p class="mb-0 text-sm">Analytics Insights</p>
          </div>
          <div class="p-3 card-body">
            <mixed-chart
              :chart="{
                labels: [
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec'
                ],
                datasets: [
                  {
                    label: 'Organic Search',
                    data: [50, 40, 300, 220, 500, 250, 400, 230, 500]
                  },
                  {
                    label: 'Referral',
                    data: [30, 90, 40, 140, 290, 290, 340, 230, 400]
                  }
                ]
              }"
            />
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-12 mt-md-0 mt-4">
        <div class="card z-index-2 mt-4">
          <div class="card-header p-3 pt-2">
            <div
              class="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 me-3 float-start"
            >
              <i class="material-icons opacity-10">multiline_chart</i>
            </div>
            <h6 class="mb-0">Bubble chart</h6>
            <p class="mb-0 text-sm">Users divided by regions</p>
          </div>
          <div class="p-3 card-body">
            <bubble-chart
              :height="163"
              :chart="{
                labels: [
                  '0',
                  '10',
                  '20',
                  '30',
                  '40',
                  '50',
                  '60',
                  '70',
                  '80',
                  '90'
                ],
                datasets: [
                  {
                    label: 'Dataset 1',
                    data: [
                      {
                        x: 100,
                        y: 0,
                        r: 10
                      },
                      {
                        x: 60,
                        y: 30,
                        r: 20
                      },
                      {
                        x: 40,
                        y: 350,
                        r: 10
                      },
                      {
                        x: 80,
                        y: 80,
                        r: 10
                      },
                      {
                        x: 20,
                        y: 30,
                        r: 15
                      },
                      {
                        x: 0,
                        y: 100,
                        r: 5
                      }
                    ]
                  },
                  {
                    label: 'Dataset 2',
                    data: [
                      {
                        x: 70,
                        y: 40,
                        r: 10
                      },
                      {
                        x: 30,
                        y: 60,
                        r: 20
                      },
                      {
                        x: 10,
                        y: 300,
                        r: 25
                      },
                      {
                        x: 60,
                        y: 200,
                        r: 10
                      },
                      {
                        x: 50,
                        y: 300,
                        r: 15
                      },
                      {
                        x: 20,
                        y: 350,
                        r: 5
                      }
                    ]
                  }
                ]
              }"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 row">
      <div class="col-md-6 col-12">
        <div class="card z-index-2 mt-4">
          <div class="card-header p-3 pt-2">
            <div
              class="icon icon-lg icon-shape bg-gradient-warning shadow-warning text-center border-radius-xl mt-n4 me-3 float-start"
            >
              <i class="material-icons opacity-10">donut_small</i>
            </div>
            <h6 class="mb-0">Doughnut chart</h6>
            <p class="mb-0 text-sm">Affiliates program</p>
          </div>
          <div class="p-3 card-body">
            <div class="card-body d-flex p-3 pt-0">
              <doughnut-chart
                class="w-50"
                :chart="{
                  labels: [
                    'Dev.to',
                    'Creative Tim',
                    'Bootsnipp',
                    'Github',
                    'Codeinwp'
                  ],
                  datasets: {
                    label: 'Projects',
                    data: [15, 20, 12, 60, 20]
                  }
                }"
              />
              <div class="table-responsive w-50">
                <table class="table align-items-center mb-0">
                  <tbody>
                    <tr>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div>
                            <img
                              src="../../assets/img/small-logos/devto.svg"
                              class="avatar avatar-sm me-2"
                              alt="logo_xd"
                            />
                          </div>
                          <div
                            class="d-flex flex-column justify-content-center"
                          >
                            <h6 class="mb-0 text-sm">DevTo</h6>
                          </div>
                        </div>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="text-xs font-weight-bold">25%</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div>
                            <img
                              src="../../assets/img/small-logos/creative-tim.svg"
                              class="avatar avatar-sm me-2"
                              alt="logo_atlassian"
                            />
                          </div>
                          <div
                            class="d-flex flex-column justify-content-center"
                          >
                            <h6 class="mb-0 text-sm">CreativeTim</h6>
                          </div>
                        </div>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="text-xs font-weight-bold">13%</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div>
                            <img
                              src="../../assets/img/small-logos/bootstrap.svg"
                              class="avatar avatar-sm me-2"
                              alt="logo_slack"
                            />
                          </div>
                          <div
                            class="d-flex flex-column justify-content-center"
                          >
                            <h6 class="mb-0 text-sm">Bootsnip</h6>
                          </div>
                        </div>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="text-xs font-weight-bold">12%</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div>
                            <img
                              src="../../assets/img/small-logos/github.svg"
                              class="avatar avatar-sm me-2"
                              alt="logo_spotify"
                            />
                          </div>
                          <div
                            class="d-flex flex-column justify-content-center"
                          >
                            <h6 class="mb-0 text-sm">Github</h6>
                          </div>
                        </div>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="text-xs font-weight-bold">37%</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div>
                            <img
                              src="../../assets/img/small-logos/google-webdev.svg"
                              class="avatar avatar-sm me-2"
                              alt="logo_jira"
                            />
                          </div>
                          <div
                            class="d-flex flex-column justify-content-center"
                          >
                            <h6 class="mb-0 text-sm">Codeinwp</h6>
                          </div>
                        </div>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="text-xs font-weight-bold">13%</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-12 mt-md-0 mt-4">
        <div class="card z-index-2 mt-4">
          <div class="card-header p-3 pt-2">
            <div
              class="icon icon-lg icon-shape bg-gradient-warning shadow-warning text-center border-radius-xl mt-n4 me-3 float-start"
            >
              <i class="material-icons opacity-10">pie_chart</i>
            </div>
            <h6 class="mb-0">Pie chart</h6>
            <p class="mb-0 text-sm">Analytics Insights</p>
          </div>
          <div class="p-3 card-body">
            <div class="card-body d-flex p-3 pt-0">
              <pie-chart
                id="pie-chart-component"
                class="w-50"
                height="300"
                :chart="{
                  labels: ['Facebook', 'Direct', 'Organic', 'Referral'],
                  datasets: {
                    label: 'Projects',
                    data: [15, 20, 12, 60]
                  }
                }"
              />
              <div class="w-50 my-auto ms-5">
                <span class="badge badge-lg badge-dot me-4 d-block text-start">
                  <i class="bg-info"></i>
                  <span class="text-dark">Facebook</span>
                </span>
                <span class="badge badge-lg badge-dot me-4 d-block text-start">
                  <i class="bg-success"></i>
                  <span class="text-dark">Direct</span>
                </span>
                <span class="badge badge-lg badge-dot me-4 d-block text-start">
                  <i class="bg-dark"></i>
                  <span class="text-dark">Organic</span>
                </span>
                <span class="badge badge-lg badge-dot me-4 d-block text-start">
                  <i class="bg-secondary"></i>
                  <span class="text-dark">Referral</span>
                </span>
                <p class="text-sm mt-3">
                  More than
                  <b>1,200,000</b> sales are made using referral marketing, and
                  <b>700,000</b> are from social media.
                </p>
                <a class="btn bg-gradient-secondary mb-0" href="javascript:;"
                  >Read more</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 row">
      <div class="col-md-6">
        <div class="card z-index-2 mt-4">
          <div class="card-header p-3 pt-2">
            <div
              class="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 me-3 float-start"
            >
              <i class="material-icons opacity-10">data_saver_on</i>
            </div>
            <h6 class="mb-0">Radar chart</h6>
            <p class="mb-0 text-sm">Sciences score</p>
          </div>
          <div class="p-5 card-body">
            <radar-chart
              :chart="{
                labels: [
                  'English',
                  'Maths',
                  'Physics',
                  'Chemistry',
                  'Biology',
                  'History'
                ],
                datasets: [
                  {
                    label: 'Stduent A',
                    data: [65, 75, 70, 80, 60, 80]
                  },
                  {
                    label: 'Stduent B',
                    data: [54, 65, 60, 70, 70, 75]
                  }
                ]
              }"
            />
          </div>
        </div>
      </div>
      <div class="col-md-6 mt-md-0 mt-4">
        <div class="card z-index-2 mt-4">
          <div class="card-header p-3 pt-2">
            <div
              class="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 me-3 float-start"
            >
              <i class="material-icons opacity-10">scatter_plot</i>
            </div>
            <h6 class="mb-0">Polar chart</h6>
            <p class="mb-0 text-sm">Analytics Insights</p>
          </div>
          <div class="p-5 card-body">
            <polar-chart
              :chart="{
                labels: ['Blue', 'Red', 'Nile', 'Grey', 'Green'],
                datasets: {
                  label: 'My First Dataset',
                  data: [11, 16, 7, 3, 14]
                }
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DefaultLineChart from "@/examples/Charts/DefaultLineChart.vue";
import GradientLineChart from "./components/GradientLineChart.vue";
import BarChart from "./components/BarChart.vue";
import BarChartHorizontal from "./components/BarChartHorizontal.vue";
import MixedChart from "./components/MixedChart.vue";
import BubbleChart from "./components/BubbleChart.vue";
import DoughnutChart from "./components/DoughnutChart.vue";
import PieChart from "@/examples/Charts/PieChart.vue";
import RadarChart from "./components/RadarChart.vue";
import PolarChart from "./components/PolarChart.vue";

export default {
  name: "Charts",
  components: {
    DefaultLineChart,
    GradientLineChart,
    BarChart,
    BarChartHorizontal,
    MixedChart,
    BubbleChart,
    DoughnutChart,
    PieChart,
    RadarChart,
    PolarChart
  }
};
</script>
