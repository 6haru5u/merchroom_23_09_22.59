// Middleware จัดการ Error ส่วนกลางของ Express (Global Error Handler)

const errorHandler = (err, req, res, next) => {
  console.error('[Server Error]:', err.stack || err.message || err);

  // จัดการกรณี Mongoose CastError (เช่น Invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Resource not found with id of ${err.value}`,
    });
  }

  // จัดการกรณี Mongoose Duplicate Key Error (E11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return res.status(409).json({
      success: false,
      message: `Duplicate value entered for ${field}: ${err.keyValue[field]}`,
    });
  }

  // จัดการกรณี Mongoose ValidationError
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: messages,
    });
  }

  // จัดการ JWT Error
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid authorization token',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Authorization token expired',
    });
  }

  return res.status(err.statusCode || err.status || 500).json({
    success: false,
    message: err.message || 'Server Error: Something went wrong',
  });
};

module.exports = errorHandler;
