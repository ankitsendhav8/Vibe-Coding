const { verifyToken } = require('../services/authService');

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const err = new Error('Access denied. No token provided.');
    err.statusCode = 401;
    return next(err);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch {
    const err = new Error('Invalid or expired token.');
    err.statusCode = 401;
    next(err);
  }
};

module.exports = { protect };
