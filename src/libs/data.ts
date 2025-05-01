'use server'

import { auth, db } from '@/app/firebase-admin';

export async function hasValidSubscription(userId: string, checkTimestamp: Date = new Date()) {
  try {
    if (!userId) {
      throw new Error('User not found');
    }

    const timestampStr = checkTimestamp.toISOString().replace('T', ' ').substring(0, 19);

    const subscriptionResult = await db.collection('subscriptions').where('userId', '==', userId).get();

    const count = subscriptionResult.docs.length;
    return count > 0;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to check for valid subscription.');
  }
}

export async function getValidSubscription(email: string, checkTimestamp: Date = new Date()) {
    try {
        const userResult = await auth.getUserByEmail(email);
        const userId = userResult.uid;

        if (!userId) {
      throw new Error('User not found');
    }

    // const timestampStr = checkTimestamp.toISOString().replace('T', ' ').substring(0, 19);
    const timestampSeconds = Math.floor(checkTimestamp.getTime() / 1000);


    const subscriptionResult = await db.collection('subscriptions')
    .where('userId', '==', userId)
    .where('startTimestamp', '<=', timestampSeconds)
    .where('endTimestamp', '>=', timestampSeconds)
    .get();

    if (subscriptionResult.docs.length === 0) {
      return null;
    }

    const subscription = subscriptionResult.docs[0];

    console.log(subscription.data());

    return {
      id: subscription.id,
      stripeSubscriptionId: subscription.data().stripeSubscriptionId,
      startTimestamp: subscription.data().startTimestamp,
      endTimestamp: subscription.data().endTimestamp,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to retrieve valid subscription.');
  }
}

export async function hasCancellationHistory(stripeSubscriptionId: string) {
    try {
        const subscriptionResult = await db.collection('subscriptions').where('stripeSubscriptionId', '==', stripeSubscriptionId).get();
        if (subscriptionResult.docs.length === 0) {
            return false;
        }

        const cancellationResult = await db.collection('subscription_cancellations').where('stripeSubscriptionId', '==', stripeSubscriptionId).get();

        return cancellationResult.docs.length > 0;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to check for cancellation history.');
    }
}