// Middleware สำหรับการตรวจสอบความถูกต้องของข้อมูล (Request Validation Middleware)

const validateProduct = (req, res, next) => {
  const { name, price, mainCategory } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push('Product name is required');
  }

  if (price === undefined || typeof price !== 'number' || price < 0) {
    errors.push('Valid product price is required (>= 0)');
  }

  if (!mainCategory || !['ThaiHeritage', 'PopCulture'].includes(mainCategory)) {
    errors.push("mainCategory must be either 'ThaiHeritage' or 'PopCulture'");
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors, message: 'Product validation failed' });
  }

  next();
};

const validateOrder = (req, res, next) => {
  const { items, shippingAddress } = req.body;
  const errors = [];

  if (!Array.isArray(items) || items.length === 0) {
    errors.push('Order must contain at least one item');
  } else {
    items.forEach((item, index) => {
      if (!item.name) errors.push(`Item at index ${index} requires a name`);
      if (item.price === undefined || item.price < 0) errors.push(`Item at index ${index} requires valid price`);
      if (!item.quantity || item.quantity < 1) errors.push(`Item at index ${index} requires quantity >= 1`);
    });
  }

  if (!shippingAddress || typeof shippingAddress !== 'string' || shippingAddress.trim() === '') {
    errors.push('Shipping address is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors, message: 'Order validation failed' });
  }

  next();
};

const validateReview = (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const errors = [];

  if (!productId) {
    errors.push('productId is required');
  }

  if (rating === undefined || typeof rating !== 'number' || rating < 1 || rating > 5) {
    errors.push('Rating must be a number between 1 and 5');
  }

  if (!comment || typeof comment !== 'string' || comment.trim() === '') {
    errors.push('Review comment is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors, message: 'Review validation failed' });
  }

  next();
};

module.exports = {
  validateProduct,
  validateOrder,
  validateReview,
};
