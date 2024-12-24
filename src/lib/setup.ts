// src/lib/db/setup.ts
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

// This will be our database instance
let db: Database | null = null;

export async function getDB() {
  if (!db) {
    // Initialize the database
    db = await open({
      filename: './subscribers.db', // This will create the db in your project root
      driver: sqlite3.Database
    });

    // Create tables if they don't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'active',
        verification_token TEXT,
        verified_at DATETIME
      )
    `);
  }
  
  return db;
}

// Type for our subscriber
export interface Subscriber {
  id: number;
  email: string;
  subscribed_at: string;
  status: 'active' | 'unsubscribed' | 'pending';
  verification_token?: string;
  verified_at?: string;
  error?: string;
}

// Utility functions for managing subscribers
export async function addSubscriber(email: string): Promise<Subscriber> {
  const db = await getDB();
  const verificationToken = Math.random().toString(36).substring(2);
  
  try {
    const result = await db.run(
      `INSERT INTO subscribers (email, verification_token) VALUES (?, ?)`,
      [email, verificationToken]
    );
    
    const subscriber = await db.get<Subscriber>(
      'SELECT * FROM subscribers WHERE id = ?',
      result.lastID
    );
    
    return subscriber!;
    // eslint-disable-next-line
  } catch (error: any) {
    if (error.code === 'SQLITE_CONSTRAINT') {
      throw new Error('This email is already subscribed');
    }
    throw error;
  }
}

export async function verifySubscriber(token: string): Promise<boolean> {
  const db = await getDB();
  
  const result = await db.run(
    `UPDATE subscribers 
     SET status = 'active', verified_at = CURRENT_TIMESTAMP 
     WHERE verification_token = ? AND status = 'pending'`,
    [token]
  );

  
  return (result.changes as number) > 0;
}

export async function unsubscribe(email: string): Promise<boolean> {
  const db = await getDB();
  
  const result = await db.run(
    `UPDATE subscribers SET status = 'unsubscribed' WHERE email = ?`,
    [email]
  );
  
  return (result.changes as number) > 0;
}