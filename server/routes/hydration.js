const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile'));
const authenticate = require('../middleware/authenticate');

// const hydrationController = require('../controllers/hydration-controller');
// router.route('/').get(hydrationController.index);

router.get('/:date', authenticate, async (req, res) => {
  const { date } = req.params;
  let today = `${date.substring(0, 10)}`;
  const day = await knex
    .select('*')
    .from('hydration')
    .whereRaw('DATE(created_at) = ?', [today])
    .where({ user_id: req.user_id });
  return res.status(200).json(day);
});

router.post('/:date', authenticate, async (req, res) => {
  console.log(req.user_id);
  const { date } = req.params;
  const formattedDate = new Date(date)
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');

  const newLevel = {
    waterLevel: 0,
    coffeeLevel: 0,
    user_id: req.user_id,
    created_at: formattedDate,
  };
  console.log(newLevel);

  try {
    await knex('hydration').insert(newLevel);
    res.status(200).send('Added successfully');
  } catch (error) {
    res.status(400).send('Failed addition');
  }
});

router.patch('/coffee', async (req, res) => {
  const { id, coffeeLevel } = req.body;

  try {
    await knex('hydration')
      .where({ id, id })
      .update({
        coffeeLevel: coffeeLevel + 1,
      });
    res.status(201).send('Updated successfully');
  } catch (error) {
    res.status(400).send('Failed to update');
  }
});

router.patch('/water', async (req, res) => {
  const { id, waterLevel } = req.body;

  try {
    await knex('hydration')
      .where({ id, id })
      .update({
        waterLevel: waterLevel + 1,
      });
    res.status(201).send('Updated successfully');
  } catch (error) {
    res.status(400).send('Failed to update');
  }
});

// router.get('/:day', authenticate, async (req, res) => {
//   const { day } = req.params;
//   // console.log(day);
//   console.log(req.user_id);
// });

// router.get('/', (req, res) => {
//   console.log('GET all videos');
//   const hydrationData = fs.readFileSync(dataFilePath);
//   res.status(200).json(JSON.parse(hydrationData));
// });

// router.get('/week/:weekId', (req, res) => {
//   console.log('GET week by ID');
//   const { weekId } = req.params;
//   const hydrationData = fs.readFileSync(dataFilePath);

//   const week = JSON.parse(hydrationData).find((week) => week.id == weekId);

//   if (week) {
//     res.status(200).json(week);
//   } else {
//     res
//       .status(404)
//       .json({ error: 404, message: `Week with ID ${weekId} not found.` });
//   }
// });

// router.get('/week/:weekId/day/:dayId', (req, res) => {
//   console.log('GET week by ID');
//   const { weekId, dayId } = req.params;
//   const hydrationData = fs.readFileSync(dataFilePath);

//   const week = JSON.parse(hydrationData).find((week) => week.id == weekId);
//   const day = week.days.find((day) => day.id == dayId);

//   if (day) {
//     res.status(200).json(day);
//   } else {
//     res
//       .status(404)
//       .json({ error: 404, message: `Day with ID ${dayId} not found.` });
//   }
// });

// router.patch('/week/2/day/24', (req, res) => {
//   console.log(req.body);

//   const hydrationData = JSON.parse(fs.readFileSync(dataFilePath));

//   const weekIndex = hydrationData.findIndex((week) => week.id == '2');
//   const dayIndex = hydrationData[weekIndex].days.findIndex(
//     (day) => day.id == '24'
//   );

//   if (req.body.for === 'water') {
//     const newLevel = req.body.waterLevel;
//     hydrationData[weekIndex].days[dayIndex].waterLevel = newLevel;
//   }
//   if (req.body.for === 'coffee') {
//     const newLevel = req.body.coffeeLevel;
//     hydrationData[weekIndex].days[dayIndex].coffeeLevel = newLevel;
//   }

//   // console.log(newLevel);

//   fs.writeFileSync(dataFilePath, JSON.stringify(hydrationData));
//   res.status(200).json(hydrationData[weekIndex].days[dayIndex]);
// });

module.exports = router;
