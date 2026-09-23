// Schema ข้อมูลผู้ใช้งาน รองรับทั้งฝั่งลูกค้า (customer) และผู้ดูแลระบบ (admin)
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    firstName: String,
    lastName: String,
    phone: String,
    interests: [String],
    address: String,
    paymentMethods: [String],
    profilePicture: String,
    socialAccounts: [String],
    password: { type: String, required: true },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    employeeId: String
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

module.exports = mongoose.model('User', UserSchema);
