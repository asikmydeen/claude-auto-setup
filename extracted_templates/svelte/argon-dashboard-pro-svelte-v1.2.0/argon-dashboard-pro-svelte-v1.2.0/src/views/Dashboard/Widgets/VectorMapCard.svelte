<script>
  import Card from "../../../components/Cards/Card.svelte";
  import FusionCharts from "fusioncharts";
  import Charts from "fusioncharts/fusioncharts.charts";
  import Maps from "fusioncharts/fusioncharts.maps";
  import World from "fusioncharts/maps/fusioncharts.world";
  import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
  import SvelteFC, { fcRoot } from "svelte-fusioncharts";

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
      height: 350,
      dataSource
    };
</script>

<Card nobody={true} className="widget-calendar">
  <div class="card-header">
    <div class="row align-items-center">
      <div class="col-8">
        <!-- Title -->
        <h5 class="h3 mb-0">Real time</h5>
      </div>
      <div class="col-4 text-right">
        <a href="#!" class="btn btn-sm btn-neutral">Action</a>
      </div>
    </div>
  </div>
  <div class="card-body">
    <SvelteFC {...chartConfig} />
  </div>
  <div class="list-group list-group-flush list my--3">
    <div class="list-group-item px-0">
      <div class="row align-items-center">
        <div class="col-md-auto">
          <!-- Country flag -->
          <img src="../../../../img/icons/flags/US.png" alt="Country flag" />
        </div>
        <div class="col">
          <small>Country:</small>
          <h5 class="mb-0">United States</h5>
        </div>
        <div class="col">
          <small>Visits:</small>
          <h5 class="mb-0">2500</h5>
        </div>
        <div class="col">
          <small>Bounce:</small>
          <h5 class="mb-0">30%</h5>
        </div>
      </div>
    </div>
        <div class="list-group-item px-0">
      <div class="row align-items-center">
        <div class="col-md-auto">
          <!-- Country flag -->
          <img src="../../../../img/icons/flags/DE.png" alt="Country flag">
        </div>
        <div class="col">
          <small>Country:</small>
          <h5 class="mb-0">Germany</h5>
        </div>
        <div class="col">
          <small>Visits:</small>
          <h5 class="mb-0">2500</h5>
        </div>
        <div class="col">
          <small>Bounce:</small>
          <h5 class="mb-0">30%</h5>
        </div>
      </div>
    </div>
        <div class="list-group-item px-0">
      <div class="row align-items-center">
        <div class="col-md-auto">
          <!-- Country flag -->
          <img src="../../../../img/icons/flags/GB.png" alt="Country flag">
        </div>
        <div class="col">
          <small>Country:</small>
          <h5 class="mb-0">Great Britain</h5>
        </div>
        <div class="col">
          <small>Visits:</small>
          <h5 class="mb-0">2500</h5>
        </div>
        <div class="col">
          <small>Bounce:</small>
          <h5 class="mb-0">30%</h5>
        </div>
      </div>
    </div>
  </div>
</Card>
