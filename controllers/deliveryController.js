const Delivery = require('../models/Delivery');
const errorHandler = require('../utils/errorHandler');

// Create a new flower delivery
exports.createDelivery = async (req, res) => {
  try {
    const { recipientName, recipientPhone, address, deliveryDate, flowers } = req.body;
    const newDelivery = new Delivery({
      user: req.user.id,
      recipientName,
      recipientPhone,
      address,
      deliveryDate,
      flowers
    });
    const savedDelivery = await newDelivery.save();
    res.status(201).json(savedDelivery);
  } catch (err) {
    errorHandler(err, res);
  }
};

// Get all deliveries for the authenticated user
exports.getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({ user: req.user.id });
    res.json(deliveries);
  } catch (err) {
    errorHandler(err, res);
  }
};

// Get a specific delivery by ID for the authenticated user
exports.getDeliveryById = async (req, res) => {
  try {
    const delivery = await Delivery.findOne({ _id: req.params.deliveryId, user: req.user.id });
    if (!delivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }
    res.json(delivery);
  } catch (err) {
    errorHandler(err, res);
  }
};

// Update a specific delivery by ID for the authenticated user
exports.updateDeliveryById = async (req, res) => {
  try {
    const updatedDelivery = await Delivery.findOneAndUpdate(
      { _id: req.params.deliveryId, user: req.user.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedDelivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }
    res.status(200).json(updatedDelivery);
  } catch (err) {
    errorHandler(err, res);
  }
};

// Delete a specific delivery by ID for the authenticated user
exports.deleteDeliveryById = async (req, res) => {
  try {
    const deletedDelivery = await Delivery.findOneAndDelete({ _id: req.params.deliveryId, user: req.user.id });
    if (!deletedDelivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }
    res.json({ message: 'Delivery deleted successfully' });
  } catch (err) {
    errorHandler(err, res);
  }
};
