const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));
const authenticate = require("../middleware/authenticate");

router.get("/:date", authenticate, async (req, res) => {
  const { date } = req.params;
  let today = `${date.substring(0, 10)}`;
  const day = await knex
    .select("*")
    .from("hydration")
    .whereRaw("DATE(created_at) = ?", [today])
    .where({ user_id: req.user_id });
  return res.status(200).json(day);
});

router.post("/:date", authenticate, async (req, res) => {
  console.log(req.user_id);
  const { date } = req.params;
  const formattedDate = new Date(date)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const newLevel = {
    waterLevel: 0,
    coffeeLevel: 0,
    user_id: req.user_id,
    created_at: formattedDate,
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

    const start = new Date(startOfWeek);
    console.log(start);
    const end = new Date(endOfWeek);
    console.log(end);

    const levels = await knex
      .select("*")
      .from("hydration")
      .whereBetween(knex.raw("DATE(created_at)"), [start, end])
      .andWhere({ user_id: req.user_id });
    return res.status(200).json(levels);
  }
);

module.exports = router;
