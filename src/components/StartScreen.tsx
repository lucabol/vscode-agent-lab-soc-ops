interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const title = "SOC OPS";
  
  return (
    <div className="relative flex flex-col items-center justify-center min-h-full p-6 overflow-hidden bg-gradient-to-br from-party-purple to-party-indigo">
      {/* Floating confetti elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-3 h-3 rounded-full bg-party-pink opacity-60" style={{ animation: 'confetti-float 6s ease-in-out infinite' }} />
        <div className="absolute top-[25%] right-[20%] w-4 h-4 rounded-full bg-party-yellow opacity-70" style={{ animation: 'confetti-float 8s ease-in-out infinite 1s' }} />
        <div className="absolute top-[40%] left-[10%] w-2 h-2 rounded-full bg-party-cyan opacity-80" style={{ animation: 'confetti-float 7s ease-in-out infinite 2s' }} />
        <div className="absolute top-[60%] right-[15%] w-3 h-3 rounded-full bg-party-pink opacity-50" style={{ animation: 'confetti-float 9s ease-in-out infinite 1.5s' }} />
        <div className="absolute top-[70%] left-[25%] w-4 h-4 rounded-full bg-party-cyan opacity-60" style={{ animation: 'confetti-float 7.5s ease-in-out infinite 0.5s' }} />
        <div className="absolute top-[15%] right-[30%] w-2 h-2 rounded-full bg-party-yellow opacity-70" style={{ animation: 'confetti-float 8.5s ease-in-out infinite 2.5s' }} />
      </div>

      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30 pointer-events-none" />
      
      <div className="relative text-center max-w-lg z-10">
        {/* Title with staggered animation */}
        <h1 className="mb-2 font-display text-7xl md:text-8xl font-extrabold tracking-tight" aria-label={title}>
          {title.split('').map((letter, index) => (
            <span
              key={index}
              className="inline-block"
              style={{
                animation: 'titleStagger 0.6s ease-out forwards',
                animationDelay: `${index * 0.08}s`,
                opacity: 0,
                color: index < 3 ? '#ec4899' : index < 4 ? '#facc15' : '#22d3d5'
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>
        
        {/* Subtitle */}
        <p 
          className="text-2xl md:text-3xl font-display font-semibold text-party-yellow mb-12"
          style={{
            animation: 'slideInUp 0.8s ease-out forwards',
            animationDelay: '0.6s',
            opacity: 0
          }}
        >
          Social Bingo
        </p>
        
        {/* Instructions with emoji badges */}
        <div 
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-10 border border-white/20"
          style={{
            animation: 'slideInUp 0.8s ease-out forwards',
            animationDelay: '0.9s',
            opacity: 0
          }}
        >
          <div className="space-y-5">
            <div 
              className="flex items-start gap-4 text-left"
              style={{
                animation: 'slideInUp 0.6s ease-out forwards',
                animationDelay: '1.2s',
                opacity: 0
              }}
            >
              <div className="flex-shrink-0 w-10 h-10 bg-party-cyan rounded-full flex items-center justify-center text-xl">
                👆
              </div>
              <p className="text-white text-lg leading-relaxed pt-1.5">
                Tap squares that match your experiences
              </p>
            </div>
            
            <div 
              className="flex items-start gap-4 text-left"
              style={{
                animation: 'slideInUp 0.6s ease-out forwards',
                animationDelay: '1.4s',
                opacity: 0
              }}
            >
              <div className="flex-shrink-0 w-10 h-10 bg-party-yellow rounded-full flex items-center justify-center text-xl">
                ✅
              </div>
              <p className="text-white text-lg leading-relaxed pt-1.5">
                Mark them to track progress
              </p>
            </div>
            
            <div 
              className="flex items-start gap-4 text-left"
              style={{
                animation: 'slideInUp 0.6s ease-out forwards',
                animationDelay: '1.6s',
                opacity: 0
              }}
            >
              <div className="flex-shrink-0 w-10 h-10 bg-party-pink rounded-full flex items-center justify-center text-xl">
                🎉
              </div>
              <p className="text-white text-lg leading-relaxed pt-1.5">
                Get 5 in a row to win!
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="w-full bg-party-pink text-white font-display font-bold py-5 px-10 rounded-full text-xl shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200"
          style={{
            animation: 'slideInUp 0.8s ease-out forwards, pulse-glow 2s ease-in-out infinite',
            animationDelay: '1.8s, 2.6s',
            opacity: 0
          }}
          aria-label="Start playing Social Bingo"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
