const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));
const authenticate = require("../middleware/authenticate");

// const hydrationController = require('../controllers/hydration-controller');
// router.route('/').get(hydrationController.index);

router.get("/", authenticate, async (req, res) => {
  let today = new Date().toLocaleDateString();
  today = `${today.substring(6)}-${today.substring(0, 2)}-${today.substring(
    3,
    5
  )}`;
  const levels = await knex
    .select("*")
    .from("hydration")
    .where(knex.raw("CAST(created_at AS DATE) = ?", [today]))
    .where({ user_id: req.user_id });
  return res.status(200).json(levels);
});

router.post("/", authenticate, async (req, res) => {
  console.log(req.user_id);

  const newLevel = {
    waterLevel: 0,
    coffeeLevel: 0,
    user_id: req.user_id,
  };

  try {
    await knex("hydration").insert(newLevel);
    res.status(200).send("Added successfully");
  } catch (error) {
    res.status(400).send("Failed addition");
  }
});

router.patch("/coffee", async (req, res) => {
  const { id, coffeeLevel } = req.body;

  try {
    await knex("hydration")
      .where({ id, id })
      .update({
        coffeeLevel: coffeeLevel + 1,
      });
    res.status(201).send("Updated successfully");
  } catch (error) {
    res.status(400).send("Failed to update");
  }
});

router.patch("/water", async (req, res) => {
  const { id, waterLevel } = req.body;

  try {
    await knex("hydration")
      .where({ id, id })
      .update({
        waterLevel: waterLevel + 1,
      });
    res.status(201).send("Updated successfully");
  } catch (error) {
    res.status(400).send("Failed to update");
  }
});

router.get(
  "/week/startOfWeek/:startOfWeek/endOfWeek/:endOfWeek",
  authenticate,
  async (req, res) => {
    const { startOfWeek } = req.params;
    const { endOfWeek } = req.params;

    // let today = new Date();
    // let startOfWeek = new Date(today);
    // startOfWeek.setDate(today.getDate() - today.getDay());
    // let endOfWeek = new Date(startOfWeek);
    // endOfWeek.setDate(startOfWeek.getDate() + 6);

    console.log(endOfWeek);
    const levels = await knex
      .select("*")
      .from("hydration")
      .whereBetween("created_at", [startOfWeek, endOfWeek])
      .where({ user_id: req.user_id });
    return res.status(200).json(levels);
  }
);

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
