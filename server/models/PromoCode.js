// Schema โค้ดส่วนลดโปรโมชัน (PromoCode Schema)
const mongoose = require('mongoose');

const PromoCodeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    discountPercent: { type: Number, required: true, min: 0, max: 1 }, // เช่น 0.20 = ลด 20%
    description: { type: String },
    isActive: { type: Boolean, default: true },
    expiryDate: { type: Date },
    usageCount: { type: Number, default: 0 },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

module.exports = mongoose.model('PromoCode', PromoCodeSchema);
