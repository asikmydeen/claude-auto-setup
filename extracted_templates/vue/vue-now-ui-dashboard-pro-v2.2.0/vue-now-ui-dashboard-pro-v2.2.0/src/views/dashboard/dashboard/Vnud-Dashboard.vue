<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card card-stats card-raised">
          <div class="card-body">
            <div class="row">
              <div class="col-md-3">
                <div class="statistics">
                  <div class="info">
                    <div class="icon icon-primary">
                      <i class="now-ui-icons ui-2_chat-round"></i>
                    </div>
                    <h3 class="info-title">
                      <animated-number :value="853"></animated-number>
                    </h3>
                    <h6 class="stats-title">Messages</h6>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="statistics">
                  <div class="info">
                    <div class="icon icon-success">
                      <i class="now-ui-icons business_money-coins"></i>
                    </div>
                    <h3 class="info-title">
                      <small>$</small>
                      <animated-number :value="3521"></animated-number>
                    </h3>
                    <h6 class="stats-title">Today Revenue</h6>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="statistics">
                  <div class="info">
                    <div class="icon icon-info">
                      <i class="now-ui-icons users_single-02"></i>
                    </div>
                    <h3 class="info-title">
                      <animated-number :value="562"></animated-number>
                    </h3>
                    <h6 class="stats-title">Customers</h6>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="statistics">
                  <div class="info">
                    <div class="icon icon-danger">
                      <i class="now-ui-icons objects_support-17"></i>
                    </div>
                    <h3 class="info-title">
                      <animated-number :value="353"></animated-number>
                    </h3>
                    <h6 class="stats-title">Support Requests</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-4">
        <vnud-card class="card-chart" no-footer-line>
          <template v-slot:header>
            <div>
              <h5 class="card-category">Active Users</h5>
              <h2 class="card-title">
                <animated-number :value="34252"> </animated-number>
              </h2>
              <drop-down :hide-arrow="true" position="right">
                <template v-slot:title>
                  <n-button
                    class="dropdown-toggle no-caret"
                    type="outline-default"
                    round
                    icon
                  >
                    <i class="now-ui-icons loader_gear"></i>
                  </n-button>
                </template>

                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
                <a class="dropdown-item text-danger" href="#">Remove Data</a>
              </drop-down>
            </div>
          </template>
          <div class="chart-area">
            <canvas :id="activeUsersChartID"></canvas>
          </div>
          <div class="table-responsive">
            <n-table :data="tableData">
              <template v-slot:default="row">
                <td>
                  <div class="flag">
                    <img :src="row.item.flag" />
                  </div>
                </td>
                <td>{{ row.item.country }}</td>
                <td class="text-right">
                  {{ row.item.value }}
                </td>
                <td class="text-right">
                  {{ row.item.percentage }}
                </td>
              </template>
            </n-table>
          </div>

          <template v-slot:footer>
            <div class="stats">
              <i class="now-ui-icons arrows-1_refresh-69"></i> Just Updated
            </div>
          </template>
        </vnud-card>
      </div>

      <div class="col-lg-4">
        <vnud-card class="card-chart" no-footer-line>
          <template v-slot:header>
            <div>
              <h5 class="card-category">Summer Email Campaign</h5>
              <h2 class="card-title">
                <animated-number :value="55300"> </animated-number>
              </h2>
              <drop-down position="right">
                <template v-slot:title>
                  <n-button
                    class="dropdown-toggle no-caret"
                    round
                    type="outline-default"
                    icon
                  >
                    <i class="now-ui-icons loader_gear"></i>
                  </n-button>
                </template>

                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
                <a class="dropdown-item text-danger" href="#">Remove Data</a>
              </drop-down>
            </div>
          </template>

          <div class="chart-area">
            <canvas :id="emailsCampaignChartID"></canvas>
          </div>
          <div class="card-progress">
            <n-progress
              label="Delivery Rate"
              :value="90"
              show-value
            ></n-progress>
            <n-progress
              type="success"
              label="Open Rate"
              :value="60"
              show-value
            ></n-progress>
            <n-progress
              type="info"
              label="Click Rate"
              :value="12"
              show-value
            ></n-progress>
            <n-progress
              type="warning"
              label="Hard Bounce"
              :value="5"
              show-value
            ></n-progress>
            <n-progress
              type="danger"
              label="Spam Report"
              :value="0.11"
              show-value
            ></n-progress>
          </div>

          <template v-slot:footer>
            <div class="stats">
              <i class="now-ui-icons arrows-1_refresh-69"></i> Just Updated
            </div>
          </template>
        </vnud-card>
      </div>

      <div class="col-lg-4">
        <vnud-card class="card-chart" no-footer-line>
          <template v-slot:header>
            <div>
              <h5 class="card-category">Active Countries</h5>
              <h2 class="card-title">
                <animated-number :value="105"> </animated-number>
              </h2>
            </div>
          </template>

          <div class="chart-area">
            <canvas :id="activeCountriesChartID"></canvas>
          </div>

          <async-world-map class="map" :data="mapData"></async-world-map>

          <template v-slot:footer>
            <div class="stats">
              <i class="now-ui-icons arrows-1_refresh-69"></i> Just Updated
            </div>
          </template>
        </vnud-card>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <vnud-card>
          <template v-slot:header>
            <h4 class="card-title">Best Selling Products</h4>
          </template>

          <div class="table-responsive">
            <n-table class="table-shopping" :data="productsTable">
              <template v-slot:columns>
                <th class="text-center"></th>
                <th>Product</th>
                <th>Color</th>
                <th>Size</th>
                <th class="text-right">Price</th>
                <th class="text-right">Qty</th>
                <th class="text-right">Amount</th>
              </template>
              <template v-slot:default="row">
                <td>
                  <div class="img-container">
                    <img :src="row.item.image" alt="..." />
                  </div>
                </td>
                <td class="td-name">
                  <a href="#jacket">{{ row.item.title }}</a>
                  <br />
                  <small>{{ row.item.subTitle }}</small>
                </td>
                <td>{{ row.item.color }}</td>
                <td>{{ row.item.size }}</td>
                <td class="td-number">
                  <small>€</small>
                  {{ row.item.price }}
                </td>
                <td class="td-number">
                  {{ row.item.quantity }}
                </td>
                <td class="td-number">
                  <small>€</small>
                  {{ row.item.amount }}
                </td>
              </template>
              <template v-slot:summary-row>
                <td colspan="5"></td>
                <td class="td-total">Total</td>
                <td class="td-price">
                  <small>€</small>
                  2,346
                </td>
              </template>
            </n-table>
          </div>
        </vnud-card>
      </div>
    </div>
  </div>
