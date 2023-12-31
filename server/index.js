const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const dataRoute = require('./routes/hydration');
const authRoute = require('./routes/user-auth');

const origin = 'http://localhost:3000';

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

app.listen(8080, function () {
  console.log('running on port 8080');
});
