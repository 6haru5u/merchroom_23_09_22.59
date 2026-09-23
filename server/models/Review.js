// Schema รีวิวสินค้า (Review Schema)
// บันทึกคะแนนรีวิว 1-5 ดาว และคอมเมนต์ของผู้ใช้ต่อสินค้าแต่ละชิ้น
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

module.exports = mongoose.model('Review', ReviewSchema);
