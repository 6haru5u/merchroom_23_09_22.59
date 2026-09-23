const Order = require('../models/Order');
const Payment = require('../models/Payment');
const User = require('../models/User');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const { publish, subscribe } = require('../services/orderEvents');
const ORDER_STATUSES = ['pending', 'processing', 'shipped', 'completed', 'cancelled', 'in_transit', 'delivered'];

const findProductForOrderItem = (item) => {
  const productId = item.productId || item.id;
  if (productId && mongoose.Types.ObjectId.isValid(productId)) return Product.findById(productId);
  // Cart data saved before the API was connected can contain a frontend ID
  // (for example "07hr"). Match its product name against the database instead.
  return item.name?.trim() ? Product.findOne({ name: item.name.trim() }) : null;
};

async function attachPayments(orders) {
  const payments = await Payment.find({ orderId: { $in: orders.map((order) => order._id) } }).sort({ createdAt: -1 });
  const byOrder = new Map();
  payments.forEach((payment) => { if (!byOrder.has(String(payment.orderId))) byOrder.set(String(payment.orderId), payment); });
  return orders.map((order) => ({ ...order.toObject(), payment: byOrder.get(String(order._id)) || null }));
}

exports.stream = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
  });
  res.write('event: connected\ndata: {}\n\n');
  const unsubscribe = subscribe(res);
  req.on('close', unsubscribe);
};

exports.streamMyOrders = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
  });
  res.write('event: connected\ndata: {}\n\n');
  const unsubscribe = subscribe(res, req.user._id);
  req.on('close', unsubscribe);
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const status = req.query.status && req.query.status !== 'all' ? req.query.status : null;
    if (status && !ORDER_STATUSES.includes(status)) return res.status(400).json({ success: false, message: 'Invalid order status' });
    const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 10, 1), 100);
    const filter = status ? { status } : {};
    if (req.query.search?.trim()) {
      const search = req.query.search.trim();
      const users = await User.find({ $or: [{ firstName: { $regex: search, $options: 'i' } }, { lastName: { $regex: search, $options: 'i' } }, { phone: { $regex: search, $options: 'i' } }] }).select('_id');
      filter.userId = { $in: users.map((user) => user._id) };
    }
    const total = await Order.countDocuments(filter);
    const orders = await Order.find(filter).populate('userId', 'firstName lastName phone address').sort({ purchaseDate: -1, createdAt: -1 }).skip((page - 1) * limit).limit(limit);
    res.json({ success: true, orders: await attachPayments(orders), pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
  } catch (error) { next(error); }
};

exports.getOrderStats = async (req, res, next) => {
  try {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const paidOrderIds = await Payment.distinct('orderId', { status: 'paid' });
    const [todayOrders, pendingPayment, awaitingFulfillment, shipped] = await Promise.all([
      Order.countDocuments({ $or: [{ purchaseDate: { $gte: today } }, { createdAt: { $gte: today } }] }), Payment.countDocuments({ status: 'pending' }), Order.countDocuments({ _id: { $in: paidOrderIds }, status: { $in: ['pending', 'processing'] } }), Order.countDocuments({ status: { $in: ['shipped', 'completed', 'in_transit', 'delivered'] } }),
    ]);
    res.json({ success: true, stats: { todayOrders, pendingPayment, awaitingFulfillment, shipped } });
  } catch (error) { next(error); }
};

exports.createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, shippingProvider = 'Standard Delivery', paymentMethod = 'PromptPay' } = req.body;
    if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ success: false, message: 'At least one item is required' });
    if (!shippingAddress?.trim()) return res.status(400).json({ success: false, message: 'Shipping address is required' });
    const snapshots = [];
    for (const item of items) {
      const quantity = Number(item.quantity);
      if (!Number.isInteger(quantity) || quantity < 1) return res.status(400).json({ success: false, message: 'Each item requires a valid quantity' });
      const product = await findProductForOrderItem(item);
      if (!product) return res.status(404).json({ success: false, message: 'A product in this order no longer exists' });
      if (product.quantity < quantity) return res.status(409).json({ success: false, message: `${product.name} does not have enough stock` });
      snapshots.push({ productId: product._id, name: product.name, price: product.price, quantity });
    }
    const totalAmount = snapshots.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = await Order.create({ userId: req.user._id, items: snapshots, totalAmount, status: 'pending', shippingProvider, shippingAddress, purchaseDate: new Date() });
    try {
      const payment = await Payment.create({ orderId: order._id, amount: totalAmount, method: paymentMethod, provider: paymentMethod === 'card' ? 'omise' : 'manual', status: 'pending' });
      await Promise.all(snapshots.map((item) => Product.updateOne({ _id: item.productId, quantity: { $gte: item.quantity } }, { $inc: { quantity: -item.quantity } })));
      publish('created', order);
      res.status(201).json({ success: true, order: { ...order.toObject(), payment } });
    } catch (error) { await Order.findByIdAndDelete(order._id); throw error; }
  } catch (error) { next(error); }
};

