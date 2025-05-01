import { createCheckoutSession } from '@/libs/stripe/checkout';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export async function POST(request: NextRequest) {
  const body = await request.json();

  console.log(body);

  const stripeCheckoutSession = await createCheckoutSession(body.email, body.priceId);
  if (!stripeCheckoutSession.url) {
    throw new Error('Could not create a Stripe Checkout session.');
  }
  return NextResponse.json({ url: stripeCheckoutSession.url });
}
