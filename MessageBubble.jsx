import { useMemo } from 'react';

function parseMarkdown(text) {
  // Convert **bold** and basic structure to HTML
  let html = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>(\n|$))+/g, (match) => `<ul>${match}</ul>`)
    .replace(/\n/g, '<br/>');
  return html;
}

function formatTime(iso) {
  try {
    return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
}

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  const html = useMemo(() => parseMarkdown(message.text), [message.text]);

  return (
    <div className={`flex items-end gap-3 ${isUser ? 'flex-row-reverse animate-slide-right' : 'animate-slide-left'}`}>
      {/* Avatar */}
      {!isUser && (
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-display mb-1"
          style={{
            background: 'rgba(201,168,76,0.15)',
            border: '1px solid rgba(201,168,76,0.35)',
            color: '#c9a84c',
          }}
        >
          A
        </div>
      )}

      <div className={`flex flex-col gap-1 max-w-[78%] ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Bubble */}
        <div
          className="px-4 py-3 rounded-2xl text-sm leading-relaxed message-content"
          style={
            isUser
              ? {
                  background: 'linear-gradient(135deg, #c9a84c 0%, #8a6d2f 100%)',
                  color: '#0f0c07',
                  borderRadius: '18px 18px 4px 18px',
                  fontWeight: 450,
                }
              : {
                  background: message.isError
                    ? 'rgba(120,40,40,0.5)'
                    : 'rgba(26,22,14,0.92)',
                  border: message.isError
                    ? '1px solid rgba(200,80,80,0.3)'
                    : '1px solid rgba(201,168,76,0.15)',
                  color: '#f5f0e8',
                  borderRadius: '18px 18px 18px 4px',
                }
          }
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {/* Timestamp */}
        <span className="text-xs px-1" style={{ color: 'rgba(138,127,112,0.7)' }}>
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}
