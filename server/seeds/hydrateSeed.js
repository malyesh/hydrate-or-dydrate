const userData = require("../seed-data/user");
const hydrationData = require("../seed-data/hydration");

exports.seed = async function (knex) {
  await knex("hydration").del();
  await knex("user").del();
  await knex("user").insert(userData);
  await knex("hydration").insert(hydrationData);
};
