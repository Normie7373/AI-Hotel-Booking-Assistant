import { useState, useRef, useCallback } from 'react';
import { sendMessage } from './api';

// Generate a stable session ID per browser session
function getSessionId() {
  let id = sessionStorage.getItem('aria_session_id');
  if (!id) {
    id = 'sess_' + Math.random().toString(36).slice(2, 11) + Date.now();
    sessionStorage.setItem('aria_session_id', id);
  }
  return id;
}

export function useChat() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Welcome to The Grand Palace Hotel. I'm **Aria**, your personal AI concierge. How may I assist you today?\n\nI can help you explore our rooms, check availability, answer questions about the hotel, or recommend the perfect stay based on your preferences.",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sessionId = useRef(getSessionId());

  const send = useCallback(async (text) => {
    if (!text.trim() || isLoading) return;

    const userMsg = {
      id: 'u_' + Date.now(),
      role: 'user',
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    try {
      const data = await sendMessage(text.trim(), sessionId.current);
      const assistantMsg = {
        id: 'a_' + Date.now(),
        role: 'assistant',
        text: data.reply || 'I apologize, I did not receive a response. Please try again.',
        timestamp: data.timestamp || new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setError(err.message);
      const errMsg = {
        id: 'e_' + Date.now(),
        role: 'assistant',
        text: "I'm having trouble connecting right now. Please try again in a moment, or contact our front desk at **+91-40-1234-5678**.",
        isError: true,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return { messages, isLoading, error, send };
}
