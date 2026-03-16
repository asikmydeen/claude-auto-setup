<template>
  <div>
    <v-container fluid class="py-8">
      <v-row>
        <v-col cols="12">
          <v-card class="card-shadow border-radius-xl">
            <div class="card-padding">
              <h5 class="text-h5 text-typo font-weight-bold mb-6">
                Product Details
              </h5>
              <v-row>
                <v-col lg="5" md="6" class="text-center">
                  <v-img
                    class="w-100 border-radius-lg shadow-lg mx-auto"
                    src="https://images.unsplash.com/photo-1616627781431-23b776aad6b2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1884&q=80"
                  >
                  </v-img>
                  <div class="mt-8 overflow-scroll">
                    <Photoswipe>
                      <img
                        class="me-2"
                        :src="'https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/chair-pink.jpg'"
                        v-pswp="
                          'https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/chair-pink.jpg'
                        "
                      />
                      <img
                        class="me-2"
                        :src="'https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/black-chair.jpg'"
                        v-pswp="
                          'https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/black-chair.jpg'
                        "
                      />
                      <img
                        class="me-2"
                        :src="'https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/chair-steel.jpg'"
                        v-pswp="
                          'https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/chair-steel.jpg'
                        "
                      />
                      <img
                        class="me-2"
                        :src="'https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/chair-wood.jpg'"
                        v-pswp="
                          'https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/chair-wood.jpg'
                        "
                      />
                    </Photoswipe>
                  </div>
                </v-col>
                <v-col lg="5" class="mx-auto">
                  <h3 class="text-h3 text-typo font-weight-bold mt-lg-0 mt-4">
                    Minimal Bar Stool
                  </h3>
                  <div class="rating">
                    <i
                      class="fas fa-star text-body me-1"
                      aria-hidden="true"
                    ></i>
                    <i
                      class="fas fa-star text-body me-1"
                      aria-hidden="true"
                    ></i>
                    <i
                      class="fas fa-star text-body me-1"
                      aria-hidden="true"
                    ></i>
                    <i
                      class="fas fa-star text-body me-1"
                      aria-hidden="true"
                    ></i>
                    <i
                      class="fas fa-star-half-alt text-body me-1"
                      aria-hidden="true"
                    ></i>
                  </div>
                  <br />
                  <h6 class="text-h6 text-typo mb-0 mt-4 font-weight-bold">
                    Price
                  </h6>
                  <h5 class="text-h5 text-typo mb-1 font-weight-bold">
                    $1,419
                  </h5>
                  <v-btn
                    elevation="0"
                    small
                    :ripple="false"
                    height="21"
                    class="
                      border-radius-md
                      font-weight-bolder
                      px-3
                      py-3
                      badge-font-size
                      ms-auto
                      text-success
                    "
                    color="#cdf59b"
                    >IN STOCK</v-btn
                  >
                  <br />
                  <br />
                  <label class="text-xs text-typo font-weight-bolder ms-1 mt-6"
                    >Description</label
                  >
                  <ul class="text-body mt-2">
                    <li>
                      The most beautiful curves of this swivel stool adds an
                      elegant touch to any environment
                    </li>
                    <li>
                      Memory swivel seat returns to original seat position
                    </li>
                    <li>
                      Comfortable integrated layered chair seat cushion design
                    </li>
                    <li>Fully assembled! No assembly required</li>
                  </ul>
                  <v-row class="mt-6">
                    <v-col lg="5">
                      <label class="text-xs text-typo font-weight-bolder ms-1"
                        >Frame Material</label
                      >
                      <v-select
                        :items="materials"
                        value="Wood"
                        color="rgba(0,0,0,.6)"
                        class="
                          input-style
                          font-size-input
                          text-light-input
                          placeholder-light
                          border-radius-md
                          select-style
                          mt-2
                          mb-0
                        "
                        outlined
                        single-line
                        height="36"
                      >
                      </v-select>
                    </v-col>
                    <v-col lg="5">
                      <label class="text-xs text-typo font-weight-bolder ms-1"
                        >Colors</label
                      >
                      <v-select
                        :items="colors"
                        value="Black"
                        color="rgba(0,0,0,.6)"
                        class="
                          input-style
                          font-size-input
                          text-light-input
                          placeholder-light
                          border-radius-md
                          select-style
                          mt-2
                          mb-0
                        "
                        outlined
                        single-line
                        height="36"
                      >
                      </v-select>
                    </v-col>
                    <v-col lg="2">
                      <label class="text-xs text-typo font-weight-bolder ms-1"
                        >Quantity</label
                      >
                      <v-select
                        :items="numbers"
                        value="1"
                        color="rgba(0,0,0,.6)"
                        class="
                          input-style
                          font-size-input
                          text-light-input
                          placeholder-light
                          border-radius-md
                          select-style
                          mt-2
                          mb-0
                        "
                        outlined
                        single-line
                        height="36"
                      >
                      </v-select>
                    </v-col>
                  </v-row>
                  <v-row class="mt-0">
                    <v-col>
                      <v-btn
                        elevation="0"
                        :ripple="false"
                        height="43"
                        class="
                          font-weight-bold
                          text-uppercase
                          btn-default
                          bg-gradient-primary
                          py-2
                          px-6
                          me-2
                        "
                        color="#5e72e4"
                        small
                        >Add to cart</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row class="mt-8">
                <v-col cols="12">
                  <h5 class="text-h5 text-typo font-weight-bold ms-4">
                    Other Products
                  </h5>
                  <table-products></table-products>
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
import Vue from "vue";
import Photoswipe from "vue-pswipe";
Vue.use(Photoswipe);

import TableProducts from "./Widgets/TableProducts.vue";

export default {
  name: "Product-Page",
  components: {
    TableProducts,
  },
  data() {
    return {
      materials: ["Wood", "Aluminium", "Leather"],
      colors: ["White", "Black", "Gray"],
      numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    };
  },
};
</script>
