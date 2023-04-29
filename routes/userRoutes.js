const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get the authenticated user's information
router.get('/me', authMiddleware, userController.getMe);

// Update the authenticated user's information
router.put('/me', authMiddleware, userController.updateMe);

// Delete the authenticated user's account
router.delete('/me', authMiddleware, userController.deleteMe);

module.exports = router;
