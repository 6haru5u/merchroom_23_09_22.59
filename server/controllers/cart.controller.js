const Cart = require('../models/Cart');

exports.getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id }).populate({
      path: 'items.productId',
      populate: { path: 'artist category' }
    });
    if (!cart) {
      cart = await Cart.create({ userId: req.user._id, items: [] });
    }
    res.json({ success: true, cart });
  } catch (error) {
    next(error);
  }
};

exports.addItem = async (req, res, next) => {
  try {
    const { productId, quantity = 1, variant_id } = req.body;
    if (!productId) return res.status(400).json({ success: false, message: 'productId is required' });
    
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => String(item.productId) === String(productId) && String(item.variant_id || '') === String(variant_id || '')
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += Number(quantity);
    } else {
      cart.items.push({ productId, quantity: Number(quantity), variant_id });
    }

    await cart.save();
    cart = await Cart.findById(cart._id).populate({
      path: 'items.productId',
      populate: { path: 'artist category' }
    });
    res.json({ success: true, cart });
  } catch (error) {
    next(error);
  }
};

exports.updateItemQuantity = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    if (quantity === undefined || quantity < 1) {
      return res.status(400).json({ success: false, message: 'Valid quantity is required' });
    }

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

    const item = cart.items.find((i) => String(i.productId) === String(productId));
    if (!item) return res.status(404).json({ success: false, message: 'Item not found in cart' });

    item.quantity = Number(quantity);
    await cart.save();
    cart = await Cart.findById(cart._id).populate({
      path: 'items.productId',
      populate: { path: 'artist category' }
    });
    res.json({ success: true, cart });
  } catch (error) {
    next(error);
  }
};

exports.removeItem = async (req, res, next) => {
  try {
    const { productId } = req.params;
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

    cart.items = cart.items.filter((i) => String(i.productId) !== String(productId));
    await cart.save();
    cart = await Cart.findById(cart._id).populate({
      path: 'items.productId',
      populate: { path: 'artist category' }
    });
    res.json({ success: true, cart });
  } catch (error) {
    next(error);
  }
};

exports.clearCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    if (cart) {
      cart.items = [];
      await cart.save();
    } else {
      cart = await Cart.create({ userId: req.user._id, items: [] });
    }
    res.json({ success: true, cart });
  } catch (error) {
    next(error);
  }
};
