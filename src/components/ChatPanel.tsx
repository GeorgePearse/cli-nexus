/**
 * ChatPanel component for displaying CLI conversations
 */

import { useState } from 'react';
import type { CLIMessage } from '../types/cli';

interface ChatPanelProps {
  sessionId?: string;
  messages?: CLIMessage[];
  onSendMessage?: (message: string) => void;
}

export function ChatPanel({ messages = [], onSendMessage }: ChatPanelProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && onSendMessage) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="chat-panel">
      <div className="messages">
        {messages.length === 0 ? (
          <div className="empty-state">
            <p>No messages yet. Start a conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`message message-${message.role}`}>
              <div className="message-role">{message.role}</div>
              <div className="message-content">{message.content}</div>
              <div className="message-timestamp">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="message-input"
        />
        <button type="submit" disabled={!input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
