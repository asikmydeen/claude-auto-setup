<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <default-statistics-card
        title="Sales"
        count="$230,220"
        :percentage="{
          color: 'success',
          value: '+55%',
          label: 'since last month',
        }"
        menu="6 May - 7 May"
        :dropdown="[
          {
            label: 'Last 7 days',
            route: 'https://creative-tim.com/',
          },
          {
            label: 'Last week',
            route: '/pages/widgets',
          },
          {
            label: 'Last 30 days',
            route: '/',
          },
        ]"
      />
      <default-statistics-card
        title="Customers"
        count="3.200"
        :percentage="{
          color: 'success',
          value: '+12%',
          label: 'since last month',
        }"
        menu="9 June - 12 June"
        :dropdown="[
          {
            label: 'Last 7 days',
            route: 'javascript:;',
          },
          {
            label: 'Last week',
            route: 'javascript:;',
          },
          {
            label: 'Last 30 days',
            route: 'javascript:;',
          },
        ]"
      />
      <default-statistics-card
        title="Avg. Revenue"
        count="$1.200"
        :percentage="{
          color: 'secondary',
          value: '+$213',
          label: 'since last month',
        }"
        menu="6 August - 9 August"
        :dropdown="[
          {
            label: 'Last 7 days',
            route: 'javascript:;',
          },
          {
            label: 'Last week',
            route: 'javascript:;',
          },
          {
            label: 'Last 30 days',
            route: 'javascript:;',
          },
        ]"
      />
    </div>
    <div class="mt-4 row">
      <div class="col-lg-4 col-sm-6">
        <channels-chart-card />
      </div>
      <div class="mt-4 col-lg-8 col-sm-6 mt-sm-0">
        <revenue-chart-card />
      </div>
    </div>
    <div class="mt-4 row">
      <div class="col-lg-8">
        <div class="card h-100">
          <div class="p-3 pb-0 card-header">
            <div class="d-flex justify-content-between">
              <h6 class="mb-0">Sales by Age</h6>
            </div>
          </div>
          <div class="p-3 card-body">
            <horizontal-bar-chart
              :chart="{
                labels: ['16-20', '21-25', '26-30', '31-36', '36-42', '42+'],
                datasets: [
                  {
                    label: 'Sales by age',
                    data: [15, 20, 12, 60, 20, 15],
                  },
                ],
              }"
            />
          </div>
        </div>
      </div>
      <div class="mt-4 col-lg-4 mt-lg-0">
        <div class="card">
          <div class="p-3 pb-0 card-header">
            <div class="d-flex justify-content-between">
              <h6 class="mb-0">Sales by Country</h6>
            </div>
          </div>
          <div class="p-3 card-body">
            <ul class="list-group list-group-flush list my--3">
              <li
                v-for="({ flag, country, sales: sale, percentage }, index) in sales"
                :key="index"
                class="px-0 border-0 list-group-item"
              >
                <div class="row align-items-center">
                  <div class="col-auto">
                    <!-- Country flag -->
                    <img :src="flag" alt="Country flag" />
                  </div>
                  <div class="col">
                    <p class="mb-0 text-xs font-weight-bold">Country:</p>
                    <h6 class="mb-0 text-sm">{{ country }}</h6>
                  </div>
                  <div class="text-center col">
                    <p class="mb-0 text-xs font-weight-bold">Sales:</p>
                    <h6 class="mb-0 text-sm">{{ sale }}</h6>
                  </div>
                  <div class="text-center col">
                    <p class="mb-0 text-xs font-weight-bold">Bounce:</p>
                    <h6 class="mb-0 text-sm">{{ percentage }}</h6>
                  </div>
                </div>
                <hr class="mt-3 mb-1 horizontal dark" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 row">
      <div class="col-12">
        <orders-list-card
          title="Top Selling Products"
          :headers="['Product', 'Value', 'Ads Spent', 'Refunds']"
          :lists="products"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ChannelsChartCard from "./components/ChannelsChartCard.vue";
import RevenueChartCard from "./components/RevenueChartCard.vue";
import HorizontalBarChart from "@/examples/Charts/HorizontalBarChart.vue";
import DefaultStatisticsCard from "./components/DefaultStatisticsCard.vue";
import OrdersListCard from "@/examples/Cards/OrdersListCard.vue";

// images
import US from "@/assets/img/icons/flags/US.png";
import DE from "@/assets/img/icons/flags/DE.png";
import GB from "@/assets/img/icons/flags/GB.png";
import BR from "@/assets/img/icons/flags/BR.png";
import AU from "@/assets/img/icons/flags/AU.png";
import setTooltip from "@/assets/js/tooltip.js";

export default {
  name: "Sales",
  components: {
    ChannelsChartCard,
    RevenueChartCard,
    HorizontalBarChart,
    DefaultStatisticsCard,
    OrdersListCard,
  },
  data() {
    return {
      sales: {
        us: {
          country: "United States",
          sales: 2500,
          percentage: "29.9%",
          flag: US,
        },
        germany: {
          country: "Germany",
          sales: "3.900",
          percentage: "40.22%",
          flag: DE,
        },
        britain: {
          country: "Great Britain",
          sales: "1.400",
          percentage: "23.44%",
          flag: GB,
        },
        brasil: {
          country: "Brasil",
          sales: "562",
          percentage: "32.14%",
          flag: BR,
        },
        australia: {
          country: "Australia",
          sales: "400",
          percentage: "56.83%",
          flag: AU,
        },
      },
      products: [
        {
          title: "Nike v22 Running",
          order: "12.821",
          values: ["$130.992", "$9.500", "13"],
          info: "Refund rate is lower with 97% than other products",
          image:
            "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/blue-shoe.jpg",
          icon: "bold-down text-success",
        },
        {
          title: "Business Kit (Mug + Notebook)",
          order: "8.232",
          values: ["$80.250", "$4.200", "40"],
          image:
            "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/black-mug.jpg",
          icon: "bold-down text-success",
        },
        {
          title: "Black Chair",
          order: "2.421",
          values: ["$40.600", "$9.430", "54"],
          image:
            "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/black-chair.jpg",
          icon: "bold-up text-danger",
        },
        {
          title: "Wireless Charger",
          order: "5.921",
          values: ["$91.300", "$7.364", "5"],
          image:
            "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/bang-sound.jpg",
          icon: "bold-down text-success",
        },
        {
          title: "Mountain Trip Kit (Camera + Backpack)",
          order: "921",
          values: ["$140.925", "$20.531", "121"],
          info: "Refund rate is higher with 70% than other products",
          image:
            "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/photo-tools.jpg",
          icon: "bold-up text-danger",
        },
      ],
    };
  },
  mounted() {
    setTooltip(this.$store.state.bootstrap);
  },
};
</script>
