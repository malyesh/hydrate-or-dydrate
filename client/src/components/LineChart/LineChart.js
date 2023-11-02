import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import './LineChart.scss';

export default function LineChart({ chartData }) {
  const [data, setData] = useState(null);

  const { weekId } = useParams();

  console.log(chartData);

  const addChartData = () => {
    console.log(chartData.days);
    let labelsArray = chartData.days.map((day) => day.dayOfWeek);
    let waterValues = chartData.days.map((day) => day.waterLevel);
    let coffeeValues = chartData.days.map((day) => day.coffeeLevel);
    // console.log(labelsArray);
    let chart = {
      labels: labelsArray,
      datasets: [
        {
          label: 'Coffee Drinked',
          data: coffeeValues,
          borderColor: 'brown',
          backgroundColor: 'brown',
        },
        {
          label: 'Water Drinked',
          data: waterValues,
          borderColor: 'blue',
          backgroundColor: 'blue',
        },
      ],
    };
    // console.log(chart);
    setData(chart);
  };

  useEffect(() => {
    addChartData();
  }, [weekId]);

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='chart-container'>
      <Line
        data={data}
        width={'80%'}
        height={'80%'}
        options={{
          plugins: {
            title: {
              display: false,
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
