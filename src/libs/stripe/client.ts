import Stripe from 'stripe';

let stripeInstance: Stripe | null = null;

const getStripeInstance = () => {
  if (!stripeInstance) {
    const stripeSecretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      throw new Error('Stripe secret key must be set.');
    }

    stripeInstance = new Stripe(stripeSecretKey, { 
      apiVersion: "2025-03-31.basil",
      typescript: true
    });
  }

  return stripeInstance;
};

export default getStripeInstance; 