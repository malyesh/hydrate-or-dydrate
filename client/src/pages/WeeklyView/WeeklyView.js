import React, { useState, useEffect } from 'react';
import { Link, matchRoutes, useParams } from 'react-router-dom';
import axios from 'axios';
import rightArrow from '../../assets/arrow-right-3098.svg';
import leftArrow from '../../assets/arrow-left-3099.svg';
import './WeeklyView.scss';
import LineChart from '../../components/LineChart/LineChart';

const today = new Date();
let startOfWeek = new Date(today);
startOfWeek.setDate(today.getDate() - today.getDay());
let endOfWeek = new Date(startOfWeek);
endOfWeek.setDate(startOfWeek.getDate() + 6);

export default function WeeklyView() {
  const [currentWeek, setCurrentWeek] = useState(null);

  const { weekId } = useParams();

  useEffect(() => {
    const getAllWeekData = async () => {
      const apiBody = process.env.REACT_APP_API_URL;
      const result = await axios.get(`${apiBody}/hydration`);

      const currentWeekId = weekId || result.data[1].id;
      const selectedWeekData = await axios.get(
        `${apiBody}/hydration/week/${currentWeekId}`
      );
      setCurrentWeek((prevData) => {
        return selectedWeekData.data;
      });
    };

    getAllWeekData();
  }, [weekId]);

  if (!currentWeek) {
    return <h2>Loading....</h2>;
  }
  return (
    <div className='week__container'>
      <div className='week__title'>
        <Link to={'/week/1'}>
          <img
            src={leftArrow}
            alt='left arrow'
            className='week__title--arrow'
          />
        </Link>
        <h2>{`${currentWeek.startDate} - ${currentWeek.endDate}`}</h2>
        <Link to={`/week/2`}>
          <img
            src={rightArrow}
            alt='right arrow'
            className='week__title--arrow'
          />
        </Link>
      </div>

      <div className='week__chart'>
        <LineChart chartData={currentWeek} weekId={weekId} />
      </div>
    </div>
  );
}
