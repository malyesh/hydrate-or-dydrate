import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import rightArrow from '../../assets/arrow-right-3098.svg';
import leftArrow from '../../assets/arrow-left-3099.svg';
import './WeeklyView.scss';
import LineChart from '../../components/LineChart/LineChart';

export default function WeeklyView() {
  const [allWeeks, setAllWeeks] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(null);

  const { weekId } = useParams();

  const apiBody = process.env.REACT_APP_API_URL;

  const getAllWeekData = async () => {
    const result = await axios.get(`${apiBody}/hydration`);
    setAllWeeks(result.data);

    const currentWeekId = weekId || result.data[1].id;
    const selectedWeekData = await axios.get(
      `${apiBody}/hydration/week/${currentWeekId}`
    );
    setCurrentWeek(selectedWeekData.data);
  };

  useEffect(() => {
    getAllWeekData();
  }, [weekId]);

  if (!currentWeek) {
    return <h2>Loading....</h2>;
  }
  console.log(currentWeek);
  return (
    <div>
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

      <div className='week-chart'>
        <LineChart chartData={currentWeek} />
      </div>
    </div>
  );
}
