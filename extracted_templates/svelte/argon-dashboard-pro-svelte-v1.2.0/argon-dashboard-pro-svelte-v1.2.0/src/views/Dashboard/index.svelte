<script>
  import { fade } from "svelte/transition";
  // Lists
  import ActivityFeed from "./ActivityFeed.svelte";
  import TaskList from "./TaskList.svelte";
  import UserList from "./UserList.svelte";
  import ProgressTrackList from "./ProgressTrackList.svelte";

  // Components
  import BaseProgress from "../../components/BaseProgress.svelte";
  import RouteBreadCrumb from "../../components/Breadcrumb/RouteBreadcrumb.svelte";
  import StatsCard from "../../components/Cards/StatsCard.svelte";
  import Card from "../../components/Cards/Card.svelte";
  import BaseHeader from "../../components/BaseHeader.svelte";
  import Badge from "../../components/Badge.svelte";

  // Tables
  import LightTable from "./LightTable.svelte";
  import SocialTrafficTable from "./SocialTrafficTable.svelte";
  import PageVisitsTable from "./PageVisitsTable.svelte";

  // charts
  import FusionCharts from "fusioncharts";
  import Charts from "fusioncharts/fusioncharts.charts";
  import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
  import CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy";
  import SvelteFC, { fcRoot } from "svelte-fusioncharts";
  fcRoot(FusionCharts, Charts, FusionTheme, CandyTheme);
  export let name = "Dashboard";
  import { onMount } from "svelte";
  onMount(function() {
    let topmenu = document.getElementsByTagName("nav").item(0);
    topmenu.classList.add("bg-danger");
    topmenu.classList.add("navbar-dark");
    topmenu.classList.remove("navbar-light");
    let search = document.getElementsByTagName("form").item(0);
    search.classList.remove("navbar-search-dark");
    search.classList.add("navbar-search-light");
  });
  let line = "";

  let bigLineChart = {
    activeIndex: 0,
    monthdata: {
      chart: {
        showValues: "0",
        theme: "candy"
      },
      colorrange: {
        minvalue: "0",
        code: "#5E72E4",
        gradient: "1",
        color: [
          {
            minvalue: "0",
            maxvalue: "70",
            color: "#5E72E4"
          }
        ]
      },
      data: [
        {
          label: "May",
          value: "0"
        },
        {
          label: "Jun",
          value: "20"
        },
        {
          label: "Jul",
          value: "10"
        },
        {
          label: "Aug",
          value: "30"
        },
        {
          label: "Sep",
          value: "15"
        },
        {
          label: "Oct",
          value: "40"
        },
        {
          label: "Nov",
          value: "20"
        },
        {
          label: "Dec",
          value: "60"
        }
      ]
    },
    weekdata: {
      chart: {
        showValues: "0",
        theme: "candy"
      },
      colorrange: {
        minvalue: "0",
        code: "#5E72E4",
        gradient: "1",
        color: [
          {
            minvalue: "0",
            maxvalue: "70",
            color: "#5E72E4"
          }
        ]
      },
      data: [
        {
          label: "May",
          value: "0"
        },
        {
          label: "Jun",
          value: "20"
        },
        {
          label: "Jul",
          value: "5"
        },
        {
          label: "Aug",
          value: "25"
        },
        {
          label: "Sep",
          value: "10"
        },
        {
          label: "Oct",
          value: "30"
        },
        {
          label: "Nov",
          value: "15"
        },
        {
          label: "Dec",
          value: "40"
        }
      ]
    },
    barData: {
      chart: {
        theme: "fusion"
      },
      data: [
        {
          label: "Jul",
          value: "25",
          color: "#FB6340"
        },
        {
          label: "Aug",
          value: "20",
          color: "#FB6340"
        },
        {
          label: "Sep",
          value: "30",
          color: "#FB6340"
        },
        {
          label: "Oct",
          value: "22",
          color: "#FB6340"
        },
        {
          label: "Nov",
          value: "17",
          color: "#FB6340"
        },
        {
          label: "Dec",
          value: "19",
          color: "#FB6340"
        }
      ]
    }
  };

  window.addEventListener("resize", function() {
    lineChartConfig = {
      type: "spline",
      width: "100%",
      height: "370",
      renderAt: "chart-container",
      dataSource: line
    };
    barChartConfig = {
      type: "column2d",
      width: "100%",
      height: "370",
      renderAt: "chart-container",
      dataSource: bigLineChart.barData
    };
  });

  line = bigLineChart.monthdata;

  let lineChartConfig = {
    type: "spline",
    width: "100%",
    height: "370",
    renderAt: "chart-container",
    dataSource: line
  };

  let barChartConfig = {
    type: "column2d",
    width: "100%",
    height: "370",
    renderAt: "chart-container",
    dataSource: bigLineChart.barData
  };

  const updateChart = index => {
    if (index === 0) {
      line = bigLineChart.monthdata;
      bigLineChart.activeIndex = 1;
    } else {
      line = bigLineChart.weekdata;
      bigLineChart.activeIndex = 0;
    }

    lineChartConfig = {
      type: "spline",
      width: "1000",
      height: "370",
      renderAt: "chart-container",
      dataSource: line
    };
  };
</script>

