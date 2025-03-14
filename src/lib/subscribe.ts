// src/pages/api/subscribe.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { addSubscriber } from './setup';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    const subscriber = await addSubscriber(email);
    
    // In a real application, you would send a verification email here
    // For now, we'll just return success
    
    return res.status(200).json({ 
      message: 'Successfully subscribed',
      subscriber
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Failed to subscribe' });
  }
}