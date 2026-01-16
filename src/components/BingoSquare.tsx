import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const baseClasses =
    'relative flex items-center justify-center p-2 text-center border-2 border-vintage-border rounded-sm transition-all duration-200 select-none min-h-[70px] text-sm leading-snug font-body';

  const stateClasses = square.isMarked
    ? isWinning
      ? 'bg-vintage-gold border-vintage-gold-dark text-vintage-burgundy-dark font-semibold'
      : 'bg-marked border-marked-border text-vintage-brown font-semibold'
    : 'bg-vintage-paper text-vintage-brown active:bg-vintage-cream vintage-shadow';

  const freeSpaceClasses = square.isFreeSpace ? 'font-display font-bold text-lg text-vintage-burgundy' : '';

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      className={`${baseClasses} ${stateClasses} ${freeSpaceClasses}`}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
    >
      <span className="wrap-break-word hyphens-auto">{square.text}</span>
      {square.isMarked && !square.isFreeSpace && (
        <span className="absolute top-1 right-1 text-vintage-burgundy text-base font-bold">✓</span>
      )}
    </button>
  );
}
