// src/pages/api/manage-subscription.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { verifySubscriber, unsubscribe } from '../../lib/setup';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action, token, email } = req.body;

  try {
    switch (action) {
      case 'verify':
        if (!token) {
          return res.status(400).json({ error: 'Verification token required' });
        }
        const verified = await verifySubscriber(token);
        if (!verified) {
          return res.status(400).json({ error: 'Invalid or expired token' });
        }
        return res.status(200).json({ message: 'Email verified successfully' });

      case 'unsubscribe':
        if (!email) {
          return res.status(400).json({ error: 'Email required' });
        }
        const unsubscribed = await unsubscribe(email);
        if (!unsubscribed) {
          return res.status(400).json({ error: 'Email not found' });
        }
        return res.status(200).json({ message: 'Successfully unsubscribed' });

      default:
        return res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    console.error('Subscription management error:', error);
    return res.status(500).json({ error: 'Operation failed' });
  }
}