const express = require('express');
const mongoose = require('mongoose');
const Review = require('../models/Review');
const User = require('../models/User');
const { authUser } = require('../middleware/auth');
const { adminOnly } = require('../middleware/adminOnly');
const { validateReview } = require('../middleware/validate');

const router = express.Router();

router.get('/product/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    let query = {};

    if (mongoose.Types.ObjectId.isValid(productId)) {
      query.productId = productId;
    }

    const reviews = await Review.find(query)
      .populate('userId', 'firstName lastName profilePicture')
      .sort({ createdAt: -1 });

    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0;

    return res.json({
      success: true,
      count: reviews.length,
      averageRating: Number(averageRating),
      data: reviews,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/', authUser, validateReview, async (req, res, next) => {
  try {
    const { productId, rating, comment } = req.body;

    const review = await Review.create({
      userId: req.user._id,
      productId,
      rating,
      comment,
    });

    return res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      data: review,
    });
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', authUser, async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    if (String(review.userId) !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Permission denied' });
    }
    const updated = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    return res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authUser, async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    const user = await User.findById(req.user._id).select('role');
    if (!user || (user.role !== 'admin' && String(review.userId) !== String(req.user._id))) {
      return res.status(403).json({ success: false, message: 'Permission denied' });
    }
    await Review.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Review deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
