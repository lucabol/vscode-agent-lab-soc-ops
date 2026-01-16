interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 bg-vintage-cream animate-fade-in">
      <div className="text-center max-w-md">
        {/* Ornamental top border */}
        <div className="mb-6 text-vintage-gold text-2xl">✦ ✦ ✦</div>
        
        <h1 className="text-6xl font-display font-bold text-vintage-burgundy mb-3 tracking-wide">
          Soc Ops
        </h1>
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px bg-vintage-border flex-1"></div>
          <p className="text-xl text-vintage-brown font-display italic">Social Bingo</p>
          <div className="h-px bg-vintage-border flex-1"></div>
        </div>
        
        <div className="bg-vintage-paper rounded-sm p-8 vintage-shadow border-4 border-double border-vintage-border mb-10 relative">
          {/* Corner decorations */}
          <div className="absolute top-2 left-2 text-vintage-gold text-xl">❧</div>
          <div className="absolute top-2 right-2 text-vintage-gold text-xl">❧</div>
          <div className="absolute bottom-2 left-2 text-vintage-gold text-xl">❧</div>
          <div className="absolute bottom-2 right-2 text-vintage-gold text-xl">❧</div>
          
          <h2 className="font-display font-bold text-vintage-burgundy mb-4 text-xl">How to Play</h2>
          <ul className="text-left text-vintage-brown space-y-3 text-lg font-body">
            <li className="flex items-start gap-2">
              <span className="text-vintage-gold">❖</span>
              <span>Find people who match the questions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-vintage-gold">❖</span>
              <span>Tap a square when you find a match</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-vintage-gold">❖</span>
              <span>Get 5 in a row to win!</span>
            </li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-vintage-burgundy text-vintage-cream font-display font-bold py-5 px-10 rounded-sm text-xl border-2 border-vintage-burgundy-dark active:bg-vintage-burgundy-dark transition-all vintage-shadow tracking-wide uppercase"
        >
          Begin Game
        </button>
        
        {/* Ornamental bottom border */}
        <div className="mt-6 text-vintage-gold text-2xl">✦ ✦ ✦</div>
      </div>
    </div>
  );
}
