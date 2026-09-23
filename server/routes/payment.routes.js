const express = require('express');
const { authUser } = require('../middleware/auth');
const { adminOnly } = require('../middleware/adminOnly');
const controller = require('../controllers/payment.controller');

const router = express.Router();

router.post('/orders/:orderId/initiate', authUser, controller.initiatePayment);
router.post('/orders/:orderId/charge', authUser, controller.chargeCard);
router.get('/orders/:orderId', authUser, controller.getPaymentStatus);
router.post('/webhook', controller.webhook);
router.post('/:paymentId/refund', authUser, adminOnly, controller.refundPayment);

module.exports = router;
