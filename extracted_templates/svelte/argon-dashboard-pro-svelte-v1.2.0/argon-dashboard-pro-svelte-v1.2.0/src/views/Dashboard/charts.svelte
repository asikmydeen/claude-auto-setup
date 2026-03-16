<script>
  import BaseHeader from "../../components/BaseHeader.svelte";
  import BaseButton from "../../components/BaseButton.svelte";
  import RouteBreadcrumb from "../../components/Breadcrumb/RouteBreadcrumb.svelte";
  import StatsCard from "../../components/Cards/StatsCard.svelte";
  import Card from "../../components/Cards/Card.svelte";
  export let name = "";
  import { fade } from "svelte/transition";

  // first line chart
  import FusionCharts from "fusioncharts";
  import Charts from "fusioncharts/fusioncharts.charts";
  import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
  import SvelteFC, { fcRoot } from "svelte-fusioncharts";
  import line from "../../components/Charts/line.js";
  import simple from "../../components/Charts/simple.js";
  import bubble from "../../components/Charts/bubble.js";
  import dognut from "../../components/Charts/dognut.js";
  import pie from "../../components/Charts/pie.js";
  import bar from "../../components/Charts/bar.js";

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

  window.addEventListener("resize", function() {
    lineChartConfig = {
      type: "spline",
      width: "100%",
      height: "370",
      renderAt: "chart-container",
      dataSource: line
    };

    simpleChartConfig = {
      type: "column2d",
      width: "100%",
      height: "370",
      dataFormat: "json",
      dataSource: simple
    };

    dotsChartConfig = {
      type: "bubble",
      width: "100%",
      height: "370",
      dataFormat: "json",
      dataSource: bubble
    };

    dognutChartConfig = {
      type: "doughnut2d",
      width: "100%",
      height: "370",
      dataFormat: "json",
      dataSource: dognut
    };

    pieChartConfig = {
      type: "pie2d",
      width: "100%",
      height: "370",
      dataFormat: "json",
      dataSource: pie
    };

    barChartConfig = {
      type: "stackedcolumn2d",
      width: "100%",
      height: "370",
      dataFormat: "json",
      dataSource: bar
    };
  });

  fcRoot(FusionCharts, Charts, FusionTheme);

  let lineChartConfig = {
    type: "spline",
    width: "100%",
    height: "370",
    renderAt: "chart-container",
    dataSource: line
  };

  let simpleChartConfig = {
    type: "column2d",
    width: "100%",
    height: "370",
    dataFormat: "json",
    dataSource: simple
  };

  let dotsChartConfig = {
    type: "bubble",
    width: "100%",
    height: "370",
    dataFormat: "json",
    dataSource: bubble
  };

  let dognutChartConfig = {
    type: "doughnut2d",
    width: "100%",
    height: "370",
    dataFormat: "json",
    dataSource: dognut
  };

  let pieChartConfig = {
    type: "pie2d",
    width: "100%",
    height: "370",
    dataFormat: "json",
    dataSource: pie
  };

  let barChartConfig = {
    type: "stackedcolumn2d",
    width: "100%",
    height: "370",
    dataFormat: "json",
    dataSource: bar
  };
</script>

<div transition:fade={{ duration: 250 }}>
  <BaseHeader className="pb-6">
    <div class="row py-4">
      <div class="col-lg-6 col-7">
        <h6 class="h2 text-white d-inline-block mb-0">Charts</h6>
        <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
          <RouteBreadcrumb {name} />
        </nav>
      </div>
      <div class="col-lg-6 col-5 text-right">
        <BaseButton size="sm" type="neutral">New</BaseButton>
        <BaseButton size="sm" type="neutral">Filters</BaseButton>
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

  <div class="container-fluid mt--6">
    <div class="row">
      <div class="col-xl-6">
        <Card>
          <div slot="header">
            <!-- Subtitle -->
            <h6 class="surtitle">Overview</h6>
            <!-- Title -->
            <h5 class="h3 mb-0">Total sales</h5>
          </div>
          <div class="chart">
            <!-- line Chart -->
            <div id="chart-container">
              <SvelteFC {...lineChartConfig} />
            </div>
          </div>
        </Card>
      </div>

      <div class="col-xl-6">
        <Card>
          <div slot="header">
            <!-- Subtitle -->
            <h6 class="surtitle">Performance</h6>
            <!-- Title -->
            <h5 class="h3 mb-0">Total orders</h5>
          </div>
          <div class="chart">
            <!-- 2D simple chart  -->
            <SvelteFC {...simpleChartConfig} />
          </div>
        </Card>
      </div>

      <div class="col-xl-6">
        <Card>
          <div slot="header">
            <!-- Subtitle -->
            <h6 class="surtitle">Growth</h6>
            <!-- Title -->
            <h5 class="h3 mb-0">Sales value</h5>
          </div>
          <div class="chart">
            <!-- bubble chart  -->
            <SvelteFC {...dotsChartConfig} />
          </div>
        </Card>
      </div>

      <div class="col-xl-6">
        <Card>
          <div slot="header">
            <!-- Subtitle -->
            <h6 class="surtitle">Users</h6>
            <!-- Title -->
            <h5 class="h3 mb-0">Audience overwiev</h5>
          </div>
          <div class="chart">
            <!-- dognut chart  -->
            <SvelteFC {...dognutChartConfig} />
          </div>
        </Card>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-6">
        <Card>
          <div slot="header">
            <!-- Subtitle -->
            <h6 class="surtitle">Partners</h6>
            <!-- Title -->
            <h5 class="h3 mb-0">Affiliate traffic</h5>
          </div>
          <div class="chart">
            <!-- pie chart  -->
            <SvelteFC {...pieChartConfig} />
          </div>
        </Card>
      </div>
      <div class="col-xl-6">
        <Card>
          <div slot="header">
            <!-- Subtitle -->
            <h6 class="surtitle">Overview</h6>
            <!-- Title -->
            <h5 class="h3 mb-0">Product comparison</h5>
          </div>
          <div class="chart">
            <!-- pie chart  -->
            <SvelteFC {...barChartConfig} />
          </div>
        </Card>
      </div>
    </div>
  </div>
</div>