exports.createManualOrder = async (req, res, next) => {
  try {
    const { userId, items, shippingAddress, shippingProvider = 'Standard Delivery', paymentMethod = 'Manual' } = req.body;
    if (!userId || !Array.isArray(items) || items.length === 0) return res.status(400).json({ success: false, message: 'Customer and at least one item are required' });
    const customer = await User.findById(userId);
    if (!customer) return res.status(404).json({ success: false, message: 'Customer not found' });
    const snapshots = [];
    for (const item of items) {
      const quantity = Number(item.quantity);
      if (!item.productId || !Number.isInteger(quantity) || quantity < 1) return res.status(400).json({ success: false, message: 'Each item requires a product and quantity' });
      const product = await Product.findById(item.productId);
      if (!product) return res.status(404).json({ success: false, message: 'A product in this order no longer exists' });
      if (product.quantity < quantity) return res.status(409).json({ success: false, message: `${product.name} does not have enough stock` });
      snapshots.push({ productId: product._id, name: product.name, price: product.price, quantity });
    }
    const totalAmount = snapshots.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = await Order.create({ userId, items: snapshots, totalAmount, status: 'processing', shippingProvider, shippingAddress: shippingAddress?.trim() || customer.address || '', purchaseDate: new Date() });
    const payment = await Payment.create({ orderId: order._id, amount: totalAmount, method: paymentMethod, status: 'paid' });
    await Promise.all(snapshots.map((item) => Product.updateOne({ _id: item.productId }, { $inc: { quantity: -item.quantity } })));
    await order.populate('userId', 'firstName lastName phone address');
    publish('created', order);
    res.status(201).json({ success: true, order: (await attachPayments([order]))[0] });
  } catch (error) { next(error); }
};

exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ purchaseDate: -1, createdAt: -1 });
    res.json({ success: true, orders: await attachPayments(orders) });
  } catch (error) { next(error); }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId', 'firstName lastName phone address');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    const user = await User.findById(req.user._id).select('role');
    if (!user || (user.role !== 'admin' && String(order.userId._id) !== String(req.user._id))) {
      return res.status(403).json({ success: false, message: 'You cannot access this order' });
    }
    res.json({ success: true, order: (await attachPayments([order]))[0] });
  } catch (error) { next(error); }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!ORDER_STATUSES.includes(status)) return res.status(400).json({ success: false, message: `Status must be one of: ${ORDER_STATUSES.join(', ')}` });
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true }).populate('userId', 'firstName lastName phone address');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    publish('status-updated', order);
    res.json({ success: true, order: (await attachPayments([order]))[0] });
  } catch (error) { next(error); }
};

exports.cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    const user = await User.findById(req.user._id).select('role');
    if (!user || (user.role !== 'admin' && String(order.userId) !== String(req.user._id))) {
      return res.status(403).json({ success: false, message: 'Permission denied' });
    }

    if (!['pending', 'processing'].includes(order.status)) {
      return res.status(400).json({ success: false, message: 'Order cannot be cancelled in current status' });
    }

    order.status = 'cancelled';
    for (const item of order.items) {
      if (item.productId && item.quantity) {
        await Product.findByIdAndUpdate(item.productId, { $inc: { quantity: item.quantity } });
      }
    }
    await order.save();
    publish('status-updated', order);
    res.json({ success: true, order: (await attachPayments([order]))[0] });
  } catch (error) {
    next(error);
  }
};