</template>
<script>
import {
  VnudCard,
  Table as NTable,
  AnimatedNumber,
  Progress as NProgress,
  AsyncWorldMap,
} from "@/components";

import {
  activeUsersChart,
  emailsCampaignChart,
  activeCountriesChart,
} from "@/components/Charts/LineChart";

export default {
  components: {
    VnudCard,
    NTable,
    AnimatedNumber,
    NProgress,
    AsyncWorldMap,
  },
  data() {
    return {
      progress: 0,
      activeUsersChartID: "activeUsersChart",
      emailsCampaignChartID: "emailsCampaignChart",
      activeCountriesChartID: "activeCountriesChart",
      tableData: [
        {
          flag: "img/US.png",
          country: "USA",
          value: "2.920",
          percentage: "53.23%",
        },
        {
          flag: "img/DE.png",
          country: "Germany",
          value: "1.300",
          percentage: "20.43%",
        },
        {
          flag: "img/AU.png",
          country: "Australia",
          value: "760",
          percentage: "10.35%",
        },
        {
          flag: "img/GB.png",
          country: "United Kingdom",
          value: "690",
          percentage: "7.87%",
        },
        {
          flag: "img/RO.png",
          country: "United Kingdom",
          value: "600",
          percentage: "5.94%",
        },
        {
          flag: "img/BR.png",
          country: "Brasil",
          value: "550",
          percentage: "4.34%",
        },
      ],
      productsTable: [
        {
          image: "img/saint-laurent.jpg",
          title: "Suede Biker Jacket",
          subTitle: "by Saint Laurent",
          color: "Black",
          size: "M",
          price: 3390,
          quantity: 1,
          amount: 3390,
        },
        {
          image: "img/balmain.jpg",
          title: "Jersey T-Shirt ",
          subTitle: "by Balmain",
          color: "Black",
          size: "M",
          price: 499,
          quantity: 2,
          amount: 998,
        },
        {
          image: "img/prada.jpg",
          title: "Slim-Fit Swim Short ",
          subTitle: "by Prada",
          color: "Red",
          size: "M",
          price: 200,
          quantity: 1,
          amount: 200,
        },
      ],
      mapData: {
        AU: 760,
        BR: 550,
        CA: 120,
        DE: 1300,
        FR: 540,
        GB: 690,
        GE: 200,
        IN: 200,
        RO: 600,
        RU: 300,
        US: 2920,
      },
    };
  },
  mounted() {
    activeUsersChart.createChart(this.activeUsersChartID);
    emailsCampaignChart.createChart(this.emailsCampaignChartID);
    activeCountriesChart.createChart(this.activeCountriesChartID);
  },
};
</script>
<style></style>
