const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send('Please login');
  }
  const authToken = req.headers.authorization.split(' ')[1];
  try {
    const decodedToken = jwt.verify(authToken, process.env.JWT_KEY);
    req.user_id = decodedToken.id;
    next();
  } catch (error) {
    res.status(401).send('Invalid auth token');
  }
};

module.exports = authenticate;
