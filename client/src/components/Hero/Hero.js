import './Hero.scss';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
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

  // const [chartData, setChartData] = useState();

  const [currentDay, setCurrentDay] = useState(null);
  const { dayId } = useParams();
  const defaultDayId = '24';

  const getCurrentDay = async () => {
    const apiBody = process.env.REACT_APP_API_URL;
    const currentDayId = dayId || defaultDayId;
    const result = await axios.get(
      `${apiBody}/hydration/week/2/day/${currentDayId}`
    );
    setCurrentDay(result.data);

    console.log(result.data);
  };

  // {
  //   labels: Data.map((data) => data.drink),
  //   datasets: [
  //     {
  //       data: Data.map((data) => data.value),
  //       backgroundColor: ["#563635", "#80A4ED"],
  //       // borderColor: "black",
  //       borderWidth: 0,
  //     },
  //   ],
  // }

  // let addChartData = async () => {
  //   let labelsArray = ["", ""];
  //   let waterValue = currentDay.waterLevel;
  //   let coffeeValue = currentDay.coffeeLevel;

  //   let chart = {
  //     labels: labelsArray,
  //     datasets: [
  //       { data: coffeeValue, backgroundColor: "#563635" },
  //       { data: waterValue, backgroundColor: "#80a4ED" },
  //     ],
  //   };

  //   // setChartData(chart);
  //   console.log(chart);
  // };

  useEffect(() => {
    getCurrentDay(dayId);
    // addChartData();
  }, [dayId]);

  if (!currentDay) return <h2>loading</h2>;

  return (
    <div className='hero'>
      <article className='top-banner'>
        <h2 className='banner__text'>You are XX% hydrated</h2>
      </article>
      <BarChart currentDay={currentDay} />
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
        <p>{currentDay.hydrationLevel}</p>
      </article>
      <Link to='/week' className='button-link'>
        <button className='week-button'>See weekly progress</button>
      </Link>
    </div>
  );
};

//   return (
//     <div className="hero">
//       <article className="top-banner">
//         <h3 className="top-banner__text1">
//           {`${currentDay.dayOfWeek} ${currentDay.date}`}
//         </h3>
//       </article>
//       <section className="chart">
//         <h2 className="chart__title">HYDRATION LEVELS</h2>
//         <Bar
//           data={chartData}
//           options={{
//             scales: {
//               xAxes: [
//                 {
//                   ticks: { size: 20 },
//                 },
//               ],
//             },
//             plugins: {
//               title: {
//                 display: false,
//                 text: "Hydration",
//               },
//               legend: {
//                 display: false,
//                 labels: {
//                   font: {
//                     size: 20,
//                   },
//                 },
//               },
//             },
//           }}
//         />
//       </section>
//       <article className="hydration">
//         <h3 className="hydration__title">Hydration Status</h3>
//         <p>{currentDay.hydrationLevel}</p>
//       </article>
//       <Link to="/week" className="button-link">
//         <button className="week-button">See weekly progress</button>
//       </Link>
//     </div>
//   );
// };

// export default Hero;
