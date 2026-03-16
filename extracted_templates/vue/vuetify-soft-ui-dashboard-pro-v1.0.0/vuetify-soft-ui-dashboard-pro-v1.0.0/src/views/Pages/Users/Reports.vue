<template>
  <v-container fluid class="py-6">
    <v-row>
      <v-col md="6">
        <v-row>
          <v-col md="6" cols="12">
            <v-card
              class="border-radius-xl"
              :style="`background-image: url(${require('@/assets/img/curved-images/white-curved.jpeg')}); background-size: cover;`"
            >
              <span
                class="mask bg-gradient-default opacity-9 border-radius-xl"
              ></span>
              <div class="px-4 py-4 position-relative">
                <v-row>
                  <v-col cols="8" class="text-start">
                    <v-avatar color="bg-white" class="shadow" rounded>
                      <v-icon size="18">
                        ni ni-circle-08 text-default text-gradient
                      </v-icon>
                    </v-avatar>
                    <h5 class="text-white text-h5 font-weight-bolder mb-0 mt-5">
                      1600
                    </h5>
                    <span class="text-white text-sm">Users Active</span>
                  </v-col>
                  <v-col cols="4" class="text-end">
                    <v-menu
                      transition="slide-y-transition"
                      offset-y
                      offset-x
                      min-width="150"
                      class="me-6"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          :ripple="false"
                          class="text-white mb-16"
                          v-bind="attrs"
                          v-on="on"
                          small
                        >
                          <v-icon size="16">fas fa-ellipsis-h</v-icon>
                        </v-btn>
                      </template>

                      <v-list class="py-0">
                        <v-list-item class="list-item-hover-active">
                          <v-list-item-content class="pa-0">
                            <v-list-item-title
                              class="ls-0 text-body font-weight-600 mb-0"
                            >
                              Action
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item class="list-item-hover-active">
                          <v-list-item-content class="pa-0">
                            <v-list-item-title
                              class="ls-0 text-body font-weight-600 mb-0"
                            >
                              Another action
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item class="list-item-hover-active">
                          <v-list-item-content class="pa-0">
                            <v-list-item-title
                              class="ls-0 text-body font-weight-600 mb-0"
                            >
                              Something else here
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                    <p
                      class="
                        text-white text-sm text-end
                        font-weight-bolder
                        mt-auto
                        mb-0
                      "
                    >
                      +55%
                    </p>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-col>
          <v-col md="6" cols="12">
            <v-card
              class="border-radius-xl"
              :style="`background-image: url(${require('@/assets/img/curved-images/white-curved.jpeg')}); background-size: cover;`"
            >
              <span
                class="mask bg-gradient-default opacity-9 border-radius-xl"
              ></span>
              <div class="px-4 py-4 position-relative">
                <v-row>
                  <v-col cols="8" class="text-start">
                    <v-avatar color="bg-white" class="shadow" rounded>
                      <v-icon size="18">
                        ni ni-active-40 text-default text-gradient
                      </v-icon>
                    </v-avatar>
                    <h5 class="text-white text-h5 font-weight-bolder mb-0 mt-5">
                      357
                    </h5>
                    <span class="text-white text-sm">Click Events</span>
                  </v-col>
                  <v-col cols="4" class="text-end">
                    <v-menu
                      transition="slide-y-transition"
                      offset-y
                      offset-x
                      min-width="150"
                      class="me-6"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          :ripple="false"
                          class="text-white mb-16"
                          v-bind="attrs"
                          v-on="on"
                          small
                        >
                          <v-icon size="16">fas fa-ellipsis-h</v-icon>
                        </v-btn>
                      </template>

                      <v-list class="py-0">
                        <v-list-item class="list-item-hover-active">
                          <v-list-item-content class="pa-0">
                            <v-list-item-title
                              class="ls-0 text-body font-weight-600 mb-0"
                            >
                              Action
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item class="list-item-hover-active">
                          <v-list-item-content class="pa-0">
                            <v-list-item-title
                              class="ls-0 text-body font-weight-600 mb-0"
                            >
                              Another action
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item class="list-item-hover-active">
                          <v-list-item-content class="pa-0">
                            <v-list-item-title
                              class="ls-0 text-body font-weight-600 mb-0"
                            >
                              Something else here
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                    <p
                      class="
                        text-white text-sm text-end
                        font-weight-bolder
                        mt-auto
                        mb-0
                      "
                    >
                      +124%
                    </p>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="6" cols="12">
            <v-card
              class="border-radius-xl"
              :style="`background-image: url(${require('@/assets/img/curved-images/white-curved.jpeg')}); background-size: cover;`"
            >
              <span
                class="mask bg-gradient-default opacity-9 border-radius-xl"
              ></span>
              <div class="px-4 py-4 position-relative">
                <v-row>
                  <v-col cols="8" class="text-start">
                    <v-avatar color="bg-white" class="shadow" rounded>
                      <v-icon size="18">
                        ni ni-cart text-default text-gradient
                      </v-icon>
                    </v-avatar>
                    <h5 class="text-white text-h5 font-weight-bolder mb-0 mt-5">
                      2300
                    </h5>
                    <span class="text-white text-sm">Purchases</span>
                  </v-col>
                  <v-col cols="4" class="text-end">
                    <v-menu
                      transition="slide-y-transition"
                      offset-y
                      offset-x
                      min-width="150"
                      class="me-6"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          :ripple="false"
                          class="text-white mb-16"
                          v-bind="attrs"
                          v-on="on"
                          small
                        >
                          <v-icon size="16">fas fa-ellipsis-h</v-icon>
                        </v-btn>
                      </template>

                      <v-list class="py-0">
                        <v-list-item class="list-item-hover-active">
                          <v-list-item-content class="pa-0">
                            <v-list-item-title
                              class="ls-0 text-body font-weight-600 mb-0"
                            >
                              Action
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item class="list-item-hover-active">
                          <v-list-item-content class="pa-0">
                            <v-list-item-title
                              class="ls-0 text-body font-weight-600 mb-0"
                            >
                              Another action
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item class="list-item-hover-active">
                          <v-list-item-content class="pa-0">
                            <v-list-item-title
                              class="ls-0 text-body font-weight-600 mb-0"
                            >
                              Something else here
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                    <p
                      class="
                        text-white text-sm text-end
                        font-weight-bolder
                        mt-auto
                        mb-0
                      "
                    >
                      +15%
                    </p>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-col>
          <v-col md="6" cols="12">
            <v-card
              class="border-radius-xl"
              :style="`background-image: url(${require('@/assets/img/curved-images/white-curved.jpeg')}); background-size: cover;`"
            >
              <span
                class="mask bg-gradient-default opacity-9 border-radius-xl"
              ></span>
              <div class="px-4 py-4 position-relative">
                <v-row>
                  <v-col cols="8" class="text-start">
                    <v-avatar color="bg-white" class="shadow" rounded>
                      <v-icon size="18">
                        ni ni-like-2 text-default text-gradient
                      </v-icon>
                    </v-avatar>
                    <h5 class="text-white text-h5 font-weight-bolder mb-0 mt-5">
                      940
                    </h5>
                    <span class="text-white text-sm">Likes</span>
                  </v-col>
                  <v-col cols="4" class="text-end">
                    <v-menu
                      transition="slide-y-transition"
                      offset-y
                      offset-x
                      min-width="150"
                      class="me-6"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          :ripple="false"
                          class="text-white mb-16"
                          v-bind="attrs"
                          v-on="on"
                          small
                        >
                          <v-icon size="16">fas fa-ellipsis-h</v-icon>
                        </v-btn>
                      </template>

                      <v-list class="py-0">
                        <v-list-item class="list-item-hover-active">
                          <v-list-item-content class="pa-0">
                            <v-list-item-title
                              class="ls-0 text-body font-weight-600 mb-0"
                            >
                              Action
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item class="list-item-hover-active">
                          <v-list-item-content class="pa-0">
                            <v-list-item-title
                              class="ls-0 text-body font-weight-600 mb-0"
                            >
                              Another action
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item class="list-item-hover-active">
                          <v-list-item-content class="pa-0">
                            <v-list-item-title
                              class="ls-0 text-body font-weight-600 mb-0"
                            >
                              Something else here
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                    <p
                      class="
                        text-white text-sm text-end
                        font-weight-bolder
                        mt-auto
                        mb-0
                      "
                    >
                      +90%
                    </p>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col lg="6" cols="12">
        <v-card class="card-shadow border-radius-xl h-100">
          <div class="px-4 pt-4">
            <h6 class="mb-0 text-h6 text-typo font-weight-bold">Reviews</h6>
          </div>
          <div class="px-4 pt-4">
            <v-list>
              <v-list-item-group class="border-radius-sm">
                <v-list-item :ripple="false" class="px-0 border-radius-sm mb-4">
                  <v-list-item-content class="py-0">
                    <div class="d-flex mb-2">
                      <span
                        class="
                          me-2
                          text-sm
                          font-weight-bold
                          text-capitalize text-body
                        "
                        >Positive reviews</span
                      >
                      <span class="ms-auto text-sm font-weight-bold text-body"
                        >80%</span
                      >
                    </div>
                    <div>
                      <v-progress-linear
                        value="80"
                        height="6"
                        rounded
                        background-color="#e9ecef"
                        color="#2152ff"
                      ></v-progress-linear>
                    </div>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item :ripple="false" class="px-0 border-radius-sm mb-4">
                  <v-list-item-content class="py-0">
                    <div class="d-flex mb-2">
                      <span
                        class="
                          me-2
                          text-sm
                          font-weight-bold
                          text-capitalize text-body
                        "
                        >Neutral Reviews</span
                      >
                      <span class="ms-auto text-sm font-weight-bold text-body"
                        >17%</span
                      >
                    </div>
                    <div>
                      <v-progress-linear
                        value="17"
                        height="6"
                        rounded
                        background-color="#e9ecef"
                        color="#141727"
                      ></v-progress-linear>
                    </div>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item :ripple="false" class="px-0 border-radius-sm mb-4">
                  <v-list-item-content class="py-0">
                    <div class="d-flex mb-2">
                      <span
                        class="
                          me-2
                          text-sm
                          font-weight-bold
                          text-capitalize text-body
                        "
                        >Negative reviews</span
                      >
                      <span class="ms-auto text-sm font-weight-bold text-body"
                        >3%</span
                      >
                    </div>
                    <div>
                      <v-progress-linear
                        value="3"
                        height="6"
                        rounded
                        background-color="#e9ecef"
                        color="#ea0606"
                      ></v-progress-linear>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
          <div class="px-4 pb-4 d-flex align-center mt-8">
            <div class="w-60">
              <p class="text-sm text-body">
                More than <b>1,500,000</b> developers used Creative Tim's
                products and over <b>700,000</b> projects were created.
              </p>
            </div>
            <div class="w-40 text-end">
              <v-btn
                color="#cb0c9f"
                class="
                  font-weight-bolder
                  btn-default
                  bg-gradient-default
                  py-5
                  px-4
                "
                small
              >
                View all reviews
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <reports-table></reports-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ReportsTable from "./Widgets/ReportsTable.vue";

export default {
  name: "Dashboard",
  components: {
    ReportsTable,
  },
};
</script>
