const express = require('express');
const router = express.Router();
const { updateSettings } = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');

// Route to update user settings (under '/api/auth/settings')
router.put('/settings', authenticate, updateSettings);

module.exports = router;
