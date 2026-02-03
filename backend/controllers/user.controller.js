const User = require('../models/User');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    ).select('-password');

    res.json(updated);
  } catch (error) {
    next(error);
  }
};
