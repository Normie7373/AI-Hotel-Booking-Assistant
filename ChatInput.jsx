import { useState, useRef, useEffect } from 'react';

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 140) + 'px';
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="relative flex items-end gap-3 rounded-2xl px-4 py-3"
      style={{
        background: 'rgba(26,22,14,0.95)',
        border: '1px solid rgba(201,168,76,0.25)',
        boxShadow: '0 0 40px rgba(0,0,0,0.4)',
      }}
    >
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Ask about rooms, amenities, or your stay…"
        className="flex-1 resize-none bg-transparent outline-none text-sm leading-relaxed placeholder:text-[#5a5040]"
        style={{ color: '#f5f0e8', minHeight: '24px', maxHeight: '140px' }}
      />

      {/* Send button */}
      <button
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
        style={{
          background: disabled || !value.trim()
            ? 'rgba(138,109,47,0.25)'
            : 'linear-gradient(135deg, #c9a84c, #8a6d2f)',
          cursor: disabled || !value.trim() ? 'not-allowed' : 'pointer',
        }}
        aria-label="Send message"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M14 8L2 2l3 6-3 6 12-6z"
            fill={disabled || !value.trim() ? '#5a5040' : '#0f0c07'}
          />
        </svg>
      </button>
    </div>
  );
}
