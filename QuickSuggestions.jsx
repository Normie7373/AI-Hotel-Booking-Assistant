const SUGGESTIONS = [
  { label: 'Room options', query: 'What room types do you have available?' },
  { label: 'Check-in/out times', query: 'What are your check-in and check-out times?' },
  { label: 'Cancellation policy', query: 'What is your cancellation policy?' },
  { label: 'Nearby attractions', query: 'What are some attractions near the hotel?' },
  { label: 'Budget room', query: 'What is your most affordable room option?' },
  { label: 'Amenities', query: 'What amenities does the hotel offer?' },
];

export default function QuickSuggestions({ onSelect, visible }) {
  if (!visible) return null;

  return (
    <div className="flex flex-wrap gap-2 pb-3 animate-fade-up">
      {SUGGESTIONS.map((s) => (
        <button
          key={s.label}
          onClick={() => onSelect(s.query)}
          className="text-xs px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            background: 'rgba(201,168,76,0.1)',
            border: '1px solid rgba(201,168,76,0.25)',
            color: '#c9a84c',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
