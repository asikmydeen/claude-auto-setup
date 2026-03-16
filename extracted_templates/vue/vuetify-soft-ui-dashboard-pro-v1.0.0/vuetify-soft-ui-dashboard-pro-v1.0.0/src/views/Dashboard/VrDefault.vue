<template>
  <div class="transform-scale-6 ms-n7">
    <v-container fluid class="px-6 py-6 mt-16">
      <v-row class="position-relative z-index-2 mt-16 pt-16">
        <v-col md="7">
          <v-card class="bg-transparent mb-6 px-4 py-4">
            <v-row>
              <v-col lg="6">
                <h2 class="text-h2 text-typo font-weight-bolder mb-2">
                  General Statistics
                </h2>
                <div class="d-flex align-center">
                  <h6 class="font-weight-bolder mb-0 text-h6 text-typo">
                    All users
                  </h6>
                  <a
                    class="
                      text-primary text-sm
                      font-weight-bold
                      mb-0
                      icon-move-right
                      ms-4
                      mt-1
                      text-decoration-none
                    "
                    href="javascript:;"
                  >
                    Read More
                    <i
                      class="fas fa-arrow-right text-sm ms-1"
                      aria-hidden="true"
                    ></i>
                  </a>
                </div>
                <h1 class="font-weight-bolder text-h1 mb-0 text-typo">
                  1,600,000
                </h1>
              </v-col>
            </v-row>
          </v-card>
          <v-row>
            <v-col sm="4">
              <v-card class="mb-6 card-shadow border-radius-xl px-4 py-4">
                <v-row no-gutters>
                  <v-col sm="8">
                    <p
                      class="
                        text-sm
                        mb-0
                        text-capitalize
                        font-weight-bold
                        text-body
                      "
                    >
                      Today's Money
                    </p>
                    <h5 class="text-h5 text-typo font-weight-bolder mb-0">
                      $53,000
                      <span class="text-success text-sm font-weight-bolder"
                        >+55%</span
                      >
                    </h5>
                  </v-col>
                  <v-col sm="4" class="text-end">
                    <v-avatar
                      color="bg-gradient-primary"
                      class="shadow"
                      rounded
                    >
                      <v-icon size="20" class="text-white">
                        ni ni-money-coins
                      </v-icon>
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card>

              <v-card class="card-shadow border-radius-xl px-4 py-4">
                <v-row no-gutters>
                  <v-col sm="8">
                    <p
                      class="
                        text-sm
                        mb-0
                        text-capitalize
                        font-weight-bold
                        text-body
                      "
                    >
                      Today's Users
                    </p>
                    <h5 class="text-h5 text-typo font-weight-bolder mb-0">
                      $2,300
                      <span class="text-success text-sm font-weight-bolder"
                        >+3%</span
                      >
                    </h5>
                  </v-col>
                  <v-col sm="4" class="text-end">
                    <v-avatar
                      color="bg-gradient-primary"
                      class="shadow"
                      rounded
                    >
                      <v-icon size="20" class="text-white">
                        ni ni-world
                      </v-icon>
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>

            <v-col sm="4">
              <v-card class="mb-6 card-shadow border-radius-xl px-4 py-4">
                <v-row no-gutters>
                  <v-col sm="8">
                    <p
                      class="
                        text-sm
                        mb-0
                        text-capitalize
                        font-weight-bold
                        text-body
                      "
                    >
                      New Clients
                    </p>
                    <h5 class="text-h5 text-typo font-weight-bolder mb-0">
                      +3,462
                      <span class="text-danger text-sm font-weight-bolder"
                        >-2%</span
                      >
                    </h5>
                  </v-col>
                  <v-col sm="4" class="text-end">
                    <v-avatar
                      color="bg-gradient-primary"
                      class="shadow"
                      rounded
                    >
                      <v-icon size="20" class="text-white">
                        ni ni-paper-diploma
                      </v-icon>
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card>

              <v-card class="card-shadow border-radius-xl px-4 py-4">
                <v-row no-gutters>
                  <v-col sm="8">
                    <p
                      class="
                        text-sm
                        mb-0
                        text-capitalize
                        font-weight-bold
                        text-body
                      "
                    >
                      Sales
                    </p>
                    <h5 class="text-h5 text-typo font-weight-bolder mb-0">
                      $103,430
                      <span class="text-success text-sm font-weight-bolder"
                        >+5%</span
                      >
                    </h5>
                  </v-col>
                  <v-col sm="4" class="text-end">
                    <v-avatar
                      color="bg-gradient-primary"
                      class="shadow"
                      rounded
                    >
                      <v-icon size="20" class="text-white"> ni ni-cart </v-icon>
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <sales-country></sales-country>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <widget-globe></widget-globe>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SalesCountry from "./Widgets/SalesCountry.vue";
import WidgetGlobe from "./Widgets/Globe.vue";

export default {
  name: "Vr-default",
  components: {
    SalesCountry,
    WidgetGlobe,
  },
};
</script>
