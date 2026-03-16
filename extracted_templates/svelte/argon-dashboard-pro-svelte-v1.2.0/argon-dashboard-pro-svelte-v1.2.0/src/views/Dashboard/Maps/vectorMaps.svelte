<script>
  import { fade } from "svelte/transition";
  import BaseHeader from "../../../components/BaseHeader.svelte";
  import BaseButton from "../../../components/BaseButton.svelte";
  import RouteBreadcrumb from "../../../components/Breadcrumb/RouteBreadcrumb.svelte";
  import Card from "../../../components/Cards/Card.svelte";
  export let name = "Vector map";
  import FusionCharts from "fusioncharts";
  import Charts from "fusioncharts/fusioncharts.charts";
  import Maps from "fusioncharts/fusioncharts.maps";
  import World from "fusioncharts/maps/fusioncharts.world";
  import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
  import SvelteFC, { fcRoot } from "svelte-fusioncharts";
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
  fcRoot(FusionCharts, Maps, World, FusionTheme);
  let dataSource = {
      chart: {
        labelsepchar: ": ",
        entityFillHoverColor: "#D2D7DD",
        theme: "fusion",
        showlegend: "0",
        showLabels: "0"
      },
      colorrange: {
        minvalue: "0",
        code: "#FFE0B2",
        gradient: "1",
        color: [
          {
            minvalue: "0",
            maxvalue: "0.5",
            color: "#ADB5BD"
          },
          {
            minvalue: "0.5",
            maxvalue: "1.0",
            color: "#ADB5BD"
          },
          {
            minvalue: "1.0",
            maxvalue: "2.0",
            color: "#F1F4F8"
          },
          {
            minvalue: "2.0",
            maxvalue: "3.0",
            color: "#D7DCE2"
          }
        ]
      },
      data: [
        {
          id: "NA",
          value: ".82",
          showLabel: "1"
        },
        {
          id: "SA",
          value: "2.04",
          showLabel: "1"
        },
        {
          id: "AS",
          value: "1.78",
          showLabel: "1"
        },
        {
          id: "EU",
          value: ".40",
          showLabel: "1"
        },
        {
          id: "AF",
          value: "2.58",
          showLabel: "1"
        },
        {
          id: "AU",
          value: "1.30",
          showLabel: "1"
        }
      ]
    },
    chartConfig = {
      type: "world",
      renderAt: "chart-container",
      width: "100%",
      height: 900,
      dataSource
    };
</script>

<div transition:fade={{ duration: 250 }}>
  <BaseHeader className="pb-6">
    <div class="row align-items-center py-4">
      <div class="col-lg-6 col-7">
        <h6 class="h2 text-white d-inline-block mb-0">{name}</h6>
        <nav ria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
          <RouteBreadcrumb {name} />
        </nav>
      </div>
      <div class="col-lg-6 col-5 text-right">
        <BaseButton size="sm" type="neutral">New</BaseButton>
        <BaseButton size="sm" type="neutral">Filters</BaseButton>
      </div>
    </div>
  </BaseHeader>

  <div class="container-fluid mt--6">
    <div class="row">
      <div class="col">
        <Card noBody={true} className="border-0">
          <div class="card-body pt-0">
            <div id="chart-container" style="height: inherit;">
              <SvelteFC {...chartConfig} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</div>
