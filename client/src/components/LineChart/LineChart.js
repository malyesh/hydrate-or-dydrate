import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./LineChart.scss";

const today = new Date();

export default function LineChart({ chartData, setIsCurrWeek }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const addChartData = async () => {
      let labelsArray = chartData.map((day) => {
        return day.created_at.substring(0, 10);
      });
      labelsArray.includes(today.toLocaleDateString())
        ? setIsCurrWeek(true)
        : setIsCurrWeek(false);

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

      setData(chart);
    };
    addChartData();
  }, [chartData, setIsCurrWeek]);

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
              min: 0,
              ticks: {
                font: {
                  size: 11,
                  family: '"Poppins", Arial, Helvetica, sans-serif',
                },
              },
            },
            y: {
              min: 0,
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
