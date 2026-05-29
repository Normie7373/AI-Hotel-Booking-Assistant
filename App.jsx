import { useState } from 'react';
import { useChat } from './useChat';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import QuickSuggestions from './QuickSuggestions';
import RecommendForm from './RecommendForm';

// Decorative SVG star
const Star = ({ size = 16, style }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={style}>
    <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="currentColor" />
  </svg>
);

export default function App() {
  const { messages, isLoading, send } = useChat();
  const [showRecommend, setShowRecommend] = useState(false);
  const showSuggestions = messages.length <= 1 && !isLoading;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      style={{ background: '#0f0c07' }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 100%, rgba(138,109,47,0.05) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)' }}
      />

      {/* Floating stars decoration */}
      <Star size={6} style={{ position: 'absolute', top: '12%', left: '8%', color: 'rgba(201,168,76,0.25)' }} />
      <Star size={4} style={{ position: 'absolute', top: '25%', right: '10%', color: 'rgba(201,168,76,0.2)' }} />
      <Star size={5} style={{ position: 'absolute', bottom: '20%', left: '5%', color: 'rgba(201,168,76,0.15)' }} />

      {/* Main card */}
      <div
        className="w-full flex flex-col relative"
        style={{
          maxWidth: '680px',
          height: 'min(90vh, 780px)',
          background: 'rgba(15,12,7,0.97)',
          border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: '24px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.05)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(201,168,76,0.12)' }}
        >
          <div className="flex items-center gap-3">
            {/* Logo mark */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(138,109,47,0.1))',
                border: '1px solid rgba(201,168,76,0.35)',
              }}
            >
              <span className="font-display text-lg" style={{ color: '#c9a84c' }}>A</span>
            </div>
            <div>
              <h1 className="font-display text-base font-medium" style={{ color: '#f5f0e8', letterSpacing: '0.02em' }}>
                Aria
              </h1>
              <div className="flex items-center gap-1.5">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: '#4ade80' }}
                />
                <span className="text-xs" style={{ color: '#8a7f70' }}>
                  AI Concierge · The Grand Palace Hotel
                </span>
              </div>
            </div>
          </div>

          {/* Right: star rating */}
          <div className="flex items-center gap-1" style={{ color: '#c9a84c' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} />
            ))}
            <span className="text-xs ml-1 font-display" style={{ color: '#8a7f70' }}>4.3</span>
          </div>
        </div>

        {/* Chat area */}
        <ChatWindow messages={messages} isLoading={isLoading} />

        {/* Bottom area */}
        <div className="px-4 pb-4 flex-shrink-0 space-y-2">
          {/* Divider */}
          <div className="gold-divider mb-3" />

          {/* Recommend form (togglable) */}
          {showRecommend && (
            <RecommendForm
              onSubmit={(query) => { send(query); }}
              onClose={() => setShowRecommend(false)}
            />
          )}

          {/* Quick suggestions (only on fresh chat) */}
          <QuickSuggestions
            visible={showSuggestions && !showRecommend}
            onSelect={(q) => send(q)}
          />

          {/* Input row */}
          <div className="flex items-end gap-2">
            {/* Recommend toggle */}
            <button
              onClick={() => setShowRecommend((v) => !v)}
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 mb-0.5"
              title="Get room recommendation"
              style={{
                background: showRecommend ? 'rgba(201,168,76,0.25)' : 'rgba(201,168,76,0.08)',
                border: showRecommend ? '1px solid rgba(201,168,76,0.5)' : '1px solid rgba(201,168,76,0.2)',
                color: '#c9a84c',
              }}
            >
              {/* Bed icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8"/>
                <path d="M4 10V6a2 2 0 012-2h12a2 2 0 012 2v4"/>
                <line x1="2" y1="16" x2="22" y2="16"/>
              </svg>
            </button>

            <div className="flex-1">
              <ChatInput onSend={send} disabled={isLoading} />
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs mt-2" style={{ color: 'rgba(138,127,112,0.45)' }}>
            Powered by RAG · Gachibowli, Hyderabad
          </p>
        </div>
      </div>
    </div>
  );
}
