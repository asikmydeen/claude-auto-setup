import React from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

export default function CRMChart() {
  const chartRef = React.useRef(null);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const ctx2 = chartRef.current;

    var gradientStroke1 = ctx2.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke1.addColorStop(1, "rgba(24,144,255,0.2)");
    gradientStroke1.addColorStop(0.2, "rgba(72,72,176,0.0)");
    gradientStroke1.addColorStop(0, "rgba(203,12,159,0)");

    var gradientStroke2 = ctx2.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke2.addColorStop(1, "rgba(20,23,39,0.2)");
    gradientStroke2.addColorStop(0.2, "rgba(72,72,176,0.0)");
    gradientStroke2.addColorStop(0, "rgba(20,23,39,0)");

    setData({
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Visitors",
          tension: 0.5,
          pointRadius: 0,
          borderColor: "#1b91ff",
          borderWidth: 2,
          backgroundColor: gradientStroke1,
          data: [50, 45, 60, 60, 80, 65, 90, 80, 100],
          maxBarThickness: 6,
          fill: true,
        },
      ],
    });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      y: {
        grid: {
          drawBorder: false,
          display: false,
          drawOnChartArea: true,
          drawTicks: false,
          borderDash: [5, 5],
        },
        ticks: {
          display: true,
          padding: 10,
          color: "#9ca2b7",
        },
      },
      x: {
        grid: {
          drawBorder: false,
          display: true,
          drawOnChartArea: true,
          drawTicks: false,
          borderDash: [5, 5],
        },
        ticks: {
          display: true,
          padding: 10,
          color: "#9ca2b7",
        },
      },
    },
  };

  return (
    <>
      <Chart
        ref={chartRef}
        type="line"
        data={{
          labels: data?.labels || [],
          datasets: data?.datasets || [],
        }}
        options={options}
        height="100px"
      />
    </>
  );
}
