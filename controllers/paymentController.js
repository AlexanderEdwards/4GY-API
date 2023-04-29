const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const errorHandler = require('../utils/errorHandler');

// Save the user's card information and store the Stripe Customer ID and payment method ID
exports.saveCardInformation = async (req, res) => {
    try {
      const { paymentMethodId } = req.body;
  
      let user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      let customer;
      if (!user.stripeCustomerId) {
        // Create a new Stripe Customer
        customer = await stripe.customers.create({
          payment_method: paymentMethodId,
          email: user.email,
          invoice_settings: {
            default_payment_method: paymentMethodId
          }
        });
  
        user.stripeCustomerId = customer.id;
      } else {
        // Attach the payment method to the existing Stripe Customer
        customer = await stripe.customers.retrieve(user.stripeCustomerId);
        const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
          customer: user.stripeCustomerId
        });
  
        user.stripePaymentMethodId = paymentMethod.id;
      }
  
      await user.save();
      res.json({ message: 'Card information saved successfully' });
    } catch (err) {
      errorHandler(err, res);
    }
};
  