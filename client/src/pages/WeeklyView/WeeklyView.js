import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import rightArrow from "../../assets/arrow-right-3098.svg";
import leftArrow from "../../assets/arrow-left-3099.svg";
import "./WeeklyView.scss";
import LineChart from "../../components/LineChart/LineChart";

export default function WeeklyView() {
  // const [currentWeek, setCurrentWeek] = useState(null);

  const apiBody = process.env.REACT_APP_API_URL;
  const token = sessionStorage.getItem("token");

  const today = new Date().toLocaleDateString().substring(0, 10);
  let startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  let endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const [firstDay, setFirstDay] = useState(today);
  const [lastDay, setLastDay] = useState(today + 6);

  useEffect(() => {
    // const getAllWeekData = async () => {
    //   await axios.get(
    //     `${apiBody}/hydration/week/startOfWeek/${startOfWeek}/endOfWeek/${endOfWeek}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    //   // const currentWeekId = weekId || result.data[1].id;
    //   // const selectedWeekData = await axios.get(
    //   //   `${apiBody}/hydration/week/${currentWeekId}`
    //   // );
    //   // setCurrentWeek((prevData) => {
    //   //   return selectedWeekData.data;
    //   // });
    //   return selectedWeekData.data();
    // };

    const getAllWeekData = async () => {
      try {
        const result = await axios.get(
          `${apiBody}/hydration/week/starOfWeek/${startOfWeek}/endOfWeek/${endOfWeek}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFirstDay(startOfWeek);
        setLastDay(startOfWeek + 6);
      } catch (e) {
        console.log("needs new row");
      }
    };
    getAllWeekData();
  }, [token, apiBody]);

  // useEffect(() => {
  //   const getAllWeekData = async () => {
  //     const apiBody = process.env.REACT_APP_API_URL;
  //     const result = await axios.get(`${apiBody}/hydration`);

  //     const currentWeekId = weekId || result.data[1].id;
  //     const selectedWeekData = await axios.get(
  //       `${apiBody}/hydration/week/${currentWeekId}`
  //     );
  //     setCurrentWeek((prevData) => {
  //       return selectedWeekData.data;
  //     });
  //   };

  //   getAllWeekData();
  // }, [weekId]);

  if (!currentWeek) {
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
        <LineChart chartData={currentWeek} />
      </div>
    </div>
  );
}
