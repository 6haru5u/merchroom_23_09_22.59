// เติม genre:<name> ให้สินค้าที่มีอยู่แล้ว โดยไม่ลบ tag เดิมออก
require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });

const connectDB = require('../db');
const Product = require('../models/Product');
require('../models/Artist');

const classifyGenre = (product) => {
  const text = [product.name, product.description, ...(product.tags || [])].join(' ').toLowerCase();
  const artist = String(product.artist?.name || '').toUpperCase();
  const medium = String(product.medium || '').toLowerCase();

  if (artist === 'SACIT' || artist === 'CHAKSARN' || /(ลิเภา|จักสาน|ผักตบ|เซรามิก|ทอมือ|หัตถกรรม)/.test(text)) return 'handicraft';
  if (/(bag|tote|clutch|pouch|กระเป๋า)/.test(text)) return 'bags';
  if (medium === 't-shirt' || /(t-shirt|tee|shirt|hoodie|sweatshirt|เสื้อ)/.test(text)) return 'apparel';
  if (/(poster|โปสเตอร์)/.test(text)) return 'posters';
  if (medium === 'vinyl' || /(vinyl|album|cd|แผ่นเสียง)/.test(text)) return 'collectibles';
  if (medium === 'home & living' || /(mug|glass|lamp|bottle|แก้ว|โคมไฟ)/.test(text)) return 'home';
  return 'accessories';
};

async function run() {
  await connectDB();
  const products = await Product.find().populate('artist', 'name');
  const counts = {};

  for (const product of products) {
    const existing = (product.tags || []).map((tag) => String(tag).trim().toLowerCase());
    const genre = existing.find((tag) => tag.startsWith('genre:'))?.slice(6) || classifyGenre(product);
    const nextTags = [...new Set([...existing.filter((tag) => !tag.startsWith('genre:')), `genre:${genre}`])];
    product.tags = nextTags;
    await product.save();
    counts[genre] = (counts[genre] || 0) + 1;
  }

  console.log(`Updated genre tags for ${products.length} products.`);
  console.table(counts);
  process.exit(0);
}

run().catch((error) => {
  console.error('Could not backfill product genres:', error);
  process.exit(1);
});
