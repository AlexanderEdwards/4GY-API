const express = require('express');
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new payment intent for a flower delivery
router.post('/intent', authMiddleware, paymentController.createPaymentIntent);

// Confirm a payment for a flower delivery
router.post('/confirm', authMiddleware, paymentController.confirmPayment);

// Get all payments for the authenticated user
router.get('/', authMiddleware, paymentController.getAllPayments);

// Get a specific payment by ID for the authenticated user
router.get('/:paymentId', authMiddleware, paymentController.getPaymentById);

// Refund a specific payment by ID for the authenticated user
router.post('/:paymentId/refund', authMiddleware, paymentController.refundPayment);

module.exports = router;
