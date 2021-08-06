const catchAsyncError = require("../middlewares/catchAsyncError");
require("dotenv").config({ path: "config/config.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Process stripe payments  =>  /api/v1/payment/process
exports.processPayment = catchAsyncError(async (req, res, next) => {
  let amount = 50 * 100;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
    metadata: { integration_check: "accept_a_payment" },
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

// Send Stripe API Key  =>  /api/v1/stripeapi
exports.sendStripeApi = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
