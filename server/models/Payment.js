// Schema บันทึกธุรกรรมการชำระเงิน (Payment Schema)
// ผูกกับ Order ผ่าน orderId และบันทึกยอดเงิน วิธีชำระเงิน พร้อมสถานะ
const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    amount: { type: Number, required: true },
    method: String,
    status: { type: String, default: 'pending' },
    provider: { type: String, default: 'manual' },
    providerChargeId: { type: String, index: true, sparse: true },
    failureCode: String,
    failureMessage: String,
    cardBrand: String,
    cardLastDigits: String
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

module.exports = mongoose.model('Payment', PaymentSchema);
