import './App.css';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useState } from 'react';
import { Data } from './utils/data';
import { Bar } from 'react-chartjs-2';
import WeeklyView from './pages/WeeklyView/WeeklyView';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';

Chart.register(CategoryScale);

function App() {
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.drink),
    datasets: [
      {
        data: Data.map((data) => data.value),
        backgroundColor: ['brown', 'blue'],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/week' element={<WeeklyView />} />
        <Route path='/week/:weekId' element={<WeeklyView />} />
      </Routes>
    </BrowserRouter>
  );
}
