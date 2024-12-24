// src/pages/api/subscribe.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Database helper function
async function getDB() {
  return open({
    filename: './subscribers.db',
    driver: sqlite3.Database
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  // Basic email validation
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    const db = await getDB();

    // Create table if it doesn't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert the email
    await db.run(
      'INSERT INTO subscribers (email) VALUES (?)',
      [email]
    );

    return res.status(200).json({ 
      message: 'Successfully subscribed' 
    });

  } catch (error: any) {
    // Handle unique constraint violation
    if (error.code === 'SQLITE_CONSTRAINT') {
      return res.status(400).json({ 
        error: 'This email is already subscribed' 
      });
    }

    console.error('Subscription error:', error);
    return res.status(500).json({ 
      error: 'Failed to subscribe' 
    });
  }
}