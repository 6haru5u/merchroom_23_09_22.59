const mongoose = require('mongoose');

const ProductChangeLogSchema = new mongoose.Schema({
  action: { type: String, enum: ['created', 'updated', 'deleted'], required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  productName: { type: String, required: true },
  actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  before: mongoose.Schema.Types.Mixed,
  after: mongoose.Schema.Types.Mixed,
}, { timestamps: { createdAt: 'createdAt', updatedAt: false } });

module.exports = mongoose.model('ProductChangeLog', ProductChangeLogSchema);
