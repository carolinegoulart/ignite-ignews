import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from 'next-auth/client';
import { stripe } from '../../services/stripe';
import users from "./users";

// Creates a checkout session on stripe
export default async (req: NextApiRequest, res: NextApiResponse) => {
  
  // we only want to accept POST requests 
  if (req.method === 'POST') {
    // retrieves the session (only valid when we need to retrieve the session
    // in the backend)
    const session = await getSession({ req });

    // creates the customer on stripe
    const stripeCustomer = await stripe.customers.create({
      email: session.user.email
    })

    // checkout (payment)
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      // customers id on stripe
      customer: stripeCustomer.id,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        { price: 'price_1JOAWqIytRqB7Z9BdLbvk4rM', quantity: 1 }
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL
    });

    return res.status(200).json({ sessionId: stripeCheckoutSession.id })
  } else {
    // return that the route only accepts POST requests
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
}