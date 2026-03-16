<script>
  import CalendarWidget from "./Widgets/CalendarWidget.svelte";
  import CreditCard from "./Widgets/CreditCard.svelte";
  import MembersCard from "./Widgets/MembersCard.svelte";
  import PaypalCard from "./Widgets/PaypalCard.svelte";
  import ProgressTrackList from "./Widgets/ProgressTrackList.svelte";
  import StatsCards from "./Widgets/StatsCards.svelte";
  import TaskList from "./Widgets/TaskList.svelte";
  import TimelineCard from "./Widgets/TimelineCard.svelte";
  import VectorMapCard from "./Widgets/VectorMapCard.svelte";
  import VisaCard from "./Widgets/VisaCard.svelte";
  import { fade } from "svelte/transition";
  import BaseHeader from "../../components/BaseHeader.svelte";
  import BaseButton from "../../components/BaseButton.svelte";
  import RouteBreadcrumb from "../../components/Breadcrumb/RouteBreadcrumb.svelte";
  import StatsCard from "../../components/Cards/StatsCard.svelte";
  import Card from "../../components/Cards/Card.svelte";
  export let name = "";
  export let parent = "";
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
</script>

<div transition:fade={{ duration: 250 }}>
  <BaseHeader className="pb-6">
    <div class="row align-items-center py-4">
      <div class="col-lg-6 col-7">
        <h6 class="h2 text-white d-inline-block mb-0">Widgets</h6>
        <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
          <RouteBreadcrumb {name} {parent} />
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
      <div class="col-lg-4">
        <!-- Image-Text card -->
        <Card noBody={true}>
          <!-- Card image -->
          <img
            class="card-img-top"
            src="../../img/theme/img-1-1000x900.jpg"
            alt="Image placeholder" />
          <!-- Card body -->
          <div class="card-body">
            <h2 class="card-title mb-0">Get started with Argon</h2>
            <small class="text-muted">
              by John Snow on Oct 29th at 10:23 AM
            </small>
            <div class="card-text mt-4">
              Argon is a great free UI package based on Bootstrap 4 that
              includes the most important components and features.
            </div>
            <a href="#!" class="btn btn-link px-0">View article</a>
          </div>
        </Card>

        <!-- Members list group card -->
        <MembersCard />

        <!-- Messages -->
        <Card noBody={true}>
          <!-- Card header -->
          <div slot="header">
            <!-- Title -->
            <h5 class="h3 mb-0">Latest messages</h5>
          </div>
          <!-- Card body -->
          <div class="card-body p-0">
            <!-- List group -->
            <div class="list-group list-group-flush">
              <a
                href="/"
                class="list-group-item flex-column align-items-start py-4 px-4
                list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                  <div>
                    <div class="d-flex w-100 align-items-center">
                      <img
                        src="../img/theme/team-1.jpg"
                        alt="Image placeholder"
                        class="avatar avatar-xs mr-2" />
                      <h5 class="mb-1">Tim</h5>
                    </div>
                  </div>
                  <small>2 hrs ago</small>
                </div>
                <h4 class="mt-3 mb-1">New order for Argon Dashboard</h4>
                <p class="text-sm mb-0">
                  Doasdnec id elit non mi porta gravida at eget metus. Maecenas
                  sed diam eget risus varius blandit.
                </p>
              </a>
              <a
                href="/"
                class="list-group-item flex-column align-items-start py-4 px-4
                list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                  <div>
                    <div class="d-flex w-100 align-items-center">
                      <img
                        src="../img/theme/team-2.jpg"
                        alt="Image placeholder"
                        class="avatar avatar-xs mr-2" />
                      <h5 class="mb-1">Mike</h5>
                    </div>
                  </div>
                  <small>1 day ago</small>
                </div>
                <h4 class="mt-3 mb-1">
                  <span class="text-info">●</span>
                  Your theme has been updated
                </h4>
                <p class="text-sm mb-0">
                  Doasdnec id elit non mi porta gravida at eget metus. Maecenas
                  sed diam eget risus varius blandit.
                </p>
              </a>
            </div>
          </div>
        </Card>

        <!-- Master card -->
        <CreditCard />
      </div>

      <div class="col-lg-4">
        <!-- Calendar widget -->
        <!--* Card header *-->
        <!--* Card body *-->
        <!--* Card init *-->
        <CalendarWidget />
        <TimelineCard />
        <ProgressTrackList />
        <PaypalCard />
      </div>

      <div class="col-lg-4">
        <!-- Vector map -->
        <VectorMapCard />

        <VisaCard />
        <!-- Stats cards-->
        <StatsCards />

        <!-- Checklist -->
        <TaskList />
      </div>
    </div>
  </div>
</div>
