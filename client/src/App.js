import './App.css';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import WeeklyView from './pages/WeeklyView/WeeklyView';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';

Chart.register(CategoryScale);

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<SignupPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/home' element={<HomePage />}></Route>
        <Route path='/:dayId' element={<HomePage />}></Route>
        <Route path='/week' element={<WeeklyView />} />
        <Route path='/week/:weekId' element={<WeeklyView />} />
      </Routes>
    </BrowserRouter>
  );
}
