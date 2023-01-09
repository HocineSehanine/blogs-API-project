const jwt = require('jsonwebtoken');

require('dotenv/config');

const accessPassword = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

    const decode = jwt.verify(token, accessPassword);
    req.user = decode;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
    auth,
};