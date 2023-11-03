import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import './BarChart.scss';

export default function BarChart({ currentDay, waterLvl, coffeeLvl }) {
  const chartData = {
    labels: ['', ''],
    datasets: [
      {
        label: 'hydration',
        data: [coffeeLvl, waterLvl],
        backgroundColor: ['#563635', '#80a4ED'],
      },
    ],
  };
  return (
    <section className='chart'>
      <h2 className='chart__title'>HYDRATION LEVELS</h2>
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
              display: false,
              text: 'Hydration',
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </section>
  );
}
