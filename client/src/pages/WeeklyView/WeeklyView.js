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
  const apiBody = process.env.REACT_APP_API_URL;
  const token = sessionStorage.getItem('token');

  const [firstDay, setFirstDay] = useState(startOfWeek);
  const [lastDay, setLastDay] = useState(endOfWeek);
  const [weekData, setWeekData] = useState([]);
  // const [daysOfWeek, setDaysOfWeek] = useState([]);

  useEffect(() => {
    const getDaysOfWeek = () => {
      const days = [];
      const currentDay = new Date(firstDay);
      while (currentDay <= lastDay) {
        days.push(new Date(currentDay));
        currentDay.setDate(currentDay.getDate() + 1);
      }
      return days;
    };
    const fillMissingDays = (data) => {
      const daysOfWeek = getDaysOfWeek();
      // data.forEach((day) => {
      //   console.log(day.created_at.substring(0, 10));
      // });
      // console.log(daysOfWeek.toLocaleString().substring(0, 10));
      // data.forEach((day) =>
      //   console.log(
      //     new Date(day.created_at.substring(0, 23)).toLocaleDateString()
      //   )
      // );
      const processedData = daysOfWeek.map((day) => {
        const matchingData = data.find(
          (item) =>
            new Date(item.created_at.substring(0, 23)).toLocaleDateString() ===
            day.toLocaleDateString()
        );
        if (matchingData) {
          matchingData.created_at = new Date(
            matchingData.created_at.substring(0, 23)
          ).toLocaleDateString();
          return matchingData;
        }
        return {
          created_at: day.toLocaleDateString(),
          waterLevel: 0,
          coffeeLevel: 0,
        };
      });
      return processedData;
    };
    const getAllWeekData = async () => {
      try {
        const result = await axios.get(
          `${apiBody}/hydration/week/startOfWeek/${firstDay.toDateString()}/endOfWeek/${lastDay.toDateString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const processedData = fillMissingDays(result.data);
        console.log(processedData);

        // setFirstDay(startOfWeek);
        // setLastDay(endOfWeek);
        setWeekData(processedData);
      } catch (e) {
        console.log('error fetching weekly data', e);
      }
    };
    getDaysOfWeek();
    getAllWeekData();
  }, [token, apiBody, firstDay, lastDay]);

  if (!weekData) {
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
        <h2>{`${firstDay.toLocaleDateString()} - ${lastDay.toLocaleDateString()}`}</h2>
        <Link to={`/week/2`}>
          <img
            src={rightArrow}
            alt='right arrow'
            className='week__title--arrow'
          />
        </Link>
      </div>

      <div className='week__chart'>
        <LineChart chartData={weekData} />
      </div>
    </div>
  );
}
