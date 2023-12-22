import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./LineChart.scss";
import isEqual from "lodash/isEqual";

export default function LineChart({ chartData }) {
  const [data, setData] = useState(null);

  console.table(chartData);

  useEffect(() => {
    const addChartData = async () => {
      let labelsArray = chartData.map((day) => day.created_at);
      let waterValues = chartData.map((day) => day.waterLevel);
      let coffeeValues = chartData.map((day) => day.coffeeLevel);
      let chart = {
        labels: labelsArray,
        datasets: [
          {
            label: "Coffee Drinked",
            data: coffeeValues,
            borderColor: "#563635",
            backgroundColor: "#563635",
          },
          {
            label: "Water Drinked",
            data: waterValues,
            borderColor: "#80a4ed",
            backgroundColor: "#80a4ed",
          },
        ],
      };
      {
        setData(chart);
      }
    };
    addChartData();
  }, [chartData]);

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="chart-container">
      <Line
        className="line-chart"
        data={data}
        width={"80%"}
        height={"80%"}
        options={{
          plugins: {
            title: {
              display: false,
            },
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              ticks: {
                font: {
                  size: 11,
                  family: '"Poppins", Arial, Helvetica, sans-serif',
                },
              },
            },
            y: {
              ticks: {
                font: {
                  size: 11,
                  family: '"Poppins", Arial, Helvetica, sans-serif',
                },
              },
            },
          },
        }}
      />
    </div>
  );
}
