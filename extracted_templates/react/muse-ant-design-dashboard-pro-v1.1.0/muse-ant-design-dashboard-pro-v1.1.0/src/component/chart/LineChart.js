import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
const { Paragraph } = Typography;
export default class LineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Mobile apps",
          data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
          offsetY: 0,
        },
        {
          name: "Websites",
          data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
          offsetY: 0,
        },
      ],

      options: {
        chart: {
          width: "100%",
          height: 350,
          type: "area",
          toolbar: {
            show: false,
          },
        },

        legend: {
          show: false,
        },

        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          colors: ["#1890FF", "#B37FEB"],
          width: 3,
        },

        yaxis: {
          labels: {
            style: {
              fontSize: "14px",
              fontWeight: 600,
              colors: ["#8c8c8c"],
            },
            offsetY: -50,
          },
        },

        xaxis: {
          labels: {
            style: {
              fontSize: "14px",
              fontWeight: 600,
              colors: [
                "#8c8c8c",
                "#8c8c8c",
                "#8c8c8c",
                "#8c8c8c",
                "#8c8c8c",
                "#8c8c8c",
                "#8c8c8c",
                "#8c8c8c",
                "#8c8c8c",
              ],
            },
          },
          categories: [
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
          ],
        },

        grid: {
          show: true,
          borderColor: "rgba(0, 0, 0, .2)",

          strokeDashArray: 6,
          position: "back",
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
          row: {
            colors: undefined,
            opacity: 0.5,
          },
          column: {
            colors: undefined,
            opacity: 0.5,
          },
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },

        tooltip: {
          y: {
            formatter: function (val) {
              return val;
            },
          },
        },
      },
    };
  }
  render() {
    return (
      <>
        <div className="linechart">
          <div>
            <h6>Sales Overview</h6>
            <Paragraph className="lastweek">
              than last week <span className="bnb2">+20%</span>
            </Paragraph>
          </div>
          <div className="sales">
            <ul>
              <li>{<MinusOutlined />} Traffic</li>
              <li>{<MinusOutlined />} Sales</li>
            </ul>
          </div>
        </div>

        <ReactApexChart
          className="full-width"
          options={this.state.options}
          series={this.state.series}
          type="area"
          height={350}
          width={"100%"}
        />
      </>
    );
  }
}
