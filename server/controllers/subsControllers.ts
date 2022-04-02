import { Request, Response } from 'express';
import { stripe } from '../utils/stripe';

export const getStripePrices = async (req: Request, res: Response) => {
  const prices = await stripe.prices.list({
    apiKey: process.env.STRIPE_SECRET_KEY,
  });

  res.json({ prices });
};
