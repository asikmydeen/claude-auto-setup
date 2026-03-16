import React, { Component } from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

export default class ChartRadar extends Component {
  render() {
    const data = {
      labels: [
        "English",
        "Maths",
        "Physics",
        "Chemistry",
        "Biology",
        "History",
      ],
      datasets: [
        {
          label: "Student A",
          backgroundColor: "rgba(58,65,111,0.2)",
          data: [65, 75, 70, 80, 60, 80],
          borderDash: [5, 5],
        },
        {
          label: "Student B",
          backgroundColor: "rgba(203,12,159,0.2)",
          data: [54, 65, 60, 70, 70, 75],
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          display: false,
        },
      },
    };
    return (
      <>
        <Chart type="radar" data={data} options={options} height={300} />
      </>
    );
  }
}
