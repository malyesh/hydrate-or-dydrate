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

router.patch('/week/2/day/24', (req, res) => {
  console.log(req.body);

  const hydrationData = JSON.parse(fs.readFileSync(dataFilePath));

  const weekIndex = hydrationData.findIndex((week) => week.id == '2');
  const dayIndex = hydrationData[weekIndex].days.findIndex(
    (day) => day.id == '24'
  );

  if (req.body.for === 'water') {
    const newLevel = req.body.waterLevel;
    hydrationData[weekIndex].days[dayIndex].waterLevel = newLevel;
  }
  if (req.body.for === 'coffee') {
    const newLevel = req.body.coffeeLevel;
    hydrationData[weekIndex].days[dayIndex].coffeeLevel = newLevel;
  }

  // console.log(newLevel);

  fs.writeFileSync(dataFilePath, JSON.stringify(hydrationData));
  res.status(200).json(hydrationData[weekIndex].days[dayIndex]);
});

module.exports = router;
