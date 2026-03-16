<template>
  <div>
    <v-container fluid class="px-6 py-6">
      <v-row>
        <v-col lg="8">
          <v-row>
            <v-col sm="4" cols="12">
              <v-card class="border-radius-xl overflow-hidden card-shadow">
                <div class="px-4 pb-0 pt-4">
                  <p
                    class="
                      text-sm
                      mb-0
                      text-capitalize
                      font-weight-bold
                      text-body
                    "
                  >
                    Visitors
                  </p>
                  <h5 class="font-weight-bolder text-h5 text-typo mb-0">
                    5,927
                    <span class="text-success text-sm font-weight-bolder"
                      >+55%</span
                    >
                  </h5>
                </div>
                <div>
                  <div class="chart">
                    <canvas
                      id="chart-line-1"
                      class="chart-canvas"
                      height="100"
                    ></canvas>
                  </div>
                </div>
              </v-card>
            </v-col>

            <v-col sm="4" cols="12">
              <v-card class="border-radius-xl overflow-hidden card-shadow">
                <div class="px-4 pb-0 pt-4">
                  <p
                    class="
                      text-sm
                      mb-0
                      text-capitalize
                      font-weight-bold
                      text-body
                    "
                  >
                    Income
                  </p>
                  <h5 class="font-weight-bolder text-h5 text-typo mb-0">
                    $130,832
                    <span class="text-success text-sm font-weight-bolder"
                      >+90%</span
                    >
                  </h5>
                </div>
                <div>
                  <div class="chart">
                    <canvas
                      id="chart-line-2"
                      class="chart-canvas"
                      height="100"
                    ></canvas>
                  </div>
                </div>
              </v-card>
            </v-col>

            <v-col sm="4">
              <v-card
                class="
                  border-radius-xl
                  overflow-hidden
                  card-shadow
                  border
                  h-100
                "
              >
                <div
                  class="
                    px-4
                    py-4
                    d-flex
                    flex-column
                    justify-center
                    text-center
                    h-100
                  "
                >
                  <a href="javascript:;" class="text-decoration-none">
                    <i
                      class="fa fa-plus text-secondary text-sm mb-3"
                      aria-hidden="true"
                    ></i>
                    <h6 class="text-h6 text-secondary font-weight-bold">
                      New tab
                    </h6>
                  </a>
                </div>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <calendar></calendar>
            </v-col>
          </v-row>
        </v-col>
        <v-col lg="4">
          <v-row>
            <v-col lg="12">
              <v-card class="card-shadow px-4 py-4 border-radius-xl">
                <div
                  class="
                    overflow-hidden
                    position-relative
                    border-radius-lg
                    h-100
                  "
                  :style="`background-image: url(${require('../../assets/img/ivancik.jpg')}); background-size: cover;`"
                >
                  <span class="mask bg-gradient-default opacity-8"></span>
                  <div class="px-4 py-4 position-relative z-index-1 h-100">
                    <h6 class="text-white text-h6 font-weight-bolder mb-4">
                      Hey John!
                    </h6>
                    <p class="text-white mb-4">
                      Wealth creation is an evolutionarily recent positive-sum
                      game. It is all about who take the opportunity first.
                    </p>
                    <v-btn
                      outlined
                      color="#fff"
                      class="ms-auto font-weight-bolder py-6 px-5"
                      small
                      rounded
                    >
                      Read more
                      <v-icon size="14" class="rotate-180"
                        >fas fa-arrow-right text-sm ms-1</v-icon
                      >
                    </v-btn>
                  </div>
                </div>
              </v-card>
            </v-col>
            <v-col lg="12" sm="6">
              <categories-card></categories-card>
            </v-col>
            <v-col lg="12" sm="6">
              <v-card class="card-shadow border-radius-xl">
                <div class="px-4 pt-4">
                  <v-row>
                    <v-col cols="4">
                      <v-avatar
                        width="auto"
                        height="auto"
                        class="w-100 h-100 shadow border-radius-lg"
                      >
                        <img
                          src="@/assets/img/kal-visuals-square.jpg"
                          alt="Avatar"
                          class="w-100"
                        />
                      </v-avatar>
                    </v-col>
                    <v-col cols="8">
                      <p class="text-muted text-sm font-weight-bold">
                        Today is Martina's birthday. Wish her the best of luck!
                      </p>
                      <v-btn
                        elevation="0"
                        :ripple="false"
                        height="43"
                        class="
                          font-weight-bold
                          text-uppercase
                          btn-default
                          bg-gradient-default
                          py-2
                          px-6
                          me-2
                        "
                        color="#5e72e4"
                        small
                        >Send Message</v-btn
                      >
                    </v-col>
                  </v-row>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col sm="6">
          <v-card class="card-shadow border-radius-xl">
            <div class="px-4 pt-4">
              <v-row>
                <v-col md="6">
                  <h6 class="mb-0 text-h6 font-weight-bold text-typo">
                    Transactions
                  </h6>
                </v-col>
                <v-col md="6" class="text-end">
                  <v-icon>far fa-calendar-alt me-2</v-icon>
                  <small class="text-body">23 - 30 March 2021</small>
                </v-col>
              </v-row>
            </div>
            <div class="px-4 pb-4 pt-2">
              <div
                v-for="(transaction, index) in transactions"
                :key="transaction.icon"
              >
                <v-list-item :key="transaction.title" class="px-0 py-4">
                  <v-btn
                    :ripple="false"
                    icon
                    outlined
                    rounded
                    :color="transaction.color"
                    width="34px"
                    height="34px"
                    class="me-4"
                  >
                    <v-icon size="8">{{ transaction.icon }}</v-icon>
                  </v-btn>

                  <v-list-item-content class="py-0">
                    <div class="d-flex flex-column">
                      <h6 class="mb-1 text-typo text-sm font-weight-bold">
                        {{ transaction.title }}
                      </h6>
                      <span class="text-xs text-body">{{
                        transaction.date
                      }}</span>
                    </div>
                  </v-list-item-content>

                  <v-list-item-content class="py-0 text-end">
                    <div
                      :class="transaction.gradient"
                      class="text-sm font-weight-bold text-gradient"
                    >
                      {{ transaction.value }}
                    </div>
                  </v-list-item-content>
                </v-list-item>
                <hr
                  class="horizontal"
                  :class="{ dark: index != transactions.length - 1 }"
                />
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col sm="6">
          <v-card class="card-shadow border-radius-xl">
            <div class="px-4 pt-4">
              <v-row>
                <v-col md="6">
                  <h6 class="mb-0 text-h6 font-weight-bold text-typo">
                    Revenue
                  </h6>
                </v-col>
                <v-col md="6" class="text-end">
                  <v-icon>far fa-calendar-alt me-2</v-icon>
                  <small class="text-body">01 - 07 June 2021</small>
                </v-col>
              </v-row>
            </div>
            <div class="px-4 pb-4 pt-2">
              <div v-for="(revenue, index) in revenues" :key="revenue.icon">
                <v-list-item :key="revenue.title" class="px-0 py-4">
                  <v-btn
                    :ripple="false"
                    icon
                    outlined
                    rounded
                    :color="revenue.color"
                    width="34px"
                    height="34px"
                    class="me-4"
                  >
                    <v-icon size="8">{{ revenue.icon }}</v-icon>
                  </v-btn>

                  <v-list-item-content class="py-0">
                    <div class="d-flex flex-column">
                      <h6 class="mb-1 text-typo text-sm font-weight-bold">
                        {{ revenue.title }}
                      </h6>
                      <span class="text-xs text-body">{{ revenue.date }}</span>
                    </div>
                  </v-list-item-content>

                  <v-list-item-content class="py-0 text-end">
                    <div
                      :class="revenue.gradient"
                      class="text-sm font-weight-bold text-gradient"
                    >
                      {{ revenue.value }}
                    </div>
                  </v-list-item-content>
                </v-list-item>
                <hr
                  class="horizontal"
                  :class="{ dark: index != transactions.length - 1 }"
                />
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import CategoriesCard from "./Widgets/CategoriesCard.vue";
import Calendar from "./Widgets/Calendar.vue";

