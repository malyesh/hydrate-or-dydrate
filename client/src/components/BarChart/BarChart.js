import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Data } from '../../utils/data';

import './BarChart.scss';

export default function BarChart() {
  const chartData = {
    labels: ['', ''],
    datasets: [
      {
        data: Data.map((data) => data.value),
        backgroundColor: ['#563635', '#80A4ED'],
        borderWidth: 0,
      },
    ],
  };

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
