const express = require('express');
const router = express.Router();
const fs = require('fs');

const dataFilePath = './data/hydration.json';

router.get('/', (req, res) => {
  console.log('GET all videos');
  const hydrationData = fs.readFileSync(dataFilePath);
  res.status(200).json(JSON.parse(hydrationData));
});

router.get('/week/:weekId', (req, res) => {
  console.log('GET week by ID');
  const { weekId } = req.params;
  const hydrationData = fs.readFileSync(dataFilePath);

  const week = JSON.parse(hydrationData).find((week) => week.id == weekId);

  if (week) {
    res.status(200).json(week);
  } else {
    res
      .status(404)
      .json({ error: 404, message: `Week with ID ${weekId} not found.` });
  }
});

router.get('/week/:weekId/day/:dayId', (req, res) => {
  console.log('GET week by ID');
  const { weekId, dayId } = req.params;
  const hydrationData = fs.readFileSync(dataFilePath);

  const week = JSON.parse(hydrationData).find((week) => week.id == weekId);
  const day = week.days.find((day) => day.id == dayId);

  if (day) {
    res.status(200).json(day);
  } else {
    res
      .status(404)
      .json({ error: 404, message: `Day with ID ${dayId} not found.` });
  }
});

// router.patch('/week/:weekId/day/:dayId', (req, res) => {
//     console.log(req.body);
//     const { weekId, dayId } = req.params;
//   const hydrationData = fs.readFileSync(dataFilePath);

//   const week = JSON.parse(hydrationData).find((week) => week.id == weekId);
//   const day = week.days.find((day) => day.id == dayId);

//   res.json(req.body);
// });

module.exports = router;
