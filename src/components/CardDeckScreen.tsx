import { useState } from 'react';
import type { CardData } from '../types';

interface CardDeckScreenProps {
  currentCard: CardData | null;
  isFlipped: boolean;
  onCardClick: () => void;
  onPass: () => void;
  onFail: () => void;
  onReset: () => void;
}

export function CardDeckScreen({
  currentCard,
  isFlipped,
  onCardClick,
  onPass,
  onFail,
  onReset,
}: CardDeckScreenProps) {
  const [announcement, setAnnouncement] = useState('');

  const handlePass = () => {
    onPass();
    setAnnouncement('Match recorded');
  };

  const handleFail = () => {
    onFail();
    setAnnouncement('Card skipped');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 bg-mono-50">
      <div className="sr-only" role="status" aria-live="polite">{announcement}</div>
      {/* Header */}
      <div className="absolute top-6 left-0 right-0 text-center">
        <h1 className="text-lg font-normal text-mono-400 uppercase tracking-[0.15em]">
          Card Deck
        </h1>
      </div>

      {/* Card Container */}
      <div className="flex-1 flex items-center justify-center w-full max-w-sm">
        <button
          onClick={onCardClick}
          className="card-container w-full aspect-3/4 max-h-[65vh] perspective-1000"
          aria-label={isFlipped ? 'Draw next card' : 'Flip card to reveal question'}
        >
          <div
            className={`card-inner relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* Card Back */}
            <div className="card-face card-back absolute inset-0 backface-hidden rounded-2xl border-2 border-mono-300 bg-mono-900 flex items-center justify-center shadow-xl">
              <div className="absolute inset-4 border border-mono-700 rounded-xl" />
              <div className="text-mono-600 text-6xl font-light select-none">?</div>
              <div className="absolute bottom-6 text-mono-500 text-xs uppercase tracking-[0.2em]">
                Tap to reveal
              </div>
            </div>

            {/* Card Front */}
            <div className="card-face card-front absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border-2 border-mono-200 bg-mono-50 flex flex-col items-center justify-center p-8 shadow-xl">
              <div className="absolute inset-4 border border-mono-200 rounded-xl" />
              <p className="text-xl text-mono-900 text-center font-normal leading-relaxed z-10">
                Find someone who...
              </p>
              <p className="text-2xl text-mono-950 text-center font-medium leading-relaxed mt-4 z-10">
                {currentCard?.text}
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Action Buttons - Only show when card is flipped */}
      <div
        className={`flex gap-6 mt-6 transition-all duration-300 ${
          isFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <button
          onClick={handleFail}
          disabled={!isFlipped}
          aria-hidden={!isFlipped}
          className="w-16 h-16 rounded-full border-2 border-red-200 bg-red-50 text-red-400 flex items-center justify-center hover:border-red-300 hover:bg-red-100 transition-all active:scale-95"
          aria-label="No match found"
        >
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button
          onClick={handlePass}
          disabled={!isFlipped}
          aria-hidden={!isFlipped}
          className="w-16 h-16 rounded-full border-2 border-green-200 bg-green-50 text-green-500 flex items-center justify-center hover:border-green-300 hover:bg-green-100 transition-all active:scale-95"
          aria-label="Match found"
        >
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>

      {/* Footer */}
      <div className="mt-8">
        <button
          onClick={onReset}
          className="text-mono-500 text-sm uppercase tracking-[0.15em] hover:text-mono-700 transition-colors"
        >
          ← Back to Menu
        </button>
      </div>
    </div>
  );
}
