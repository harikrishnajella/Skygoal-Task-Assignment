const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];

  try {
    if (!token) return res.status(401).json({ message: 'Not authorized, no token' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token failed' });
  }
};

module.exports = authenticate;
