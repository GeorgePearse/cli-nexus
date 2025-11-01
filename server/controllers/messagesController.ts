/**
 * Messages controller
 */

import { Request, Response } from 'express';
import pool from '../db/pool';

export async function getMessagesBySession(req: Request, res: Response) {
  try {
    const { sessionId } = req.params;
    const result = await pool.query(
      'SELECT * FROM messages WHERE session_id = $1 ORDER BY created_at ASC',
      [sessionId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
}

export async function createMessage(req: Request, res: Response) {
  try {
    const { session_id, role, content, metadata } = req.body;

    if (!session_id || !role || !content) {
      return res.status(400).json({
        error: 'session_id, role, and content are required'
      });
    }

    if (!['user', 'assistant', 'system'].includes(role)) {
      return res.status(400).json({
        error: 'role must be one of: user, assistant, system'
      });
    }

    const result = await pool.query(
      'INSERT INTO messages (session_id, role, content, metadata) VALUES ($1, $2, $3, $4) RETURNING *',
      [session_id, role, content, metadata || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Failed to create message' });
  }
}
