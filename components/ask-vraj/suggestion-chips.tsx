interface SuggestionChipsProps {
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}

const CHIPS = [
  "What has Vraj built with AI?",
  "Which stack does he use?",
  "Tell me about the voice agent",
  "Is he available for work?",
];

export function SuggestionChips({ onSelect, disabled }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 pt-2">
      {CHIPS.map((chip) => (
        <button
          key={chip}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(chip)}
          className="px-3 py-1.5 rounded-full border border-border-hairline bg-bg-surface hover:border-accent hover:text-accent font-mono text-[11px] text-text-muted transition-all disabled:opacity-50 disabled:pointer-events-none text-left"
        >
          // {chip}
        </button>
      ))}
    </div>
  );
}

