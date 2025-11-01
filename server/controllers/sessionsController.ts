/**
 * Sessions controller
 */

import { Request, Response } from 'express';
import pool from '../db/pool';

export async function getAllSessions(_req: Request, res: Response) {
  try {
    const result = await pool.query(
      'SELECT * FROM sessions ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
}

export async function getSessionById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM sessions WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({ error: 'Failed to fetch session' });
  }
}

export async function createSession(req: Request, res: Response) {
  try {
    const { cli_provider, cli_name } = req.body;

    if (!cli_provider || !cli_name) {
      return res.status(400).json({ error: 'cli_provider and cli_name are required' });
    }

    const result = await pool.query(
      'INSERT INTO sessions (cli_provider, cli_name) VALUES ($1, $2) RETURNING *',
      [cli_provider, cli_name]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ error: 'Failed to create session' });
  }
}

export async function updateSession(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'status is required' });
    }

    const result = await pool.query(
      'UPDATE sessions SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating session:', error);
    res.status(500).json({ error: 'Failed to update session' });
  }
}

export async function deleteSession(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM sessions WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json({ message: 'Session deleted successfully' });
  } catch (error) {
    console.error('Error deleting session:', error);
    res.status(500).json({ error: 'Failed to delete session' });
  }
}
