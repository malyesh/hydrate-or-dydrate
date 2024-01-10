const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const dataRoute = require('./routes/hydration');
const authRoute = require('./routes/user-auth');
const PORT = process.env.PORT || 5050;

const origin = process.env.CORS_ORIGIN;

app.use(
  cors({
    origin: origin,
    credentials: true,
  })
);

app.use(express.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/', (req, res) => {
  console.log('Route endpoint');
  res.send('Welcome to Hydrate or Dydrate');
});

app.use('/auth', authRoute);
app.use('/hydration', dataRoute);

app.listen(PORT, function () {
  console.log(`running on port ${PORT}`);
});
