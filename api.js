const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

/**
 * Send a message to the n8n webhook and return the AI reply.
 * @param {string} message
 * @param {string} sessionId
 * @returns {Promise<{reply: string, sessionId: string, timestamp: string}>}
 */
export async function sendMessage(message, sessionId) {
  if (!WEBHOOK_URL) {
    throw new Error(
      'VITE_N8N_WEBHOOK_URL is not set. Add it to your .env file.'
    );
  }

  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sessionId }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Webhook error ${response.status}: ${text}`);
  }

  const data = await response.json();
  const payload = Array.isArray(data) ? data[0] : data;

  return {
    ...payload,
    reply: payload.reply || payload.output || payload.text || '',
  };
}
