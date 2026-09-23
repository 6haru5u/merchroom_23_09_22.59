const User = require('../models/User');

const adminOnly = async (req, res, next) => {
  try {
    // ต้องรันต่อจาก authUser เสมอ เพราะต้องมี req.user._id ก่อน
    const user = await User.findById(req.user._id).select('role');

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied: admin only' });
    }

    req.user.role = user.role; // แนบไว้เผื่อ controller ถัดไปอยากใช้
    next();
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { adminOnly };