import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import getStripeInstance from '@/libs/stripe/client';
import { db } from '@/app/firebase-admin';
import { auth } from '@/app/firebase-admin';

const COLLECTION_NAME = 'subscriptions';

export async function POST(request: NextRequest) {
  const signature = request.headers.get('stripe-signature');
  if (signature == null) {
    return NextResponse.json({ message: 'Signature missing' }, { status: 401 });
  }
  const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
  if (!STRIPE_WEBHOOK_SECRET) {
    throw new Error('STRIPE_WEBHOOK_SECRET environment variable is not set.');
  }

  const stripe = getStripeInstance();
  const body = await request.text();
  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    STRIPE_WEBHOOK_SECRET,
  );

  if (event.type === 'invoice.payment_succeeded') {
    return NextResponse.json(handlePaymentSucceededEvent(event));
  } else {
    console.log(`Unhandled event type: ${event.type}`);
    return NextResponse.json(
      { message: 'Ignored event type' },
      { status: 200 },
    );
  }
}

async function handlePaymentSucceededEvent(event: Stripe.Event) {
  const invoice = event.data.object as Stripe.Invoice;
  const stripeSubscriptionId = invoice.parent.subscription_details.subscription as string;
  const stripeCustomerId = invoice.customer as string;
  const mail = invoice.customer_email as string;

  try {
    const userRecord = await auth.getUserByEmail(mail);
    const userId = userRecord.uid;

    const insertData = {
      userId: userId,
      stripeSubscriptionId: stripeSubscriptionId,
      stripeInvoiceId: invoice.id,
      startTimestamp: invoice.lines.data[0].period.start,
      endTimestamp: invoice.lines.data[0].period.end
    }

    const docRef = db.collection(COLLECTION_NAME).doc();
    await docRef.set(insertData);
    
    return { status: 200, message: 'Subscription record created' };
  } catch (err) {
    console.error('Error processing payment:', err);
    return { status: 500, message: 'Internal Server Error' };
  }
}

