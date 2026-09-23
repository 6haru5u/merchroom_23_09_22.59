const express = require('express');
const { authUser } = require('../middleware/auth');
const { adminOnly } = require('../middleware/adminOnly');
const { getStats, getProductOptions, search } = require('../controllers/admin.controller');
const Product = require('../models/Product');

const router = express.Router();
router.get('/stats', authUser, adminOnly, getStats);
router.get('/product-options', authUser, adminOnly, getProductOptions);
router.get('/search', authUser, adminOnly, search);
router.get('/reports/low-stock', authUser, adminOnly, async (req, res, next) => {
  try {
    const products = await Product.find({ quantity: { $lte: 10 } }).populate('artist category').sort({ quantity: 1 });
    res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
