const express = require('express');
const router = express.Router();
const { getMe, signup, login, getActiveUsers } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/users', protect, getActiveUsers);

module.exports = router;
