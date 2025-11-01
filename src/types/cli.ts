/**
 * Type definitions for CLI integration
 */

export type CLIProvider = 'claude' | 'gemini' | 'custom';

export interface CLIConfig {
  id: string;
  provider: CLIProvider;
  name: string;
  command: string;
  args?: string[];
  env?: Record<string, string>;
}

export interface CLIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  cliId: string;
}

export interface CLISession {
  id: string;
  cliConfig: CLIConfig;
  messages: CLIMessage[];
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'idle' | 'error';
}

export interface CLIResponse {
  content: string;
  error?: string;
  metadata?: Record<string, unknown>;
}
