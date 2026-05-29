export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-slide-left">
      {/* Avatar */}
      <div
        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-display"
        style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.35)', color: '#c9a84c' }}
      >
        A
      </div>
      {/* Bubble */}
      <div
        className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5"
        style={{ background: 'rgba(26,22,14,0.9)', border: '1px solid rgba(201,168,76,0.15)' }}
      >
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}
