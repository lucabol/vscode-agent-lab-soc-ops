interface StartScreenProps {
  onStartBingo: () => void;
  onStartScavenger: () => void;
  onStartCardDeck: () => void;
}

export function StartScreen({ onStartBingo, onStartScavenger, onStartCardDeck }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-8 bg-mono-50">
      <div className="text-center max-w-md w-full">
        <div className="mb-16">
          <h1 className="text-[3.5rem] font-normal tracking-tight text-mono-950 mb-1 leading-none">SOC OPS</h1>
          <div className="h-px bg-mono-900 w-16 mx-auto mb-3"></div>
          <p className="text-sm uppercase tracking-[0.2em] text-mono-600 font-light">Social Games</p>
        </div>
        
        <div className="mb-12 space-y-3 text-mono-700">
          <p className="text-xs uppercase tracking-wider font-medium mb-4 text-mono-500">Choose Your Mode</p>
          <p className="text-sm leading-relaxed">Find people who match the prompts</p>
          <p className="text-sm leading-relaxed">Mark items when you find matches</p>
        </div>

        {/* Mode Buttons */}
        <div className="space-y-3">
          <button
            onClick={onStartBingo}
            className="w-full border-2 border-mono-900 bg-mono-900 text-mono-50 font-medium py-4 px-8 text-sm uppercase tracking-[0.15em] transition-all duration-200 hover:bg-mono-950 active:scale-[0.98]"
          >
            <span className="relative">Play Bingo</span>
          </button>
          <button
            onClick={onStartScavenger}
            className="w-full border-2 border-mono-900 bg-mono-50 text-mono-900 font-medium py-4 px-8 text-sm uppercase tracking-[0.15em] transition-all duration-200 hover:bg-mono-100 active:scale-[0.98]"
          >
            <span className="relative">Scavenger Hunt</span>
          </button>
          <button
            onClick={onStartCardDeck}
            className="w-full border-2 border-mono-900 bg-mono-50 text-mono-900 font-medium py-4 px-8 text-sm uppercase tracking-[0.15em] transition-all duration-200 hover:bg-mono-100 active:scale-[0.98]"
          >
            <span className="relative">Card Deck</span>
          </button>
        </div>
      </div>
    </div>
  );
}