<div transition:fade={{ duration: 250 }}>
  <BaseHeader className="pb-6">
    <div class="row align-items-center py-4">
      <div class="col-lg-6 col-7">
        <h6 class="h2 text-white d-inline-block mb-0">Default</h6>
        <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
          <RouteBreadCrumb {name} />
        </nav>
      </div>
    </div>
    <!-- Card stats -->
    <div class="row">
      <div class="col-xl-3 col-md-6">
        <StatsCard
          title="Total traffic"
          type="gradient-red"
          subTitle="350,897"
          icon="ni ni-active-40">

          <div slot="footer">
            <span class="text-success mr-2">
              <i class="fa fa-arrow-up" />
              3.48%
            </span>
            <span class="text-nowrap">Since last month</span>
          </div>
        </StatsCard>
      </div>
      <div class="col-xl-3 col-md-6">
        <StatsCard
          title="Total traffic"
          type="gradient-orange"
          subTitle="2,356"
          icon="ni ni-chart-pie-35">
          <div slot="footer">
            <span class="text-success mr-2">
              <i class="fa fa-arrow-up" />
              12.18%
            </span>
            <span class="text-nowrap">Since last month</span>
          </div>
        </StatsCard>
      </div>
      <div class="col-xl-3 col-md-6">
        <StatsCard
          title="Sales"
          type="gradient-green"
          subTitle="924"
          icon="ni ni-money-coins">
          <div slot="footer">
            <span class="text-danger mr-2">
              <i class="fa fa-arrow-down" />
              5.72%
            </span>
            <span class="text-nowrap">Since last month</span>
          </div>
        </StatsCard>
      </div>
      <div class="col-xl-3 col-md-6">
        <StatsCard
          title="Performance"
          type="gradient-info"
          subTitle="49,65%"
          icon="ni ni-chart-bar-32">
          <div slot="footer">
            <span class="text-success mr-2">
              <i class="fa fa-arrow-up" />
              54.8%
            </span>
            <span class="text-nowrap">Since last month</span>
          </div>
        </StatsCard>
      </div>
    </div>
  </BaseHeader>

  <!--Charts-->
  <div class="container-fluid mt--6">
    <div class="row">
      <div class="col-xl-8">
        <Card headerClasses="bg-transparent" background="true">
          <div class="row align-items-center" slot="header">
            <div class="col">
              <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
              <h5 class="h3 text-white mb-0">Sales value</h5>
            </div>
            <div class="col">
              <ul class="nav nav-pills justify-content-end">
                <li
                  class="nav-item mr-2 mr-md-0"
                  on:click={() => updateChart(1)}>
                  <a
                    href="#!"
                    class="nav-link py-2 px-3 {bigLineChart.activeIndex === 0 ? 'active' : ''}">
                    <span class="d-none d-md-block">Month</span>
                    <span class="d-md-none">M</span>
                  </a>
                </li>
                <li class="nav-item" on:click={() => updateChart(0)}>
                  <a
                    href="#!"
                    class="nav-link py-2 px-3 {bigLineChart.activeIndex === 1 ? 'active' : ''}">
                    <span class="d-none d-md-block">Week</span>
                    <span class="d-md-none">W</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <SvelteFC {...lineChartConfig} />
        </Card>
      </div>
      <div class="col-xl-4">
        <Card headerClasses="bg-transparent">
          <div class="row align-items-center" slot="header">
            <div class="col">
              <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
              <h5 class="h3 mb-0">Total orders</h5>
            </div>
          </div>
          <SvelteFC {...barChartConfig} />
        </Card>
      </div>
    </div>
    <!-- End charts-->

    <!--Lists-->
    <div class="row">
      <div class="col-xl-4">
        <Card>
          <h5 class="h3 mb-0" slot="header">Team members</h5>
          <UserList />
        </Card>
      </div>

      <div class="col-xl-4">
        <Card>
          <h5 class="h3 mb-0" slot="header">To do list</h5>
          <TaskList />
        </Card>
      </div>

      <div class="col-xl-4">
        <Card>
          <h5 class="h3 mb-0" slot="header">Progress track</h5>
          <ProgressTrackList />
        </Card>
      </div>
    </div>
    <!--End lists-->

    <!--Widgets-->
    <div class="row">
      <div class="col-xl-5">
        <ActivityFeed />
      </div>
      <div class="col-xl-7">
        <LightTable />
        <div class="card-deck">
          <Card gradient="default" noBody={true}>
            <div class="card-body">
              <div class="mb-2">
                <sup class="text-white">$</sup>
                <span class="h2 text-white">3,300</span>
                <div class="text-light mt-2 text-sm">Your current balance</div>
                <div>
                  <span class="text-success font-weight-600">+ 15%</span>
                  <span class="text-light">($250)</span>
                </div>
              </div>
              <button class="btn btn-sm btn-block btn-neutral">
                Add credit
              </button>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <small class="text-light">Orders: 60%</small>
                  <BaseProgress
                    value="60"
                    size="xs"
                    progressClasses="my-2"
                    type="success" />
                </div>
                <div class="col">
                  <small class="text-light">Sales: 40%</small>
                  <BaseProgress
                    value="40"
                    size="xs"
                    progressClasses="my-2"
                    type="warning" />
                </div>
              </div>
            </div>
          </Card>

          <Card gradient="danger">
            <div class="row align-items-center justify-content-between">
              <div class="col">
                <img
                  src="img/icons/cards/bitcoin.png"
                  alt="Image placeholder" />
              </div>
              <div class="col-auto">
                <Badge suze="lg" variant="success">Active</Badge>
              </div>
            </div>
            <div class="my-4">
              <span class="h6 surtitle text-light">Username</span>
              <div class="h1 text-white">@johnsnow</div>
            </div>
            <div class="row">
              <div class="col">
                <span class="h6 surtitle text-light">Name</span>
                <span class="d-block h3 text-white">John Snow</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
    <!--End Widgets-->

    <!--Tables-->
    <div class="row">
      <div class="col-xl-8">
        <PageVisitsTable />
      </div>
      <div class="col-xl-4">
        <SocialTrafficTable />
      </div>
    </div>
  </div>
</div>
