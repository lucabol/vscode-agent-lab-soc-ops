interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-8 bg-mono-50">
      <div className="text-center max-w-md w-full">
        <div className="mb-16">
          <h1 className="text-[3.5rem] font-normal tracking-tight text-mono-950 mb-1 leading-none">SOC OPS</h1>
          <div className="h-px bg-mono-900 w-16 mx-auto mb-3"></div>
          <p className="text-sm uppercase tracking-[0.2em] text-mono-600 font-light">Social Bingo</p>
        </div>
        
        <div className="mb-12 space-y-3 text-mono-700">
          <p className="text-xs uppercase tracking-wider font-medium mb-4 text-mono-500">Instructions</p>
          <p className="text-sm leading-relaxed">Find people who match the questions</p>
          <p className="text-sm leading-relaxed">Mark squares when you find matches</p>
          <p className="text-sm leading-relaxed">Complete five in a row to win</p>
        </div>

        <button
          onClick={onStart}
          className="w-full border-2 border-mono-900 bg-mono-900 text-mono-50 font-medium py-4 px-8 text-sm uppercase tracking-[0.15em] transition-all duration-200 hover:bg-mono-950 active:scale-[0.98]"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
