import './Hero.scss';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import BarChart from '../BarChart/BarChart';
import coffeeImage from '../../assets/images/coffee-bean-for-a-coffee-break-svgrepo-com.svg';
import waterImage from '../../assets/images/water-drop-svgrepo-com.svg';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

Chart.register(CategoryScale);

const Hero = () => {
  const [currentDay, setCurrentDay] = useState(null);
  const { dayId } = useParams();
  const defaultDayId = '24';
  const [water, setWater] = useState();
  const [coffee, setCoffee] = useState();
  const [status, setStatus] = useState('Get Hydrating!');

  const handleClickFunctionCoffee = async (e) => {
    const apiBody = process.env.REACT_APP_API_URL;
    const result = await axios.get(`${apiBody}/hydration/week/2/day/24`);
    try {
      const newLevel = await axios.patch(`${apiBody}/hydration/week/2/day/24`, {
        coffeeLevel: result.data.coffeeLevel + 1,
        for: 'coffee',
      });
      setCoffee(newLevel.data.coffeeLevel);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickFunctionWater = async (e) => {
    const apiBody = process.env.REACT_APP_API_URL;
    const result = await axios.get(`${apiBody}/hydration/week/2/day/24`);
    try {
      const newLevel = await axios.patch(`${apiBody}/hydration/week/2/day/24`, {
        waterLevel: result.data.waterLevel + 1,
        for: 'water',
      });
      setWater(newLevel.data.waterLevel);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentDay = async () => {
    const apiBody = process.env.REACT_APP_API_URL;
    const currentDayId = dayId || defaultDayId;
    const result = await axios.get(
      `${apiBody}/hydration/week/2/day/${currentDayId}`
    );
    setCurrentDay(result.data);
    setWater(result.data.waterLevel);
    setCoffee(result.data.coffeeLevel);

    if (water > coffee) {
      setStatus('Hydrated!');
    }
    if (water < coffee) {
      setStatus('Dydrated :(');
    }
    if (water === coffee) {
      setStatus('Hydrate or Dydrate!');
    }
  };

  useEffect(() => {
    getCurrentDay();
  }, [dayId, water, coffee]);

  if (!currentDay) return <h2>loading</h2>;

  return (
    <div className='hero'>
      <article className='top-banner'>
        <h3 className='top-banner__text1'>
          {`${currentDay.dayOfWeek} ${currentDay.date}`}
        </h3>
      </article>
      <BarChart currentDay={currentDay} waterLvl={water} coffeeLvl={coffee} />
      <div className='chart__label'>
        <img
          className='chart__label--item'
          src={coffeeImage}
          alt='coffee bean'
          id='coffeeLevel'
          onClick={handleClickFunctionCoffee}
        />
        <img
          className='chart__label--item'
          src={waterImage}
          alt='water cup'
          id='waterLevel'
          onClick={handleClickFunctionWater}
        />
      </div>
      <article className='hydration'>
        <h3 className='hydration__title'>Hydration Status</h3>
        <p>{status}</p>
      </article>
      <Link to='/week' className='button-link'>
        <button className='week-button'>See weekly progress</button>
      </Link>
    </div>
  );
};

export default Hero;
