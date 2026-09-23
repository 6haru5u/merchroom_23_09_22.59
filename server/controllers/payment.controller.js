const Payment = require('../models/Payment');
const Order = require('../models/Order');
const User = require('../models/User');
const { publish } = require('../services/orderEvents');

const getOmise = () => {
  if (!process.env.OMISE_SECRET_KEY) return null;
  return require('omise')({
    secretKey: process.env.OMISE_SECRET_KEY,
    omiseVersion: '2019-05-29',
  });
};

const assertOrderAccess = async (order, userId) => {
  const user = await User.findById(userId).select('role');
  return user?.role === 'admin' || String(order.userId) === String(userId);
};

exports.chargeCard = async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const { token } = req.body;
    if (!token || typeof token !== 'string' || !token.startsWith('tokn_')) {
      return res.status(400).json({ success: false, message: 'A valid Omise card token is required' });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (!(await assertOrderAccess(order, req.user._id))) {
      return res.status(403).json({ success: false, message: 'You cannot pay for this order' });
    }

    const payment = await Payment.findOne({ orderId });
    if (!payment) return res.status(404).json({ success: false, message: 'Payment not found' });
    if (payment.status === 'paid') return res.json({ success: true, payment, order });
    if (payment.method !== 'card') return res.status(400).json({ success: false, message: 'This order was not created with card payment' });

    const omise = getOmise();
    if (!omise) return res.status(503).json({ success: false, message: 'Card payment is not configured on the server' });

    const charge = await omise.charges.create({
      amount: Math.round(payment.amount * 100),
      currency: 'thb',
      card: token,
      description: `Merchroom order ${order._id}`,
    });

    payment.provider = 'omise';
    payment.providerChargeId = charge.id;
    payment.cardBrand = charge.card?.brand;
    payment.cardLastDigits = charge.card?.last_digits;
    payment.failureCode = charge.failure_code || undefined;
    payment.failureMessage = charge.failure_message || undefined;
    payment.status = charge.paid ? 'paid' : 'failed';
    await payment.save();

    if (charge.paid) order.status = 'processing';
    await order.save();
    publish('payment-updated', order);

    if (!charge.paid) return res.status(402).json({ success: false, message: charge.failure_message || 'Card payment was declined', payment });
    return res.json({ success: true, payment, order });
  } catch (error) {
    const payment = await Payment.findOne({ orderId }).catch(() => null);
    const order = await Order.findById(orderId).catch(() => null);
    if (payment) {
      payment.provider = 'omise';
      payment.status = 'failed';
      payment.failureCode = error.code;
      payment.failureMessage = error.message;
      await payment.save();
    }
    if (order) publish('payment-updated', order);
    next(error);
  }
};

exports.initiatePayment = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { method = 'PromptPay' } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    let payment = await Payment.findOne({ orderId });
    if (!payment) {
      payment = await Payment.create({
        orderId,
        amount: order.totalAmount,
        method,
        status: 'pending'
      });
    }

    res.json({
      success: true,
      message: 'Payment intent created / PromptPay QR generated',
      payment,
      qrCodeUrl: `https://api.promptpay.io/qr/${order.totalAmount}?ref=${order._id}`
    });
  } catch (error) {
    next(error);
  }
};

exports.getPaymentStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const payment = await Payment.findOne({ orderId });
    if (!payment) return res.status(404).json({ success: false, message: 'Payment not found' });
    res.json({ success: true, payment });
  } catch (error) {
    next(error);
  }
};

exports.webhook = async (req, res, next) => {
  try {
    const { orderId, paymentId, status = 'paid' } = req.body;
    let payment = null;
    if (paymentId) {
      payment = await Payment.findById(paymentId);
    } else if (orderId) {
      payment = await Payment.findOne({ orderId });
    }

    if (!payment) return res.status(404).json({ success: false, message: 'Payment not found' });

    payment.status = status;
    await payment.save();

    if (status === 'paid') {
      await Order.findByIdAndUpdate(payment.orderId, { status: 'processing' });
    }

    res.json({ success: true, message: 'Webhook processed successfully', payment });
  } catch (error) {
    next(error);
  }
};

exports.refundPayment = async (req, res, next) => {
  try {
    const { paymentId } = req.params;
    const payment = await Payment.findById(paymentId);
    if (!payment) return res.status(404).json({ success: false, message: 'Payment not found' });

    payment.status = 'refunded';
    await payment.save();
    await Order.findByIdAndUpdate(payment.orderId, { status: 'cancelled' });

    res.json({ success: true, message: 'Refund processed successfully', payment });
  } catch (error) {
    next(error);
  }
};
