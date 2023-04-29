const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// User registration
router.post('/register', authController.register);

// User login
router.post('/login', authController.login);

// User logout
router.post('/logout', authController.logout);

// Request a password reset link
router.post('/forgot-password', authController.forgotPassword);

// Reset the password using the provided token
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router;
