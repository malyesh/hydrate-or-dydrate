import "./Hero.scss";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Data } from "../../utils/data";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale);

const Hero = () => {
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.drink),
    datasets: [
      {
        data: Data.map((data) => data.value),
        backgroundColor: ["#563635", "#81F0E5"],
        // borderColor: "black",
        borderWidth: 0,
      },
    ],
  });

  return (
    <div className="hero">
      <article className="top-banner">
        <h2 className="banner__text">You are XX% hydrated</h2>
      </article>
      <section className="chart">
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
      </section>
      <article className="hydration">
        <h3 className="hydration__title">Hydration Status</h3>
        <p>Dehydrated</p>
      </article>
      <button className="more-button">Learn more</button>
    </div>
  );
};

export default Hero;
