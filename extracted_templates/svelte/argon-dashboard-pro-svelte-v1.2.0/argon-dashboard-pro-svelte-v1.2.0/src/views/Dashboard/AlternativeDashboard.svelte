<script>
  import { fade } from "svelte/transition";
  // Lists
  import ActivityFeed from "./ActivityFeed.svelte";
  import TaskList from "../Widgets/TaskList.svelte";
  import UserList from "./UserList.svelte";
  import ProgressTrackList from "./ProgressTrackList.svelte";

  // Components
  import BaseProgress from "../../components/BaseProgress.svelte";
  import RouteBreadCrumb from "../../components/Breadcrumb/RouteBreadcrumb.svelte";
  import StatsCard from "../../components/Cards/StatsCard.svelte";
  import Card from "../../components/Cards/Card.svelte";
  import BaseHeader from "../../components/BaseHeader.svelte";
  import Badge from "../../components/Badge.svelte";
  import BaseButton from "../../components/BaseButton.svelte";
  import BaseDropdown from "../../components/BaseDropdown.svelte";

  // Tables
  import LightTable from "./LightTable.svelte";
  import SocialTrafficTable from "./SocialTrafficTable.svelte";
  import PageVisitsTable from "./PageVisitsTable.svelte";
  import VectorMapCard from "./VectorMapCard.svelte";
  import MembersCard from "./MembersCard.svelte";

  // charts
  import FusionCharts from "fusioncharts";
  import Charts from "fusioncharts/fusioncharts.charts";
  import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
  import SvelteFC, { fcRoot } from "svelte-fusioncharts";

  import { onMount } from "svelte";
  fcRoot(FusionCharts, Charts, FusionTheme);
  let line = "";

  let bigLineChart = {
    activeIndex: 0,
    monthdata: {
      chart: {
        showValues: "0",
        theme: "fusion"
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
      dataSource: bigLineChart.monthdata
    };
    barChartConfig = {
      type: "column2d",
      width: "100%",
      height: "370",
      renderAt: "chart-container",
      dataSource: bigLineChart.barData
    };
  });

  let lineChartConfig = {
    type: "spline",
    width: "100%",
    height: "370",
    renderAt: "chart-container",
    dataSource: bigLineChart.monthdata
  };

  let barChartConfig = {
    type: "column2d",
    width: "100%",
    height: "370",
    renderAt: "chart-container",
    dataSource: bigLineChart.barData
  };

  onMount(function() {
    let topmenu = document.getElementsByTagName("nav").item(0);
    topmenu.classList.remove("bg-danger");
    topmenu.classList.remove("navbar-dark");
    topmenu.classList.add("navbar-light");
    let search = document.getElementsByTagName("form").item(0);
    search.classList.remove("navbar-search-light");
    search.classList.add("navbar-search-dark");
  });
</script>

