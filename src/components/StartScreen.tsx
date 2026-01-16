interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-full p-6 bg-cream overflow-hidden">
      {/* Subtle gradient accent in corner */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-mustard/10 to-transparent blur-3xl pointer-events-none" />
      
      {/* Paper texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="relative text-center max-w-lg w-full">
        {/* Tagline */}
        <div 
          className="mb-2 text-warm-text-light text-sm font-medium tracking-widest uppercase opacity-0"
          style={{
            animation: 'fadeInRotate 0.8s ease-out 0.2s forwards',
          }}
        >
          Soc Ops
        </div>

        {/* Main Title */}
        <h1 
          className="text-6xl md:text-7xl font-display font-black text-warm-text mb-12 opacity-0"
          style={{
            animation: 'wobbleIn 1s ease-out 0.4s forwards',
          }}
          aria-label="Social Bingo"
        >
          Social Bingo
        </h1>

        {/* Instructions Card - Bingo-style */}
        <div 
          className="bg-cream-dark rounded-2xl p-6 shadow-lg mb-8 border-2 border-warm-text/10 opacity-0"
          style={{
            animation: 'fadeInRotate 0.8s ease-out 0.8s forwards',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
          }}
        >
          <h2 className="font-display font-bold text-warm-text text-lg mb-4">How to play</h2>
          <div className="space-y-3">
            {[
              'Find people who match the questions',
              'Tap a square when you find a match',
              'Get 5 in a row to win!',
            ].map((instruction, i) => (
              <div
                key={i}
                className="flex items-start gap-3 text-left"
              >
                <div 
                  className="flex-shrink-0 w-6 h-6 rounded border-2 border-forest flex items-center justify-center bg-white mt-0.5"
                  aria-hidden="true"
                >
                  <svg 
                    className="w-4 h-4 text-forest" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-warm-text-light text-base leading-relaxed">
                  {instruction}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="relative w-full bg-terracotta text-cream font-display font-bold py-5 px-8 rounded-xl text-xl transition-all duration-150 opacity-0 active:scale-[0.97]"
          style={{
            animation: 'fadeInRotate 0.8s ease-out 1.2s forwards',
            boxShadow: '0 4px 0 0 var(--color-terracotta-dark), 0 8px 12px rgba(0, 0, 0, 0.15)',
          }}
          aria-label="Start Social Bingo game"
        >
          <span className="relative">Start Game</span>
        </button>
      </div>
    </div>
  );
}
