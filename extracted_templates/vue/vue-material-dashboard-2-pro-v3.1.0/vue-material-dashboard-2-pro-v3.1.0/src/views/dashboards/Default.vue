<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12 position-relative z-index-2">
        <sales-table-card
          title="Sales by Country"
          :rows="[
            {
              country: [US, 'United States'],
              sales: 2500,
              value: '$230,900',
              percentage: '29.9%',
            },
            {
              country: [DE, 'Germany'],
              sales: '3.900',
              value: '$440,000',
              percentage: '40.22%',
            },
            {
              country: [GB, 'Great Britain'],
              sales: '1.400',
              value: '$190,700',
              percentage: '23.44%',
            },
            {
              country: [BR, 'Brasil'],
              sales: 562,
              value: '$143,960',
              percentage: '32.14%',
            },
          ]"
        />
        <div class="row mb-4">
          <div class="col-lg-4 col-md-6 mt-4 mb-4">
            <chart-holder-card
              title="Website Views"
              subtitle="Last Campaign Performance"
              update="campaign sent 2 days ago"
            >
              <reports-bar-chart
                :chart="{
                  labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                  datasets: {
                    label: 'Sales',
                    data: [50, 20, 10, 22, 50, 10, 40],
                  },
                }"
              />
            </chart-holder-card>
          </div>
          <div class="col-lg-4 col-md-6 mt-4 mb-4">
            <chart-holder-card
              title="Daily Sales"
              subtitle="(<span class='font-weight-bolder'>+15%</span>) increase in today sales."
              update="updated 4 min ago"
              color="success"
            >
              <reports-line-chart
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
                    'Dec',
                  ],
                  datasets: {
                    label: 'Mobile apps',
                    data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
                  },
                }"
              />
            </chart-holder-card>
          </div>
          <div class="col-lg-4 mt-4 mb-3">
            <chart-holder-card
              title="Completed Tasks"
              subtitle="Last Campaign Performance"
              update="just updated"
              color="dark"
            >
              <reports-line-chart
                id="tasks-chart"
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
                    'Dec',
                  ],
                  datasets: {
                    label: 'Mobile apps',
                    data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                  },
                }"
              />
            </chart-holder-card>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6">
            <mini-statistics-card
              :title="{ text: 'Bookings', value: 281 }"
              detail="<span class='text-success text-sm font-weight-bolder'>+55%</span> than last week"
              :icon="{
                name: 'weekend',
                color: 'text-white',
                background: 'dark',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: 'Today\'s Users', value: '2,300' }"
              detail="<span class='text-success text-sm font-weight-bolder'>+3%</span> than last month"
              :icon="{
                name: 'leaderboard',
                color: 'text-white',
                background: 'primary',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: 'Revenue', value: '34k' }"
              detail="<span class='text-success text-sm font-weight-bolder'>+1%</span> than yesterday"
              :icon="{
                name: 'leaderboard',
                color: 'text-white',
                background: 'success',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: 'Followers', value: '+91' }"
              detail="Just updated"
              :icon="{
                name: 'person_add',
                color: 'text-white',
                background: 'info',
              }"
            />
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-lg-4 col-md-6">
            <booking-card
              :img="booking1"
              title="Cozy 5 Stars Apartment"
              description="The place is close to Barceloneta Beach and bus stop
            just 2 min by walk and near to 'Naviglio' where you can enjoy the
            main night life in Barcelona."
              price="$899/night"
              location="Barcelona, Spain"
            />
          </div>
          <div class="col-lg-4 col-md-6">
            <booking-card
              :img="booking2"
              title="Office Studio"
              description="The
            place is close to Metro Station and bus stop just 2 min by walk and
            near to 'Naviglio' where you can enjoy the night life in London,
            UK."
              price="$1.119/night"
              location="London, UK"
            />
          </div>
          <div class="col-lg-4 col-md-6">
            <booking-card
              :img="booking3"
              title="Beautiful Castle"
              description="The
            place is close to Metro Station and bus stop just 2 min by walk and
            near to 'Naviglio' where you can enjoy the night life in London,
            UK."
              price="$459/night"
              location="Milan, Italy"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="row"></div>
  </div>
</template>
<script>
import SalesTableCard from "./components/SalesTableCard.vue";
import ChartHolderCard from "./components/ChartHolderCard.vue";
import ReportsBarChart from "@/examples/Charts/ReportsBarChart.vue";
import ReportsLineChart from "./components/ReportsLineChart.vue";
import MiniStatisticsCard from "./components/MiniStatisticsCard.vue";
import BookingCard from "./components/BookingCard.vue";

import US from "../../assets/img/icons/flags/US.png";
import DE from "../../assets/img/icons/flags/DE.png";
import GB from "../../assets/img/icons/flags/GB.png";
import BR from "../../assets/img/icons/flags/BR.png";
import booking1 from "../../assets/img/products/product-1-min.jpg";
import booking2 from "../../assets/img/products/product-2-min.jpg";
import booking3 from "../../assets/img/products/product-3-min.jpg";

export default {
  name: "DashboardDefault",
  components: {
    SalesTableCard,
    ChartHolderCard,
    ReportsBarChart,
    ReportsLineChart,
    MiniStatisticsCard,
    BookingCard,
  },
  data() {
    return {
      booking1,
      booking2,
      booking3,
      US,
      DE,
      GB,
      BR,
    };
  },
};
</script>
