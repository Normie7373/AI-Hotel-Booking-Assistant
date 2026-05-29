import { useState } from 'react';

const PURPOSES = ['Leisure', 'Business', 'Family vacation', 'Honeymoon', 'Weekend getaway'];

export default function RecommendForm({ onSubmit, onClose }) {
  const [budget, setBudget] = useState('');
  const [guests, setGuests] = useState('1');
  const [nights, setNights] = useState('1');
  const [purpose, setPurpose] = useState('Leisure');

  const handleSubmit = () => {
    if (!budget) return;
    const query = `I'm looking for a room for ${guests} guest${guests > 1 ? 's' : ''} for ${nights} night${nights > 1 ? 's' : ''} with a budget of ₹${budget} per night. The purpose of my visit is ${purpose}. Please recommend the best room option for me.`;
    onSubmit(query);
    onClose();
  };

  return (
    <div className="animate-fade-up">
      <div
        className="rounded-2xl p-5 mb-3"
        style={{
          background: 'rgba(26,22,14,0.95)',
          border: '1px solid rgba(201,168,76,0.2)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-lg" style={{ color: '#c9a84c' }}>
              Find Your Perfect Room
            </h3>
            <p className="text-xs mt-0.5" style={{ color: '#8a7f70' }}>
              Tell us your preferences and Aria will recommend the ideal stay
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
            style={{ background: 'rgba(201,168,76,0.1)', color: '#8a7f70' }}
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Budget */}
          <div className="col-span-2">
            <label className="block text-xs mb-1.5" style={{ color: '#8a7f70' }}>
              Budget per night (₹)
            </label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g. 2500"
              className="w-full rounded-xl px-3 py-2.5 text-sm outline-none transition-all"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(201,168,76,0.2)',
                color: '#f5f0e8',
              }}
            />
          </div>

          {/* Guests */}
          <div>
            <label className="block text-xs mb-1.5" style={{ color: '#8a7f70' }}>
              Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full rounded-xl px-3 py-2.5 text-sm outline-none appearance-none"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(201,168,76,0.2)',
                color: '#f5f0e8',
              }}
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n} style={{ background: '#1a160e' }}>
                  {n} Guest{n > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Nights */}
          <div>
            <label className="block text-xs mb-1.5" style={{ color: '#8a7f70' }}>
              Nights
            </label>
            <select
              value={nights}
              onChange={(e) => setNights(e.target.value)}
              className="w-full rounded-xl px-3 py-2.5 text-sm outline-none appearance-none"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(201,168,76,0.2)',
                color: '#f5f0e8',
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <option key={n} value={n} style={{ background: '#1a160e' }}>
                  {n} Night{n > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Purpose */}
          <div className="col-span-2">
            <label className="block text-xs mb-1.5" style={{ color: '#8a7f70' }}>
              Purpose of visit
            </label>
            <div className="flex flex-wrap gap-2">
              {PURPOSES.map((p) => (
                <button
                  key={p}
                  onClick={() => setPurpose(p)}
                  className="text-xs px-3 py-1.5 rounded-full transition-all duration-150"
                  style={{
                    background: purpose === p ? 'rgba(201,168,76,0.25)' : 'rgba(255,255,255,0.04)',
                    border: purpose === p ? '1px solid rgba(201,168,76,0.6)' : '1px solid rgba(201,168,76,0.15)',
                    color: purpose === p ? '#c9a84c' : '#8a7f70',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!budget}
          className="w-full mt-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
          style={{
            background: budget
              ? 'linear-gradient(135deg, #c9a84c, #8a6d2f)'
              : 'rgba(138,109,47,0.2)',
            color: budget ? '#0f0c07' : '#5a5040',
            cursor: budget ? 'pointer' : 'not-allowed',
          }}
        >
          Get Recommendation
        </button>
      </div>
    </div>
  );
}
