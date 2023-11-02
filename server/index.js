const express = require("express");
const cors = require("cors");
const app = express();
const dataRoute = require("./routes/hydration");

const origin = process.env.CORS_ORIGIN;

app.use(
  cors({
    options: origin,
  })
);

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Route endpoint");
  res.send("Welcome to Hydrate or Dydrate");
});

app.use("/hydration", dataRoute);

app.listen(8080, function () {
  console.log("running on port 8080");
});
