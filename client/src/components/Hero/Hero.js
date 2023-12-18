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
  const [currentDay, setCurrentDay] = useState(new Date());
  const { dayId } = useParams();
  const defaultDayId = '24';
  const [currentLevel, setCurrentLevel] = useState();
  const [water, setWater] = useState();
  const [coffee, setCoffee] = useState();
  const [status, setStatus] = useState('Get Hydrating!');

  const apiBody = process.env.REACT_APP_API_URL;
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const getUserData = async () => {
      let response;
      response = await axios.get(`${apiBody}/hydration`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.data[0]) {
        response = await axios.post(`${apiBody}/hydration`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setCurrentLevel(response.data[0]);
      setWater(response.data[0].waterLevel);
      setCoffee(response.data[0].coffeeLevel);
    };
    getUserData();
  }, [token, apiBody, coffee, water, currentLevel]);

  const handleClickFunctionCoffee = async (e) => {
    const apiBody = process.env.REACT_APP_API_URL;

    try {
      await axios.patch(`${apiBody}/hydration/coffee`, {
        id: currentLevel.id,
        coffeeLevel: coffee,
      });
      setCoffee(coffee + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickFunctionWater = async (e) => {
    const apiBody = process.env.REACT_APP_API_URL;

    try {
      await axios.patch(`${apiBody}/hydration/water`, {
        id: currentLevel.id,
        waterLevel: water,
      });
      setWater(water + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (water > coffee) {
      setStatus('Hydrated!');
    } else if (coffee > water) {
      setStatus('Dydrated :(');
    } else {
      setStatus('Hydrate or Dydrate!');
    }
  }, [water, coffee]);

  if (!currentDay) return <h2>loading</h2>;

  return (
    <div className='hero'>
      <article className='top-banner'>
        <h2 className='top-banner__text1'>{`${currentDay
          .toLocaleDateString()
          .substring(0, 10)}`}</h2>
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
        <h2>{status}</h2>
      </article>
      <Link to='/week' className='button-link'>
        <button className='week-button'>See weekly progress</button>
      </Link>
    </div>
  );
};

export default Hero;
