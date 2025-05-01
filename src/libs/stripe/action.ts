'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cancelSubscription as cancelSubscriptionRequest } from './subscribe';
import { db } from '@/app/firebase-admin';

export async function cancelSubscription(stripeSubscriptionId: string) {
  await cancelSubscriptionRequest(stripeSubscriptionId);

  try {
    const subscriptionResult = await db.collection('subscriptions').where('stripeSubscriptionId', '==', stripeSubscriptionId).get();
    
    if (subscriptionResult.docs.length === 0) {
      throw new Error('Subscription not found');
    }

    const subscriptionId = subscriptionResult.docs[0].id;
    await db.collection('subscription_cancellations').doc(subscriptionId).set({
      stripeSubscriptionId: stripeSubscriptionId,
      canceledTimestamp: new Date(),
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to record subscription cancellation.');
  }
  return 
}