export default {
  name: "Crm",
  components: {
    CategoriesCard,
    Calendar,
  },
  data: function () {
    return {
      chartLine1: "chart-line-1",
      chartLine2: "chart-line-2",
      transactions: [
        {
          icon: "fas fa-arrow-down",
          color: "#ea0606",
          title: "Netflix",
          date: "27 March 2020, at 12:30 PM",
          value: "- $ 2,500",
          gradient: "text-danger",
        },
        {
          icon: "fas fa-arrow-up",
          color: "#82d616",
          title: "Apple",
          date: "23 March 2020, at 04:30 AM",
          value: "+ $ 2,000",
          gradient: "text-success",
        },
        {
          icon: "fas fa-arrow-up",
          color: "#82d616",
          title: "Partner #22213",
          date: "19 March 2020, at 02:50 AM",
          value: "+ $ 1,400",
          gradient: "text-success",
        },
      ],
      revenues: [
        {
          icon: "fas fa-arrow-up",
          color: "#82d616",
          title: "via PayPal",
          date: "07 June 2021, at 09:00 AM",
          value: "+ $ 4,999",
          gradient: "text-success",
        },
        {
          icon: "fas fa-arrow-up",
          color: "#82d616",
          title: "Partner #90211",
          date: "07 June 2021, at 05:50 AM",
          value: "+ $ 700",
          gradient: "text-success",
        },
        {
          icon: "fas fa-arrow-down",
          color: "#ea0606",
          title: "Services",
          date: "07 June 2021, at 07:10 PM",
          value: "- $ 1,800",
          gradient: "text-danger",
        },
      ],
    };
  },
  mounted() {
    var chart1 = document.getElementById(this.chartLine1).getContext("2d");
    var chart2 = document.getElementById(this.chartLine2).getContext("2d");

    var gradientStroke1 = chart1.createLinearGradient(0, 230, 0, 50);

    gradientStroke1.addColorStop(1, "rgba(203,12,159,0.02)");
    gradientStroke1.addColorStop(0.2, "rgba(72,72,176,0.0)");
    gradientStroke1.addColorStop(0, "rgba(203,12,159,0)"); //purple colors

    new Chart(chart1, {
      type: "line",
      data: {
        labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Visitors",
            tension: 0.5,
            pointRadius: 0,
            borderColor: "#cb0c9f",
            borderWidth: 2,
            backgroundColor: gradientStroke1,
            data: [50, 45, 60, 60, 80, 65, 90, 80, 100],
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

    new Chart(chart2, {
      type: "line",
      data: {
        labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Income",
            tension: 0.5,
            pointRadius: 0,
            borderColor: "#cb0c9f",
            borderWidth: 2,
            backgroundColor: gradientStroke1,
            data: [60, 80, 75, 90, 67, 100, 90, 110, 120],
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
              drawOnChartArea: true,
              drawTicks: false,
              borderDash: [5, 5],
            },
            ticks: {
              callback: function (value) {
                return "$" + value;
              },
              display: true,
              padding: 10,
              color: "#9ca2b7",
            },
          },
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
  },
};
</script>
