import "./App.css";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Data } from "./utils/data";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale);

function App() {
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.drink),
    datasets: [
      {
        data: Data.map((data) => data.value),
        backgroundColor: ["brown", "blue"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <div className="App">
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Hydration",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}

export default App;
