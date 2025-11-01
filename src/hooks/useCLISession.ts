/**
 * Custom hook for managing CLI sessions
 */

import { useState, useCallback } from 'react';
import type { CLISession, CLIConfig } from '../types/cli';
import { cliService } from '../services/cliService';

export function useCLISession() {
  const [sessions, setSessions] = useState<CLISession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  const startSession = useCallback(async (config: CLIConfig) => {
    const session = await cliService.startSession(config);
    setSessions((prev) => [...prev, session]);
    setActiveSessionId(session.id);
    return session;
  }, []);

  const sendMessage = useCallback(async (sessionId: string, message: string) => {
    const response = await cliService.sendMessage(sessionId, message);
    // TODO: Update session with new messages
    return response;
  }, []);

  const terminateSession = useCallback(async (sessionId: string) => {
    await cliService.terminateSession(sessionId);
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (activeSessionId === sessionId) {
      setActiveSessionId(null);
    }
  }, [activeSessionId]);

  const activeSession = sessions.find((s) => s.id === activeSessionId);

  return {
    sessions,
    activeSession,
    activeSessionId,
    setActiveSessionId,
    startSession,
    sendMessage,
    terminateSession,
  };
}
