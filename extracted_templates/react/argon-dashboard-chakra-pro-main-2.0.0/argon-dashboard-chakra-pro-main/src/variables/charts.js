/*!

=========================================================
* Argon Dashboard Chakra PRO - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-chakra-pro
* Copyright 2022 Creative Tim (https://www.creative-tim.com/)

* Designed and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

export const lineChartDataDefault = [
  {
    name: "Mobile apps",
    data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
  },
];

export const lineChartOptionsDefault = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    labels: {
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
  },
  legend: {
    show: false,
  },
  grid: {
    strokeDashArray: 5,
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.8,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: [],
    },
    colors: ["#3182CE"],
  },
  colors: ["#3182CE"],
};

export const lineChartDataCRM1 = [
  {
    name: "Visitors",
    data: [40, 80, 100, 20, 30, 80, 10, 20, 40],
  },
];

export const lineChartOptionsCRM1 = {
  chart: {
    width: "100%",
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    labels: {
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
  },
  legend: {
    show: false,
  },
  grid: {
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: false,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.5,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: [],
    },
    colors: ["#3182CE"],
  },
  colors: ["#3182CE"],
};

export const lineChartDataCRM2 = [
  {
    name: "Income",
    data: [40, 10, 80, 30, 30, 75, 10, 30, 50],
  },
];

export const lineChartOptionsCRM2 = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    labels: {
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
  },
  legend: {
    show: false,
  },
  grid: {
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: false,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.5,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: [],
    },
    colors: ["#3182CE"],
  },
  colors: ["#3182CE"],
};

export const lineChartDataGeneral = [
  {
    name: "Tasks",
    data: [30, 32, 27, 30, 35, 30, 25, 33, 27],
  },
];

export const lineChartOptionsGeneral = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  markers: {
    size: 3,
    colors: "#3182CE",
    strokeColors: "#3182CE",
    strokeWidth: 2,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: "circle",
    radius: 2,
    offsetX: 0,
    offsetY: 0,
    showNullDataPoints: true,
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    labels: {
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
  },
  legend: {
    show: false,
  },
  grid: {
    strokeDashArray: 5,
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.5,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: [],
    },
    colors: ["#3182CE"],
  },
  colors: ["#3182CE"],
};

export const lineChartDataWidgets1 = [
  {
    name: "Income",
    data: [30, 32, 27, 30, 35, 30, 25, 33, 27],
  },
];

export const lineChartOptionsWidgets1 = {
  chart: {
    toolbar: {
      show: false,
    },
    width: 700,
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    labels: {
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
  },
  legend: {
    show: false,
  },
  grid: {
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: false,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.5,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: [],
    },
    colors: ["#3182CE"],
  },
  colors: ["#3182CE"],
};

export const lineChartDataWidgets2 = [
  {
    name: "Tasks",
    data: [30, 32, 27, 30, 35, 30, 25, 33, 27],
  },
];

export const lineChartOptionsWidgets2 = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  markers: {
    size: 3,
    colors: "#3182CE",
    strokeColors: "#3182CE",
    strokeWidth: 2,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: "circle",
    radius: 2,
    offsetX: 0,
    offsetY: 0,
    showNullDataPoints: true,
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    labels: {
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
  },
  legend: {
    show: false,
  },
  grid: {
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: false,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.5,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: [],
    },
    colors: ["#3182CE"],
  },
  colors: ["#3182CE"],
};

export const lineChartDataWidgets3 = [
  {
    name: "Calories",
    data: [30, 32, 27, 30, 35, 30, 25, 33, 27],
  },
];

export const lineChartOptionsWidgets3 = {
  chart: {
    toolbar: {
      show: false,
    },
    width: 700,
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    type: "datetime",
    categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    labels: {
      show: false,
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
  },
  yaxis: {
    labels: {
      show: false,
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
  },
  legend: {
    show: false,
  },
  grid: {
    show: false,
    strokeDashArray: 5,
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.5,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: [],
    },
    colors: ["#000000"],
  },
  colors: ["#000000"],
};

export const donutChartOptionsGeneral = {
  series: [75, 25],
  labels: ["Done", "In progress"],
  colors: ["#3182CE", "lightgray"],
  chart: {
    height: 500,
    width: "100%",
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  hover: { mode: null },
  plotOptions: {
    donut: {
      expandOnClick: false,
      donut: {
        labels: {
          show: false,
        },
      },
    },
  },
  fill: {
    colors: ["#3182CE", "lightgray"],
  },
  tooltip: {
    enabled: true,
    theme: "dark",
  },
};

export const donutChartDataGeneral = [75, 25];

export const lineChartDataCharts1 = [
  {
    name: "Organic Search",
    data: [330, 150, 300, 220, 500, 250, 400, 230, 500],
  },
  {
    name: "Referral",
    data: [500, 400, 40, 140, 290, 290, 340, 230, 200],
  },
  {
    name: "Direct",
    data: [45, 23, 550, 33, 290, 150, 230, 340, 100],
  },
];

export const lineChartOptionsCharts1 = {
  chart: {
    toolbar: {
      show: false,
    },
    type: "line",
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    labels: {
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
  },
  legend: {
    show: false,
  },
  gradient: false,
  grid: {
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  markers: {
    size: 4,
    colors: ["#3182CE", "#000000", "#FF5733"],
    strokeColors: ["#3182CE", "#000000", "#FF5733"],
    strokeWidth: 2,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: "circle",
    radius: 2,
    offsetX: 0,
    offsetY: 0,
    showNullDataPoints: true,
  },
  fill: {
    type: "solid",
    colors: ["#fff", "#fff", "#fff"],
    opacity: "0.1",
  },
  colors: ["#3182CE", "#000000", "#FF5733"],
};

export const lineChartDataCharts2 = [
  {
    name: "Mobile apps",
    data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
  },
  {
    name: "Websites",
    data: [400, 500, 40, 140, 290, 290, 340, 230, 400],
  },
];

export const lineChartOptionsCharts2 = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    labels: {
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
  },
  legend: {
    show: false,
  },
  grid: {
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: false,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      shadeIntensity: 0.5,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: [],
    },
    colors: ["#3182CE", "#000000"],
  },
  colors: ["#3182CE", "#000000"],
};

export const barChartDataCharts1 = [
  {
    name: "Sales by age",
    data: [20, 30, 40, 20, 45, 30],
  },
];

export const barChartOptionsCharts1 = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: undefined,
    },
    theme: "dark",
  },
  xaxis: {
    categories: ["16-20", "21-25", "26-30", "31-35", "36-42", "42+"],
    show: true,
    labels: {
      show: true,
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
    color: "black",
    labels: {
      show: true,
      style: {
        colors: "#CBD5E0",
        fontSize: "14px",
      },
    },
  },
  grid: {
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: "solid",
    colors: ["#000000"],
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 8,
      columnWidth: "40px",
    },
  },
};

export const barChartDataCharts2 = [
  {
    name: "Sales by age",
    data: [20, 30, 40, 20, 45],
  },
];

export const barChartOptionsCharts2 = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: "12px",
    },
    theme: "dark",
  },
  xaxis: {
    categories: ["16-20", "21-26", "26-30", "31-42", "42+"],
    show: true,
    labels: {
      show: true,
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
    color: "black",
    labels: {
      show: true,
      style: {
        colors: "#CBD5E0",
        fontSize: "14px",
      },
    },
  },
  grid: {
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: "solid",
    colors: ["#000000"],
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      horizontal: true,
      borderRadius: 8,
      columnWidth: "40px",
    },
  },
};

export const lineBarChartData = [
  {
    name: "Organic Search",
    type: "bar",
    data: [440, 505, 414, 671, 160, 550, 350, 138],
  },
  {
    name: "Referral",
    type: "line",
    data: [232, 421, 352, 273, 143, 222, 173, 311],
  },
];

export const lineBarChartOptions = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    labels: {
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
  },
  legend: {
    show: false,
  },
  grid: {
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  fill: {
    type: "solid",
    gradient: {
      type: "vertical",
      shadeIntensity: 0.5,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: [],
    },
    colors: ["#000000", "#3182CE"],
  },
  plotOptions: {
    bar: {
      borderRadius: 2,
      columnWidth: "8px",
    },
  },
  colors: ["#000000", "#3182CE"],
};

function generateData(baseval, count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
    var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

    series.push([x, y, z]);
    baseval += 86400000;
    i++;
  }
  return series;
}

export const bubbleChartData = [
  {
    name: "Dataset 1",
    data: generateData(new Date("11 Feb 2017 GMT").getTime(), 10, {
      min: 10,
      max: 30,
    }),
  },
  {
    name: "Dataset 2",
    data: generateData(new Date("11 Feb 2017 GMT").getTime(), 10, {
      min: 10,
      max: 30,
    }),
  },
];

export const bubbleChartOptions = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    labels: {
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
  },
  legend: {
    show: false,
  },
  grid: {
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  fill: {
    type: "solid",
    gradient: {
      // shade: "light",
      type: "vertical",
      shadeIntensity: 0.5,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: [],
    },
    colors: ["#000000", "#3182CE"],
  },
  plotOptions: {
    bar: {
      borderRadius: 2,
      columnWidth: "8px",
    },
  },
  colors: ["#000000", "#3182CE"],
};

export const donutChartOptionsCharts1 = {
  series: [50, 15, 10, 20, 5],
  labels: ["Dev.to", "Creative Tim", "Github", "Bootsnipp", "Codeinwp"],
  colors: ["#63B3ED", "#4299E1", "#3182CE", "#2B6CB0", "#2C5282", "#2A4365"],
  chart: {
    width: "100%",
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  hover: { mode: null },
  plotOptions: {
    donut: {
      expandOnClick: false,
      donut: {
        labels: {
          show: false,
        },
      },
    },
  },

  fill: {
    colors: ["#63B3ED", "#4299E1", "#3182CE", "#2B6CB0", "#2C5282", "#2A4365"],
  },
  tooltip: {
    enabled: true,
    theme: "dark",
  },
};

export const donutChartDataCharts1 = [50, 15, 10, 20, 5];

export const pieChartOptionsCharts1 = {
  labels: ["Dev.to", "Creative Tim", "Github"],
  colors: ["#4299E1", "#3182CE", "#2B6CB0"],
  chart: {
    width: "100%",
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  hover: { mode: null },
  plotOptions: {
    donut: {
      expandOnClick: false,
      donut: {
        labels: {
          show: false,
        },
      },
    },
  },
  fill: {
    colors: ["#4299E1", "#3182CE", "#2B6CB0"],
  },
  tooltip: {
    enabled: true,
    theme: "dark",
  },
};

export const pieChartDataCharts1 = [70, 10, 20];

export const radarChartOptionsCharts = {
  chart: {
    type: "radar",
    toolbar: {
      show: false,
    },
  },
  labels: ["Travel", "Shopping", "Food", "Grocery", "Security", "Others"],
  colors: ["#3182CE", "#333"],
  chart: {
    width: "100%",
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
  },
  yaxis: {
    show: false,
  },
  markers: {
    show: false,
    enabled: false,
  },
  xaxis: {
    labels: {
      style: {
        fontSize: "20px",
        color: "#8F9BBA",
      },
    },
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["#000000", "#333"],
    dashArray: 0,
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    colors: ["#000000", "#333"],
  },
  tooltip: {
    enabled: true,
    theme: "dark",
  },
};

export const radarChartDataCharts = [
  {
    name: "Subject 1",
    data: [45, 52, 38, 24, 33, 10],
  },
  {
    name: "Subject 2",
    data: [26, 21, 20, 6, 8, 15],
  },
];

export const polarChartOptionsCharts = {
  chart: {
    type: "polarArea",
    toolbar: {
      show: false,
    },
  },
  labels: ["Subject 1", "Subject2", "Subject 3", "Subject 4"],
  colors: ["#4299E1", "#3182CE", "#2B6CB0", "#2C5282"],
  chart: {
    width: "100%",
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
  },
  yaxis: {
    show: false,
    labels: {
      style: {
        fontSize: "14px",
        color: "#8F9BBA",
      },
    },
  },
  markers: {
    show: false,
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["#4299E1", "#3182CE", "#2B6CB0", "#2C5282"],
    dashArray: 0,
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    type: "solid",
    opacity: 1,
    colors: ["#4299E1", "#3182CE", "#2B6CB0", "#2C5282"],
  },
  tooltip: {
    enabled: true,
    theme: "dark",
  },
};

export const polarChartDataCharts = [7, 14, 20, 25];

export const lineChartDataCalendar = [
  {
    name: "Visitors",
    data: [30, 100, 40, 120, 50, 130, 60, 143, 70],
  },
];

export const lineChartOptionsCalendar = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    color: ["#fff"],
  },
  xaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    type: "datetime",
    categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    labels: {
      show: false,
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
  },
  yaxis: {
    labels: {
      show: false,
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
  },
  legend: {
    show: false,
  },
  grid: {
    show: false,
    strokeDashArray: 5,
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.5,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: [],
    },
    colors: ["#fff"],
  },
  colors: ["#fff"],
};

export const barChartDataRTL = [
  {
    name: "Sales",
    data: [330, 250, 110, 300, 490, 350, 270, 130, 425],
  },
];

export const barChartOptionsRTL = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: undefined,
    },
    theme: "dark",
  },
  xaxis: {
    categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    show: false,
    labels: {
      show: false,
      style: {
        colors: "#fff",
        fontSize: "12px",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
    color: "#fff",
    labels: {
      show: true,
      style: {
        colors: "#fff",
        fontSize: "10px",
      },
    },
  },
  grid: {
    show: false,
  },
  fill: {
    colors: "#fff",
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 8,
      columnWidth: "12px",
    },
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
          },
        },
      },
    },
  ],
};

export const lineChartDataRTL = [
  {
    name: "Mobile apps",
    data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
  },
  {
    name: "Websites",
    data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
  },
];

export const lineChartOptionsRTL = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    labels: {
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
  },
  legend: {
    show: false,
  },
  grid: {
    strokeDashArray: 5,
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.5,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: [],
    },
    colors: ["#3182CE", "#000000"],
  },
  colors: ["#3182CE", "#000000"],
};

export const barChartDataSmartHome = [
  {
    name: "Sales by day",
    data: [150, 200, 100, 300, 400, 170],
  },
];

export const barChartOptionsSmartHome = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: undefined,
    },
    onDatasetHover: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
    },
    theme: "dark",
  },
  xaxis: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    show: true,
    labels: {
      show: true,
      style: {
        colors: "#A0AEC0",
        fontSize: "12px",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
    color: "black",
    labels: {
      show: true,
      style: {
        colors: "#A0AEC0",
        fontSize: "14px",
      },
    },
  },
  grid: {
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: "solid",
    colors: ["#A0AEC0"],
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 8,
      columnWidth: "20px",
    },
  },
};
