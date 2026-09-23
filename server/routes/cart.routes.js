const express = require('express');
const { authUser } = require('../middleware/auth');
const controller = require('../controllers/cart.controller');

const router = express.Router();

router.get('/', authUser, controller.getCart);
router.post('/items', authUser, controller.addItem);
router.patch('/items/:productId', authUser, controller.updateItemQuantity);
router.delete('/items/:productId', authUser, controller.removeItem);
router.delete('/', authUser, controller.clearCart);

module.exports = router;
