import type { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const db = await open({
      filename: './subscribers.db',
      driver: sqlite3.Database
    });

    const subscribers = await db.all('SELECT * FROM subscribers ORDER BY subscribed_at DESC');
    
    return res.status(200).json({ subscribers });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return res.status(500).json({ error: 'Failed to fetch subscribers' });
  }
}