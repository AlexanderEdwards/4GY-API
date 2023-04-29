const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

// Get the authenticated user's information
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    errorHandler(err, res);
  }
};

// Update the authenticated user's information
exports.updateMe = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).select('-password');
    res.json(updatedUser);
  } catch (err) {
    errorHandler(err, res);
  }
};

// Delete the authenticated user's account
exports.deleteMe = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: 'User account deleted successfully' });
  } catch (err) {
    errorHandler(err, res);
  }
};
