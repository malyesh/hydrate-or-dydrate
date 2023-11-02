import './App.css';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import WeeklyView from './pages/WeeklyView/WeeklyView';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';

Chart.register(CategoryScale);

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/week' element={<WeeklyView />} />
        <Route path='/week/:weekId' element={<WeeklyView />} />
      </Routes>
    </BrowserRouter>
  );
}
