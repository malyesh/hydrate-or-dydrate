import "./Hero.scss";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Data } from "../../utils/data";
import { Bar } from "react-chartjs-2";
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

Chart.register(CategoryScale);

const Hero = () => {
  const [chartData, setChartData] = useState();

  const [currentDay, setCurrentDay] = useState(null);
  const { dayId } = useParams();
  const defaultDayId = "24";

  const getCurrentDay = async () => {
    const apiBody = process.env.REACT_APP_API_URL;
    const currentDayId = dayId || defaultDayId;
    const result = await axios.get(
      `${apiBody}/hydration/week/2/day/${currentDayId}`
    );
    setCurrentDay(result.data);

    console.log(result.data);
  };

  // {
  //   labels: Data.map((data) => data.drink),
  //   datasets: [
  //     {
  //       data: Data.map((data) => data.value),
  //       backgroundColor: ["#563635", "#80A4ED"],
  //       // borderColor: "black",
  //       borderWidth: 0,
  //     },
  //   ],
  // }

  let addChartData = async () => {
    let labelsArray = ["", ""];
    let waterValue = currentDay.waterLevel;
    let coffeeValue = currentDay.coffeeLevel;

    let chart = {
      labels: labelsArray,
      datasets: [
        { data: coffeeValue, backgroundColor: "#563635" },
        { data: waterValue, backgroundColor: "#80a4ED" },
      ],
    };

    // setChartData(chart);
    console.log(chart);
  };

  useEffect(() => {
    getCurrentDay(dayId);
    addChartData();
  }, [dayId]);

  if (!currentDay) return <h2>loading</h2>;

  return (
    <div className="hero">
      <article className="top-banner">
        <h3 className="top-banner__text1">
          {`${currentDay.dayOfWeek} ${currentDay.date}`}
        </h3>
      </article>
      <section className="chart">
        <h2 className="chart__title">HYDRATION LEVELS</h2>
        <Bar
          data={chartData}
          options={{
            scales: {
              xAxes: [
                {
                  ticks: { size: 20 },
                },
              ],
            },
            plugins: {
              title: {
                display: false,
                text: "Hydration",
              },
              legend: {
                display: false,
                labels: {
                  font: {
                    size: 20,
                  },
                },
              },
            },
          }}
        />
      </section>
      <article className="hydration">
        <h3 className="hydration__title">Hydration Status</h3>
        <p>{currentDay.hydrationLevel}</p>
      </article>
      <Link to="/week" className="button-link">
        <button className="week-button">See weekly progress</button>
      </Link>
    </div>
  );
};

export default Hero;
