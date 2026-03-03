const authService = require('../services/authService');

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const err = new Error('Name, email, and password are required.');
      err.statusCode = 400;
      return next(err);
    }

    const { user, token } = await authService.signup({ name, email, password });
    res.status(201).json({ success: true, message: 'Account created successfully.', data: { user, token } });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = new Error('Email and password are required.');
      err.statusCode = 400;
      return next(err);
    }

    const { user, token } = await authService.login({ email, password });
    res.status(200).json({ success: true, message: 'Logged in successfully.', data: { user, token } });
  } catch (error) {
    next(error);
  }
};

const getActiveUsers = async (req, res, next) => {
  try {
    const users = await authService.getActiveUsers();
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login, getActiveUsers };
