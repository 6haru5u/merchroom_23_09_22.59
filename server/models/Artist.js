// Schema ข้อมูลศิลปิน (แยกออกจาก User เพราะไม่ได้ใช้สิทธิ์ล็อกอินในระบบ)
const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    realName: String,
    // ประเภทของศิลปิน: solo = ศิลปินเดี่ยว, band = วงดนตรี, group = กลุ่ม/ไอดอล
    type: { type: String, enum: ['solo', 'band', 'group'], default: 'solo' },
    bio: String,
    style: String,
    socialLinks: [String],
    profilePic: String
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

module.exports = mongoose.model('Artist', ArtistSchema);