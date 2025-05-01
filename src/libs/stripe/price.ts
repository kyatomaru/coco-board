'use server';

import Stripe from 'stripe';
import { Price, Currency, Interval } from '@/types/stripe/Price';
import getStripeInstance from './client';

const mapStripePriceToPrice = (product: Stripe.Product, priceData: Stripe.Price): Price => {

  if (priceData.unit_amount == null) {
    throw new Error(`Amount must be set.`);
  }

  if (priceData.currency !== 'jpy') {
    throw new Error(`Unsupported currency: ${priceData.currency}`);
  }

  const interval = priceData.recurring?.interval;
  let intervalText = '';
  const intervalCount = priceData.recurring?.interval_count;
  if (!interval || !['day', 'month', 'week', 'year'].includes(interval)) {
    throw new Error(`Unsupported interval: ${interval}`);
  } else {
    if (interval === 'month') {
        intervalText =  intervalCount ? intervalCount + 'ヶ月' : '1ヶ月';
    } else if (interval === 'day') {
        intervalText = intervalCount ? intervalCount + '日' : '1日';
    } else if (interval === 'week') {
        intervalText = intervalCount ? intervalCount + '週' : '1週';
    } else if (interval === 'year') {
        intervalText = intervalCount ? intervalCount + '年' : '1年';
    }
  }

  return {
    id: priceData.id,
    title: product.name,
    description: product.description,
    unit_amount: priceData.unit_amount,
    currency: priceData.currency as Currency,
    interval: interval as Interval,
    intervalCount: intervalCount,
    intervalText: intervalText,
    default: product.default_price === priceData.id,
  };
};

export const getPricesForProduct = async (
  productId: string,
): Promise<Price[]> => {

  const stripe = getStripeInstance();

  const product = await stripe.products.retrieve(productId);

  const priceData = await stripe.prices.list({
    product: productId,
  });

  return priceData.data.map(priceData => mapStripePriceToPrice(product, priceData));
};
