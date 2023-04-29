const express = require('express');
const deliveryController = require('../controllers/deliveryController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new flower delivery
router.post('/', authMiddleware, deliveryController.createDelivery);

// Get all deliveries for the authenticated user
router.get('/', authMiddleware, deliveryController.getAllDeliveries);

// Get a specific delivery by ID for the authenticated user
router.get('/:deliveryId', authMiddleware, deliveryController.getDeliveryById);

// Update a specific delivery by ID for the authenticated user
router.put('/:deliveryId', authMiddleware, deliveryController.updateDeliveryById);

// Delete a specific delivery by ID for the authenticated user
router.delete('/:deliveryId', authMiddleware, deliveryController.deleteDeliveryById);

module.exports = router;