<div transition:fade={{ duration: 250 }}>
  <BaseHeader className="pb-6" type="light">
    <div class="row align-items-center py-4">
      <div class="col-lg-6 col-7">
        <h6 class="h2 d-inline-block mb-0">Alternative</h6>
        <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
          <ul class="breadcrumb breadcrumb-links">
            <li class="breadcrumb-item">
              <a target="_self" href="#!" class="">
                <a href="#/" class="active">
                  <i class="fas fa-home" />
                </a>
              </a>
            </li>
            <li class="breadcrumb-item">
              <a target="_self" href="#!" class="">
                <a href="#!">Dashboards</a>
              </a>
            </li>
            <li class="breadcrumb-item active">
              <span aria-current="page">Alternative</span>
            </li>
          </ul>
        </nav>
      </div>
      <div class="text-right col-lg-6 col-5">
        <button type="button" class="btn base-button btn-neutral btn-sm">
          <!---->
          New
        </button>
        <button type="button" class="btn base-button btn-neutral btn-sm">
          <!---->
          Filters
        </button>
      </div>
    </div>
    <!-- Card stats -->
    <div class="row">
      <div class="col-xl-3 col-md-6">
        <Card noBody={true} className="bg-gradient-primary border-0">
          <!-- Card body -->
          <div class="card-body">
            <div class="row">
              <div class="col">
                <h5
                  class="text-uppercase text-muted mb-0 text-white card-title">
                  Tasks completed
                </h5>
                <span class="h2 font-weight-bold mb-0 text-white">8/24</span>
                <BaseProgress
                  clasName="progress-xs mt-3 mb-0"
                  type="success"
                  value="30" />
              </div>
              <div class="col-md-auto">
                <BaseDropdown
                  menuOnRight
                  tagClasses="nav-item"
                  tag="li"
                  titleTag="a"
                  titleClasses="nav-link pr-0"
                  isOpen="false">
                  <button
                    class="btn dropdown-toggle btn-secondary btn btn-sm
                    btn-neutral mr-0 dropdown-toggle-no-caret"
                    slot="title-container"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    <i class="fas fa-ellipsis-h" />
                  </button>

                  <div class="dropdown-item" href="#!">Action</div>
                  <div class="dropdown-item" href="#!">Another action</div>
                  <div class="dropdown-item" href="#!">Something else here</div>
                </BaseDropdown>
              </div>
            </div>
            <p class="mt-3 mb-0 text-sm">
              <a href="#!" class="text-nowrap text-white font-weight-600">
                See details
              </a>
            </p>
          </div>
        </Card>
      </div>
      <div class="col-xl-3 col-md-6">
        <Card noBody={true} className="bg-gradient-info border-0">
          <!-- Card body -->
          <div class="card-body">
            <div class="row">
              <div class="col">
                <h5
                  class="text-uppercase text-muted mb-0 text-white card-title">
                  Contacts
                </h5>
                <span class="h2 font-weight-bold mb-0 text-white">123/267</span>
                <BaseProgress
                  clasName="progress-xs mt-3 mb-0"
                  type="success"
                  value="50" />
              </div>
              <div class="col-md-auto">
                <BaseDropdown
                  menuOnRight
                  tagClasses="nav-item"
                  tag="li"
                  titleTag="a"
                  titleClasses="nav-link pr-0"
                  isOpen="false">
                  <button
                    class="btn dropdown-toggle btn-secondary btn btn-sm
                    btn-neutral mr-0 dropdown-toggle-no-caret"
                    slot="title-container"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    <i class="fas fa-ellipsis-h" />
                  </button>

                  <div class="dropdown-item" href="#!">Action</div>
                  <div class="dropdown-item" href="#!">Another action</div>
                  <div class="dropdown-item" href="#!">Something else here</div>
                </BaseDropdown>
              </div>
            </div>
            <p class="mt-3 mb-0 text-sm">
              <a href="#!" class="text-nowrap text-white font-weight-600">
                See details
              </a>
            </p>
          </div>
        </Card>
      </div>
      <div class="col-xl-3 col-md-6">
        <Card noBody={true} className="bg-gradient-danger border-0">
          <!-- Card body -->
          <div class="card-body">
            <div class="row">
              <div class="col">
                <h5
                  class="text-uppercase text-muted mb-0 text-white card-title">
                  Items sold
                </h5>
                <span class="h2 font-weight-bold mb-0 text-white">200/300</span>
                <BaseProgress
                  clasName="progress-xs mt-3 mb-0"
                  type="success"
                  value="80" />
              </div>
              <div class="col-md-auto">
                <BaseDropdown
                  menuOnRight
                  tagClasses="nav-item"
                  tag="li"
                  titleTag="a"
                  titleClasses="nav-link pr-0"
                  isOpen="false">
                  <button
                    class="btn dropdown-toggle btn-secondary btn btn-sm
                    btn-neutral mr-0 dropdown-toggle-no-caret"
                    slot="title-container"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    <i class="fas fa-ellipsis-h" />
                  </button>

                  <div class="dropdown-item" href="#!">Action</div>
                  <div class="dropdown-item" href="#!">Another action</div>
                  <div class="dropdown-item" href="#!">Something else here</div>
                </BaseDropdown>
              </div>
            </div>
            <p class="mt-3 mb-0 text-sm">
              <a href="#!" class="text-nowrap text-white font-weight-600">
                See details
              </a>
            </p>
          </div>
        </Card>
      </div>
      <div class="col-xl-3 col-md-6">
        <Card noBody={true} className="bg-gradient-default border-0">
          <!-- Card body -->
          <div class="card-body">
            <div class="row">
              <div class="col">
                <h5
                  class="text-uppercase text-muted mb-0 text-white card-title">
                  Notifications
                </h5>
                <span class="h2 font-weight-bold mb-0 text-white">50/62</span>
                <BaseProgress
                  clasName="progress-xs mt-3 mb-0"
                  type="success"
                  value="90" />
              </div>
              <div class="col-md-auto">
                <BaseDropdown
                  menuOnRight
                  tagClasses="nav-item"
                  tag="li"
                  titleTag="a"
                  titleClasses="nav-link pr-0"
                  isOpen="false">
                  <button
                    class="btn dropdown-toggle btn-secondary btn btn-sm
                    btn-neutral mr-0 dropdown-toggle-no-caret"
                    slot="title-container"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    <i class="fas fa-ellipsis-h" />
                  </button>

                  <div class="dropdown-item" href="#!">Action</div>
                  <div class="dropdown-item" href="#!">Another action</div>
                  <div class="dropdown-item" href="#!">Something else here</div>
                </BaseDropdown>
              </div>
            </div>
            <p class="mt-3 mb-0 text-sm">
              <a href="#!" class="text-nowrap text-white font-weight-600">
                See details
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  </BaseHeader>

  <!--Charts-->
  <div class="container-fluid mt--6">
    <div class="card-deck flex-column flex-xl-row">
      <Card>
        <div class="row align-items-center" slot="header">
          <div class="col">
            <h6 class="text-uppercase text-muted ls-1 mb-1">Overview</h6>
            <h5 class="h3 mb-0">Sales value</h5>
          </div>
        </div>
        <SvelteFC {...lineChartConfig} />
      </Card>

      <Card headerClasses="bg-transparent">
        <div class="row align-items-center" slot="header">
          <div class="col">
            <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
            <h5 class="h3 mb-0">Total orders</h5>
          </div>
        </div>
        <SvelteFC {...barChartConfig} />
      </Card>

      <!-- Progress track list-->
      <Card>
        <!-- Card header -->
        <div slot="header">
          <div class="row align-items-center">
            <div class="col-8">
              <!-- Surtitle -->
              <h6 class="surtitle">5/23 projects</h6>
              <!-- Title -->
              <h5 class="h3 mb-0">Progress track</h5>
            </div>
            <div class="col-4 text-right">
              <a href="#!" class="btn btn-sm btn-neutral">Action</a>
            </div>
          </div>
        </div>
        <!-- Card body -->
        <ProgressTrackList />
      </Card>
    </div>
    <!-- End charts-->

    <!--Tables & Widgets-->
    <div class="row">
      <div class="col-xl-8">
        <LightTable />
      </div>
      <div class="col-xl-4">
        <VectorMapCard />
      </div>
    </div>
    <!--End Tables & Widgets-->

    <!--Lists-->
    <div class="card-deck flex-column flex-xl-row">
      <!-- Members list group card -->
      <MembersCard showSearch={false} />
      <!-- Checklist -->
      <TaskList />
      <!-- Progress track -->
      <Card>
        <!-- Card header -->
        <h5 slot="header" class="h3 mb-0">Progress track</h5>
        <!-- Card body -->
        <ProgressTrackList itemLimit="5" />
      </Card>
    </div>
  </div>
</div>
