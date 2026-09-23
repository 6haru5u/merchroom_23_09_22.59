const Order = require('../models/Order');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Artist = require('../models/Artist');
const User = require('../models/User');

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

exports.getStats = async (req, res, next) => {
  try {
    const [revenue, totalOrders, totalProducts, lowStock, revenueTrend, salesByCategory, recentOrders] = await Promise.all([
      Order.aggregate([{ $match: { status: { $ne: 'cancelled' } } }, { $group: { _id: null, total: { $sum: '$totalAmount' } } }]),
      Order.countDocuments(),
      Product.countDocuments(),
      Product.find({ quantity: { $lte: 10 } }).populate('artist', 'name').sort({ quantity: 1 }).limit(6),
      Order.aggregate([
        { $match: { status: { $ne: 'cancelled' } } },
        { $group: { _id: { year: { $year: { $ifNull: ['$purchaseDate', '$createdAt'] } }, month: { $month: { $ifNull: ['$purchaseDate', '$createdAt'] } } }, revenue: { $sum: '$totalAmount' } } },
        { $sort: { '_id.year': 1, '_id.month': 1 } }, { $limit: 12 },
        { $project: { _id: 0, month: { $dateToString: { format: '%b', date: { $dateFromParts: { year: '$_id.year', month: '$_id.month' } } } }, revenue: 1 } },
      ]),
      Order.aggregate([
        { $unwind: '$items' }, { $lookup: { from: 'products', localField: 'items.productId', foreignField: '_id', as: 'product' } },
        { $unwind: { path: '$product', preserveNullAndEmptyArrays: true } }, { $lookup: { from: 'categories', localField: 'product.category', foreignField: '_id', as: 'category' } },
        { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },
        { $group: { _id: { $ifNull: ['$category.name', 'Uncategorised'] }, value: { $sum: { $multiply: ['$items.price', '$items.quantity'] } } } },
        { $project: { _id: 0, name: '$_id', value: 1 } }, { $sort: { value: -1 } },
      ]),
      Order.find().populate('userId', 'firstName lastName email').sort({ createdAt: -1 }).limit(6),
    ]);
    res.json({ success: true, stats: { totalRevenue: revenue[0]?.total || 0, totalOrders, totalProducts, lowStockCount: lowStock.length }, revenueTrend, salesByCategory, lowStock, recentOrders });
  } catch (error) { next(error); }
};

exports.getProductOptions = async (req, res, next) => {
  try {
    const [categories, artists] = await Promise.all([Category.find().sort('name').select('name slug description'), Artist.find().sort('name').select('name')]);
    res.json({ success: true, categories, artists });
  } catch (error) { next(error); }
};

exports.search = async (req, res, next) => {
  try {
    const query = req.query.q?.trim();
    if (!query || query.length < 2) return res.json({ success: true, results: [] });
    const regex = new RegExp(escapeRegex(query), 'i');
    const [products, users] = await Promise.all([
      Product.find({ $or: [{ name: regex }, { code: regex }, { description: regex }, { tags: regex }] }).select('name code price quantity').limit(5),
      User.find({ $or: [{ firstName: regex }, { lastName: regex }, { email: regex }, { phone: regex }] }).select('firstName lastName email role').limit(5),
    ]);
    const orders = await Order.find({ $or: [{ userId: { $in: users.map((user) => user._id) } }, { 'items.name': regex }] }).populate('userId', 'firstName lastName').select('totalAmount status createdAt userId').sort({ createdAt: -1 }).limit(5);
    const results = [
      ...products.map((product) => ({ id: String(product._id), type: 'Product', title: product.name, detail: `${product.code || 'No code'} · ฿${Number(product.price).toLocaleString()} · ${product.quantity} in stock`, path: '/admin/products' })),
      ...users.map((user) => ({ id: String(user._id), type: 'User', title: `${user.firstName} ${user.lastName}`.trim() || user.email, detail: `${user.email} · ${user.role}`, path: '/admin/customers' })),
      ...orders.map((order) => ({ id: String(order._id), type: 'Order', title: `Order #${String(order._id).slice(-8)}`, detail: `${order.userId ? `${order.userId.firstName} ${order.userId.lastName}` : 'Unknown customer'} · ฿${Number(order.totalAmount).toLocaleString()} · ${order.status}`, path: '/admin/orders' })),
    ];
    res.json({ success: true, results });
  } catch (error) { next(error); }
};
