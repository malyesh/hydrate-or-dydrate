import './Hero.scss';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useState, useEffect, useRef } from 'react';
import { Data } from '../../utils/data';
import BarChart from '../BarChart/BarChart';
import coffeeImage from '../../assets/images/coffee-bean-for-a-coffee-break-svgrepo-com.svg';
import waterImage from '../../assets/images/water-drop-svgrepo-com.svg';
import axios from 'axios';

Chart.register(CategoryScale);

const Hero = () => {
  const [chart, setChart] = useState();

  const handleClickFunction = async (e) => {
    console.log(e.target.id);
    // let level = e.target.id;

    const apiBody = process.env.REACT_APP_API_URL;
    const result = await axios.get(`${apiBody}/hydration/week/2/day/24`);

    console.log(result.data.waterLevel);
    const newLevel = await axios.patch(`${apiBody}/hydration/week/2/day/24`, {
      waterLevel: Number(result.data.waterLevel) + 1,
    });
  };

  console.log(chart);

  return (
    <div className='hero'>
      <article className='top-banner'>
        <h2 className='banner__text'>You are XX% hydrated</h2>
      </article>
      <BarChart />
      <div className='chart__label'>
        <img
          className='chart__label--item'
          src={coffeeImage}
          alt='coffee bean'
          id='coffeeLevel'
          onClick={handleClickFunction}
        />
        <img
          className='chart__label--item'
          src={waterImage}
          alt='water cup'
          id='waterLevel'
          onClick={handleClickFunction}
        />
      </div>
      <article className='hydration'>
        <h3 className='hydration__title'>Hydration Status</h3>
        <p>Dehydrated</p>
      </article>
      <button className='week-button'>See weekly progress</button>
    </div>
  );
};

export default Hero;
