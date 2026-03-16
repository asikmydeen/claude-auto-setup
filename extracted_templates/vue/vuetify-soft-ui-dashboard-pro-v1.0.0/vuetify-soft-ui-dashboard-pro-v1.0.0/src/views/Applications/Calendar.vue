<template>
  <div>
    <v-container fluid class="px-6 py-6">
      <v-row>
        <v-col cols="12">
          <div class="d-flex mb-2">
            <div class="pe-6 mt-1 position-relative ms-auto">
              <p class="text-secondary text-xs font-weight-bold mb-2">
                Team members:
              </p>
              <div class="d-flex align-center justify-center">
                <span class="avatar-group d-flex">
                  <v-tooltip
                    top
                    color="#212529"
                    v-for="(avatar, index) in avatars"
                    :key="avatar.name"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-avatar
                        v-bind="attrs"
                        v-on="on"
                        size="36"
                        class="border border-white"
                        :class="index != 0 ? 'ms-n3' : ''"
                      >
                        <img :src="avatar.image" alt="Avatar" />
                      </v-avatar>
                    </template>
                    <span>{{ avatar.name }}</span>
                  </v-tooltip>
                </span>
              </div>
              <hr class="vertical dark mt-0" />
            </div>
            <div class="ps-6">
              <v-btn
                icon
                outlined
                color="#344767"
                width="40px"
                height="40px"
                class="ms-auto border-radius-md mt-4"
              >
                <v-icon size="12">fa fa-plus</v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>
        <v-col lg="9">
          <calendar-widget></calendar-widget>
        </v-col>
        <v-col lg="3">
          <v-card class="card-shadow border-radius-xl">
            <div class="px-4 pt-4">
              <h6 class="text-h6 font-weight-bold text-typo">Next events</h6>
            </div>
            <div class="px-4 pt-4 pb-3">
              <v-list>
                <v-list-item-group class="border-radius-sm">
                  <v-list-item
                    :ripple="false"
                    v-for="(item, i) in events"
                    :key="item.title"
                    class="px-0 border-radius-sm"
                    :class="i < events.length - 1 ? 'mb-6' : ' '"
                  >
                    <v-avatar
                      size="50"
                      class="text-white border-radius-md px-2 py-2 me-4"
                      :color="item.color"
                    >
                      <v-icon
                        :class="`text-gradient text-` + item.iconColor"
                        size="18"
                        >{{ item.icon }}</v-icon
                      >
                    </v-avatar>
                    <v-list-item-content class="py-0">
                      <div class="d-flex flex-column">
                        <h6 class="mb-1 text-dark text-sm font-weight-bold">
                          {{ item.title }}
                        </h6>
                        <span class="text-sm text-body">
                          {{ item.date }}
                        </span>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </div>
          </v-card>

          <v-card class="card-shadow border-radius-xl bg-gradient-default mt-6">
            <div class="px-4 pt-4">
              <v-row>
                <v-col cols="7">
                  <h6 class="text-white text-h6 font-weight-bold mb-0">
                    Productivity
                  </h6>
                  <p class="text-sm text-white">
                    <i
                      class="fa fa-arrow-up text-success me-1"
                      aria-hidden="true"
                    ></i>
                    <span class="font-weight-bold">4% more</span> in 2021
                  </p>
                </v-col>
                <v-col cols="5" class="text-end">
                  <v-menu
                    transition="slide-y-transition"
                    offset-y
                    offset-x
                    min-width="150"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        :ripple="false"
                        class="text-white"
                        v-bind="attrs"
                        v-on="on"
                        small
                      >
                        <v-icon size="16">fas fa-ellipsis-h</v-icon>
                      </v-btn>
                    </template>

                    <v-list class="py-4">
                      <v-list-item class="list-item-hover-active mb-1">
                        <v-list-item-content class="pa-0">
                          <v-list-item-title
                            class="text-secondary ls-0 font-weight-600 mb-0"
                          >
                            Action
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item class="list-item-hover-active mb-1">
                        <v-list-item-content class="pa-0">
                          <v-list-item-title
                            class="text-secondary ls-0 font-weight-600 mb-0"
                          >
                            Another action
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item class="list-item-hover-active">
                        <v-list-item-content class="pa-0">
                          <v-list-item-title
                            class="text-secondary ls-0 font-weight-600 mb-0"
                          >
                            Something else here
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>
              </v-row>
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
      </v-row>
    </v-container>
  </div>
</template>
<script>
import CalendarWidget from "./Widgets/CalendarWidget.vue";
import Chart from "chart.js/auto";

export default {
  name: "Calendar",
  components: {
    CalendarWidget,
  },
  data: function () {
    return {
      lineChartId: "chart-line-1",
      avatars: [
        {
          image: require("@/assets/img/team-1.jpg"),
          name: "Elena Morison",
        },
        {
          image: require("@/assets/img/team-2.jpg"),
          name: "Ryan Milly",
        },
        {
          image: require("@/assets/img/team-3.jpg"),
          name: "Nick Daniel",
        },
        {
          image: require("@/assets/img/team-4.jpg"),
          name: "Peterson",
        },
        {
          image: require("@/assets/img/team-5.jpg"),
          name: "Milla",
        },
      ],
      events: [
        {
          icon: "ni ni-money-coins",
          iconColor: "danger",
          color: "#fff8f8",
          title: "Cyber Week",
          date: "27 March 2021, at 12:30 PM",
        },
        {
          icon: "ni ni-bell-55",
          iconColor: "primary",
          color: "#fbf8fd",
          title: "Meeting with Marry",
          date: "24 March 2021, at 10:00 PM",
        },
        {
          icon: "ni ni-books",
          iconColor: "success",
          color: "#f9fcf8",
          title: "Book Deposit Hall",
          date: "25 March 2021, at 9:30 AM",
        },
        {
          icon: "ni ni-delivery-fast",
          iconColor: "warning",
          color: "#fff9f9",
          title: "Shipment Deal UK",
          date: "25 March 2021, at 2:00 PM",
        },
        {
          icon: "ni ni-palette",
          iconColor: "info",
          color: "#f7faff",
          title: "Verify Dashboard Color Palette",
          date: "26 March 2021, at 9:00 AM",
        },
      ],
    };
  },
  mounted() {
    var ctx = document.getElementById(this.lineChartId).getContext("2d");

    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(255,255,255,0.3)");
    gradientStroke.addColorStop(0.2, "rgba(72,72,176,0.0)");
    gradientStroke.addColorStop(0, "rgba(203,12,159,0)"); //purple colors

    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Visitors",
            tension: 0.5,
            borderWidth: 2,
            pointRadius: 0,
            borderColor: "#fff",
            backgroundColor: gradientStroke,
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
