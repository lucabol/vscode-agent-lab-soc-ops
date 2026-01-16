interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-full p-6 relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, var(--color-bg-gradient-start) 0%, var(--color-bg-base) 100%)'
      }}
    >
      {/* Subtle dot pattern background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #000000 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 'var(--dot-pattern-opacity)'
        }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-2xl w-full space-y-16">
        {/* Title section with fade-in animation */}
        <div 
          className="space-y-3"
          style={{
            animation: 'fadeInUp 0.8s ease-out forwards'
          }}
        >
          <h1 
            className="text-4xl sm:text-5xl font-display font-medium tracking-wide"
            style={{ 
              color: 'var(--color-text-primary)',
              letterSpacing: '0.02em'
            }}
          >
            Soc Ops
          </h1>
          {/* Subtle accent underline */}
          <div 
            className="w-16 h-0.5 mx-auto rounded-full"
            style={{ backgroundColor: 'var(--color-accent)' }}
            aria-hidden="true"
          />
          <p 
            className="text-lg sm:text-xl font-display font-light tracking-wide"
            style={{ 
              color: 'var(--color-text-secondary)',
              letterSpacing: '0.04em'
            }}
          >
            Social Bingo
          </p>
        </div>

        {/* Horizontal stepper instructions */}
        <div 
          className="flex items-center justify-center gap-4 sm:gap-8 px-4 sm:px-6"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.15s backwards'
          }}
          role="list"
          aria-label="How to play"
        >
          {/* Step 1 */}
          <div 
            className="flex flex-col items-center gap-2 sm:gap-3 flex-1 max-w-[100px] sm:max-w-[140px] group"
            role="listitem"
          >
            <div 
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-display font-medium text-white transition-all duration-300 group-hover:scale-110 flex-shrink-0"
              style={{ backgroundColor: 'var(--color-accent)' }}
              aria-hidden="true"
            >
              1
            </div>
            <p 
              className="text-xs sm:text-sm font-display text-center leading-relaxed transition-colors duration-300"
              style={{ 
                color: 'var(--color-text-tertiary)',
              }}
            >
              Find people who match
            </p>
          </div>

          {/* Connecting line */}
          <div 
            className="w-8 sm:w-12 h-px flex-shrink-0"
            style={{ backgroundColor: 'var(--color-text-tertiary)', opacity: 0.3 }}
            aria-hidden="true"
          />

          {/* Step 2 */}
          <div 
            className="flex flex-col items-center gap-2 sm:gap-3 flex-1 max-w-[100px] sm:max-w-[140px] group"
            role="listitem"
          >
            <div 
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-display font-medium text-white transition-all duration-300 group-hover:scale-110 flex-shrink-0"
              style={{ backgroundColor: 'var(--color-accent)' }}
              aria-hidden="true"
            >
              2
            </div>
            <p 
              className="text-xs sm:text-sm font-display text-center leading-relaxed transition-colors duration-300"
              style={{ 
                color: 'var(--color-text-tertiary)',
              }}
            >
              Tap when you find a match
            </p>
          </div>

          {/* Connecting line */}
          <div 
            className="w-8 sm:w-12 h-px flex-shrink-0"
            style={{ backgroundColor: 'var(--color-text-tertiary)', opacity: 0.3 }}
            aria-hidden="true"
          />

          {/* Step 3 */}
          <div 
            className="flex flex-col items-center gap-2 sm:gap-3 flex-1 max-w-[100px] sm:max-w-[140px] group"
            role="listitem"
          >
            <div 
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-display font-medium text-white transition-all duration-300 group-hover:scale-110 flex-shrink-0"
              style={{ backgroundColor: 'var(--color-accent)' }}
              aria-hidden="true"
            >
              3
            </div>
            <p 
              className="text-xs sm:text-sm font-display text-center leading-relaxed transition-colors duration-300"
              style={{ 
                color: 'var(--color-text-tertiary)',
              }}
            >
              Get 5 in a row to win
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.3s backwards'
          }}
        >
          <button
            onClick={onStart}
            className="px-12 py-4 rounded-xl font-display font-medium text-lg text-white transition-all duration-300 hover:shadow-md active:scale-[0.98] shadow-sm"
            style={{ 
              backgroundColor: 'var(--color-accent)',
            }}
            aria-label="Start playing Social Bingo"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}
