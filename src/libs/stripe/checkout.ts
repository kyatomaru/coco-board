'use server';

import Stripe from 'stripe';
import getStripeInstance from './client';

export async function createCheckoutSession(email: string, stripePriceId: string): Promise<Stripe.Checkout.Session> {
  const stripe = getStripeInstance();
  const APP_BASE_URL = process.env.NEXT_PUBLIC_DOMAIN;
  if (!APP_BASE_URL) {
    throw new Error('APP_BASE_URL environment variable is not set.');
  }

  let sessionParams: Stripe.Checkout.SessionCreateParams;
  if (email == "") {
    sessionParams = {
      payment_method_types: ['card'],
      line_items: [{ price: stripePriceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `http://${APP_BASE_URL}/note`,
      cancel_url: `http://${APP_BASE_URL}/plan`,
    };
  } else {
    sessionParams = {
      payment_method_types: ['card'],
      line_items: [{ price: stripePriceId, quantity: 1 }],
      mode: 'subscription',
      customer_email: email,
      success_url: `http://${APP_BASE_URL}/note`,
      cancel_url: `http://${APP_BASE_URL}/plan`,
    }
  }

  return stripe.checkout.sessions.create(sessionParams);
}
