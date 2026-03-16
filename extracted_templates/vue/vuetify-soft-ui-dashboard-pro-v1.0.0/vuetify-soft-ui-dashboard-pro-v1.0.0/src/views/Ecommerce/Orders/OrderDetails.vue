<template>
  <div>
    <v-container fluid class="py-6">
      <v-row>
        <v-col lg="8" class="mx-auto">
          <v-card class="card-shadow border-radius-xl">
            <div class="px-4 pt-4">
              <div class="d-flex align-center">
                <div>
                  <h6 class="text-h6 text-typo font-weight-bold mb-2">
                    Order Details
                  </h6>
                  <p class="text-sm text-body mb-0">
                    Order no. <b>241342</b> from <b>23.02.2021</b>
                  </p>
                  <p class="text-sm text-body">Code: <b>KF332</b></p>
                </div>
                <v-btn
                  elevation="0"
                  :ripple="false"
                  height="43"
                  class="
                    font-weight-bold
                    text-uppercase
                    btn-default
                    bg-gradient-secondary
                    py-2
                    px-6
                    me-2
                    ms-auto
                  "
                  color="#5e72e4"
                  small
                  >Invoice</v-btn
                >
              </div>
            </div>
            <div class="px-4 pb-4">
              <hr class="horizontal dark mt-0 mb-6" />
              <v-row>
                <v-col md="6">
                  <div class="d-flex">
                    <v-avatar
                      class="me-4 border-radius-lg"
                      alt="product-image"
                      width="110px"
                      height="110px"
                    >
                      <v-img
                        src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
                      >
                      </v-img>
                    </v-avatar>
                    <div>
                      <h6
                        class="
                          text-h6 text-typo text-lg
                          font-weight-bold
                          mb-0
                          mt-2
                          mb-1
                        "
                      >
                        Gold Glasses
                      </h6>
                      <p class="text-sm text-body mb-3">
                        Order was delivered 2 days ago.
                      </p>
                      <v-btn
                        elevation="0"
                        small
                        :ripple="false"
                        height="21"
                        class="
                          border-radius-sm
                          bg-gradient-success
                          text-xxs
                          font-weight-bolder
                          px-3
                          py-2
                          badge-font-size
                          ms-auto
                          text-white
                        "
                        color="#cdf59b"
                        >Delivered</v-btn
                      >
                    </div>
                  </div>
                </v-col>
                <v-col md="6" class="text-end my-auto">
                  <v-btn
                    elevation="0"
                    :ripple="false"
                    height="43"
                    class="
                      font-weight-bold
                      text-uppercase
                      btn-default
                      bg-gradient-info
                      py-2
                      px-6
                      me-2
                      ms-auto
                    "
                    color="#5e72e4"
                    small
                    >Contact us</v-btn
                  >
                  <p class="text-sm text-body mt-2 mb-0">
                    Do you like the product? Leave us a review
                    <a
                      href="javascript:;"
                      class="text-dark text-decoration-none"
                      >here</a
                    >.
                  </p>
                </v-col>
              </v-row>
              <hr class="horizontal dark my-6" />
              <v-row>
                <v-col lg="3" md="6">
                  <h6 class="text-h6 text-typo font-weight-bold mb-4">
                    Track order
                  </h6>
                  <v-timeline dense align-top class="timeline-line-color">
                    <v-timeline-item
                      v-for="(item, i) in timeline"
                      :key="item.title + i"
                      small
                      class="timeline"
                    >
                      <template v-slot:icon>
                        <v-avatar size="26" color="#ffffff">
                          <v-icon
                            :class="`text-gradient text-` + item.btn"
                            size="16"
                            >{{ item.icon }}</v-icon
                          >
                        </v-avatar>
                      </template>

                      <v-card width="480">
                        <v-card-title class="px-0 pt-0 pb-1 d-block">
                          <h6
                            class="
                              text-dark text-sm
                              font-weight-bold
                              mb-0
                              d-block
                            "
                          >
                            {{ item.title }}
                          </h6>
                          <p
                            class="text-secondary font-weight-bold text-xs mb-0"
                          >
                            {{ item.date }}
                          </p>
                        </v-card-title>
                      </v-card>
                    </v-timeline-item>
                  </v-timeline>
                </v-col>
                <v-col lg="5" md="6">
                  <h6 class="text-h6 text-typo font-weight-bold mb-3">
                    Payment details
                  </h6>
                  <div class="pa-5 border border-radius-lg d-flex align-center">
                    <v-avatar size="36" rounded class="me-4">
                      <v-img
                        src="@/assets/img/logos/mastercard.png"
                        alt="logo"
                        max-width="80"
                        contain
                      ></v-img>
                    </v-avatar>
                    <h6 class="mb-0 text-h6 text-typo mt-2">
                      ****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;7852
                    </h6>
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          small
                          rounded
                          v-bind="attrs"
                          v-on="on"
                          min-width="25"
                          elevation="0"
                          :ripple="false"
                          height="25"
                          width="25"
                          class="
                            font-weight-600
                            text-capitalize
                            btn-outline-secondary
                            py-3
                            px-3
                            ms-auto
                          "
                          color="transparent"
                        >
                          <v-icon size="8">fas fa-info</v-icon>
                        </v-btn>
                      </template>
                      <span>We do not store card details</span>
                    </v-tooltip>
                  </div>
                  <h6 class="text-h6 text-typo font-weight-bold mb-4 mt-6">
                    Billing Information
                  </h6>
                  <div
                    class="d-flex flex-column bg-gray-100 pa-6 border-radius-lg"
                  >
                    <h6 class="text-typo font-weight-bold mb-4 text-sm">
                      Oliver Liam
                    </h6>
                    <span class="mb-2 text-body text-xs"
                      >Company Name:
                      <span class="text-dark font-weight-bold ms-2"
                        >Viking Burrito</span
                      ></span
                    >
                    <span class="mb-2 text-body text-xs"
                      >Email Address:
                      <span class="text-dark ms-2 font-weight-bold"
                        >oliver@burrito.com</span
                      ></span
                    >
                    <span class="text-xs text-body"
                      >VAT Number:
                      <span class="text-dark ms-2 font-weight-bold"
                        >FRB1235476</span
                      ></span
                    >
                  </div>
                </v-col>
                <v-col lg="3" class="ms-auto">
                  <h6 class="text-h6 text-typo font-weight-bold mb-3">
                    Order Summary
                  </h6>
                  <div class="d-flex">
                    <span class="mb-2 text-body text-sm"> Product Price: </span>
                    <span class="text-dark font-weight-bold ms-auto">$90</span>
                  </div>
                  <div class="d-flex">
                    <span class="mb-2 text-body text-sm"> Delivery: </span>
                    <span class="text-dark font-weight-bold ms-auto">$14</span>
                  </div>
                  <div class="d-flex">
                    <span class="mb-2 text-body text-sm"> Taxes: </span>
                    <span class="text-dark font-weight-bold ms-auto"
                      >$1.95</span
                    >
                  </div>
                  <div class="d-flex mt-6">
                    <span class="mb-2 text-body text-lg"> Total: </span>
                    <span
                      class="text-dark text-lg ms-2 font-weight-bold ms-auto"
                      >$105.95</span
                    >
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      timeline: [
        {
          title: "Order received",
          date: "22 DEC 7:20 PM",
          color: "#b0eed3",
          iconColor: "#1aae6f",
          icon: "ni-bell-55",
          btn: "secondary",
        },
        {
          title: "Generate order id #1832412",
          date: "22 DEC 7:21 AM",
          color: "#b0eed3",
          iconColor: "#1aae6f",
          icon: "ni-html5",
          btn: "secondary",
        },
        {
          title: "Order transmited to courier",
          date: "22 DEC 8:10 AM",
          color: "#b0eed3",
          iconColor: "#1aae6f",
          icon: "ni-cart",
          btn: "secondary",
        },
        {
          title: "Order delivered",
          date: "22 DEC 4:54 PM",
          color: "#b0eed3",
          iconColor: "#1aae6f",
          icon: "ni-check-bold",
          btn: "success",
        },
      ],
    };
  },
};
</script>
