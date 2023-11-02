import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Data } from '../../utils/data';

import './BarChart.scss';

export default function BarChart({ currentDay }) {
  const [chartData, setChartData] = useState();

  let addChartData = async () => {
    let labelsArray = ['', ''];
    let waterValue = currentDay.waterLevel;
    let coffeeValue = currentDay.coffeeLevel;

    let chart = {
      labels: labelsArray,
      datasets: [
        { data: coffeeValue, backgroundColor: '#563635' },
        { data: waterValue, backgroundColor: '#80a4ED' },
      ],
    };

    setChartData(chart);
    // console.log(chart);
  };

  useEffect(() => {
    // getCurrentDay(dayId);
    addChartData();
  }, [currentDay]);

  return (
    <section className='chart'>
      <Bar
        data={chartData}
        options={{
          scales: {
            x: {
              ticks: {
                font: {
                  size: 0,
                },
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: 'Hydration',
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
  );
}
