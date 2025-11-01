/**
 * CLI Configurations controller
 */

import { Request, Response } from 'express';
import pool from '../db/pool';

export async function getAllConfigs(_req: Request, res: Response) {
  try {
    const result = await pool.query(
      'SELECT * FROM cli_configs WHERE is_active = true ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching configs:', error);
    res.status(500).json({ error: 'Failed to fetch configs' });
  }
}

export async function getConfigById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM cli_configs WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Config not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching config:', error);
    res.status(500).json({ error: 'Failed to fetch config' });
  }
}

export async function createConfig(req: Request, res: Response) {
  try {
    const { provider, name, command, args, env_vars } = req.body;

    if (!provider || !name || !command) {
      return res.status(400).json({
        error: 'provider, name, and command are required'
      });
    }

    const result = await pool.query(
      'INSERT INTO cli_configs (provider, name, command, args, env_vars) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [provider, name, command, args || null, env_vars || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating config:', error);
    res.status(500).json({ error: 'Failed to create config' });
  }
}

export async function updateConfig(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { provider, name, command, args, env_vars, is_active } = req.body;

    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (provider !== undefined) {
      updates.push(`provider = $${paramIndex++}`);
      values.push(provider);
    }
    if (name !== undefined) {
      updates.push(`name = $${paramIndex++}`);
      values.push(name);
    }
    if (command !== undefined) {
      updates.push(`command = $${paramIndex++}`);
      values.push(command);
    }
    if (args !== undefined) {
      updates.push(`args = $${paramIndex++}`);
      values.push(args);
    }
    if (env_vars !== undefined) {
      updates.push(`env_vars = $${paramIndex++}`);
      values.push(env_vars);
    }
    if (is_active !== undefined) {
      updates.push(`is_active = $${paramIndex++}`);
      values.push(is_active);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    values.push(id);
    const query = `UPDATE cli_configs SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${paramIndex} RETURNING *`;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Config not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating config:', error);
    res.status(500).json({ error: 'Failed to update config' });
  }
}

export async function deleteConfig(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'UPDATE cli_configs SET is_active = false WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Config not found' });
    }

    res.json({ message: 'Config deleted successfully' });
  } catch (error) {
    console.error('Error deleting config:', error);
    res.status(500).json({ error: 'Failed to delete config' });
  }
}
