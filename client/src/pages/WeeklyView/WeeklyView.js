import React, { useState, useEffect } from "react";
import axios from "axios";
import rightArrow from "../../assets/arrow-right-3098.svg";
import leftArrow from "../../assets/arrow-left-3099.svg";
import "./WeeklyView.scss";
import LineChart from "../../components/LineChart/LineChart";

const today = new Date();
let startOfWeek = new Date(today);
startOfWeek.setDate(today.getDate() - today.getDay());
let endOfWeek = new Date(startOfWeek);
endOfWeek.setDate(startOfWeek.getDate() + 6);

export default function WeeklyView() {
  const apiBody = process.env.REACT_APP_API_URL;
  const token = sessionStorage.getItem("token");

  const [firstDay, setFirstDay] = useState(startOfWeek);
  const [lastDay, setLastDay] = useState(endOfWeek);
  const [weekData, setWeekData] = useState([]);
  const [isCurrWeek, setIsCurrWeek] = useState(true);

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
        setWeekData(processedData);
      } catch (e) {
        console.log("error fetching weekly data", e);
      }
    };
    getDaysOfWeek();
    getAllWeekData();
  }, [token, apiBody, firstDay, lastDay]);

  const handleBackClick = () => {
    const startLastWeek = new Date(firstDay);
    startLastWeek.setDate(firstDay.getDate() - 7);
    const endLastWeek = new Date(lastDay);
    endLastWeek.setDate(lastDay.getDate() - 7);
    setFirstDay(startLastWeek);
    setLastDay(endLastWeek);
  };

  const handleFrontClick = () => {
    const startNextWeek = new Date(firstDay);
    startNextWeek.setDate(firstDay.getDate() + 7);
    const endNextWeek = new Date(lastDay);
    endNextWeek.setDate(lastDay.getDate() + 7);
    setFirstDay(startNextWeek);
    setLastDay(endNextWeek);
  };

  if (!weekData) {
    return <h2>Loading....</h2>;
  }

  return (
    <div className="week">
      <div className="week__container">
        <div className="week__title">
          <img
            src={leftArrow}
            alt="left arrow"
            className="week__title--arrow"
            onClick={handleBackClick}
          />
          <h2>{`${firstDay.toLocaleDateString()} - ${lastDay.toLocaleDateString()}`}</h2>
          <img
            src={rightArrow}
            alt="right arrow"
            className={`week__title--arrow ${isCurrWeek ? "hide" : ""}`}
            onClick={handleFrontClick}
          />
        </div>

        <div className="week__chart">
          <LineChart chartData={weekData} setIsCurrWeek={setIsCurrWeek} />
        </div>
      </div>
    </div>
  );
}
