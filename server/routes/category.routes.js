const express = require('express');
const Category = require('../models/Category');
const Product = require('../models/Product');
const { authUser } = require('../middleware/auth');
const { adminOnly } = require('../middleware/adminOnly');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const standardCategories = await Category.find().sort({ name: 1 });
    const hierarchy = {
      ThaiHeritage: {
        name: 'Thai Heritage',
        slug: 'thai-heritage',
        description: 'งานหัตถศิลป์ วัฒนธรรม และสินค้าภูมิปัญญาไทยร่วมสมัย',
        subCategories: ['Craft', 'Fashion', 'HomeDecor', 'Textile', 'Ceramics'],
      },
      PopCulture: {
        name: 'Pop Culture',
        slug: 'pop-culture',
        description: 'สินค้าลิขสิทธิ์จากศิลปิน เพลง ภาพยนตร์ และวัฒนธรรมป๊อป',
        subCategories: ['Thailand', 'International'],
      },
    };

    return res.json({
      success: true,
      hierarchy,
      categories: standardCategories,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/', authUser, adminOnly, async (req, res, next) => {
  try {
    const { name, slug, description } = req.body;
    const category = await Category.create({ name, slug, description });
    return res.status(201).json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', authUser, adminOnly, async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    return res.json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authUser, adminOnly, async (req, res, next) => {
  try {
    const productCount = await Product.countDocuments({ category: req.params.id });
    if (productCount > 0) return res.status(409).json({ success: false, message: `This category is assigned to ${productCount} product(s). Reassign them before deleting it.` });
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    return res.json({ success: true, message: 'Category deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
