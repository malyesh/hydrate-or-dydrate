import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import rightArrow from "../../assets/arrow-right-3098.svg";
import leftArrow from "../../assets/arrow-left-3099.svg";
import "./WeeklyView.scss";
import LineChart from "../../components/LineChart/LineChart";

export default function WeeklyView() {
  const apiBody = process.env.REACT_APP_API_URL;
  const token = sessionStorage.getItem("token");

  const today = new Date();
  let startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  let endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const [firstDay, setFirstDay] = useState(startOfWeek);
  const [lastDay, setLastDay] = useState(endOfWeek);
  const [weekData, setWeekData] = useState([]);

  useEffect(() => {
    const getAllWeekData = async () => {
      try {
        const result = await axios.get(
          `${apiBody}/hydration/week/startOfWeek/${startOfWeek.toISOString()}/endOfWeek/${endOfWeek.toISOString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFirstDay(startOfWeek);
        setLastDay(endOfWeek);
        setWeekData(result.data);
        console.log(result.data.id);
      } catch (e) {
        console.log("error fetching weekly data", e);
      }
    };
    getAllWeekData();
  }, [token, apiBody, startOfWeek, endOfWeek]);

  if (!weekData) {
    return <h2>Loading....</h2>;
  }
  return (
    <div className="week__container">
      <div className="week__title">
        <Link to={"/week/1"}>
          <img
            src={leftArrow}
            alt="left arrow"
            className="week__title--arrow"
          />
        </Link>
        <h2>{`${firstDay} - ${lastDay}`}</h2>
        <Link to={`/week/2`}>
          <img
            src={rightArrow}
            alt="right arrow"
            className="week__title--arrow"
          />
        </Link>
      </div>

      <div className="week__chart">
        <LineChart chartData={weekData} />
      </div>
    </div>
  );
}
