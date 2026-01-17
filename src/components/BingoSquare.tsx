import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const baseClasses =
    'relative flex items-center justify-center p-1 md:p-2 text-center border transition-all duration-150 select-none min-h-[50px] md:min-h-[70px] text-[10px] md:text-xs leading-tight';

  const stateClasses = square.isMarked
    ? isWinning
      ? 'bg-mono-900 border-mono-950 text-mono-50 font-medium'
      : 'bg-mono-800 border-mono-900 text-mono-50'
    : 'bg-mono-50 text-mono-700 border-mono-300 hover:border-mono-500 active:bg-mono-100';

  const freeSpaceClasses = square.isFreeSpace ? 'font-medium text-[0.5rem] md:text-[0.65rem] uppercase tracking-wider' : '';

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
        <span className="absolute top-0.5 right-0.5 md:top-1 md:right-1 text-mono-50 text-[0.5rem] md:text-[0.6rem]">■</span>
      )}
    </button>
  );
}
