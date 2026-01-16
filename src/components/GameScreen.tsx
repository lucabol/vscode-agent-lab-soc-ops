import type { BingoSquareData } from '../types';
import { BingoBoard } from './BingoBoard';

interface GameScreenProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  onSquareClick: (squareId: number) => void;
  onReset: () => void;
}

export function GameScreen({
  board,
  winningSquareIds,
  hasBingo,
  onSquareClick,
  onReset,
}: GameScreenProps) {
  return (
    <div className="flex flex-col min-h-full bg-vintage-cream">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-vintage-paper border-b-2 border-vintage-border">
        <button
          onClick={onReset}
          className="text-vintage-burgundy font-display text-base px-4 py-2 rounded-sm border border-vintage-border active:bg-vintage-cream transition-colors"
        >
          ← Return
        </button>
        <h1 className="font-display font-bold text-vintage-burgundy text-2xl tracking-wide">Soc Ops</h1>
        <div className="w-20"></div>
      </header>

      {/* Instructions */}
      <p className="text-center text-vintage-brown font-body italic text-base py-3 px-4 bg-vintage-paper/50">
        Tap a square when you find someone who matches it.
      </p>

      {/* Bingo indicator */}
      {hasBingo && (
        <div className="bg-vintage-gold text-vintage-burgundy-dark text-center py-3 font-display font-bold text-lg border-y-2 border-vintage-gold-dark">
          ✦ BINGO! You completed a line! ✦
        </div>
      )}

      {/* Board */}
      <div className="flex-1 flex items-center justify-center p-4">
        <BingoBoard
          board={board}
          winningSquareIds={winningSquareIds}
          onSquareClick={onSquareClick}
        />
      </div>
    </div>
  );
}
