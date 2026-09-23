// โครงสร้างข้อมูลสินค้า (Product Schema)
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
    date: Date,
    tags: [String],
    national: { type: String, enum: ['thailand', 'international'], default: 'thailand' },
    style: { type: String, enum: ['Illustration', 'Photo', 'Typography'], default: 'Illustration' },
    medium: { type: String, enum: ['T-Shirt', 'Vinyl', 'Accessories', 'Home & Living'], default: 'Accessories' },
    sizes: [String], // ['S', 'M', 'L', 'XL']
    // เชื่อม relation ไปยัง Category และ Artist ผ่าน ObjectId
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
    imageUrl: String,
    // The first image remains available for existing storefront cards.
    imageUrls: [String],
    imageFit: { type: String, enum: ['cover', 'contain', 'fill', 'scale-down'], default: 'cover' }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

module.exports = mongoose.model('Product', ProductSchema);
