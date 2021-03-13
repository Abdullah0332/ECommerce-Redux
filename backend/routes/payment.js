const express = require('express');

const router = express.Router();

const paymentController = require("../controllers/paymentController");

const { isAuthenticatedUser } = require('../middlewares/auth');

router.post('/payment/process', isAuthenticatedUser, paymentController.processPayment);

router.get('/stripeapi', isAuthenticatedUser, paymentController.sendStripeApi);

module.exports= router;