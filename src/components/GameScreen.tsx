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
    <div className="flex flex-col min-h-full bg-mono-50">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-mono-300">
        <button
          onClick={onReset}
          className="text-mono-700 text-xs uppercase tracking-wider px-3 py-2 hover:text-mono-950 transition-colors font-medium"
        >
          ← Reset
        </button>
        <h1 className="font-medium text-mono-950 tracking-tight text-sm uppercase">SOC OPS</h1>
        <div className="w-20"></div>
      </header>

      {/* Instructions */}
      <p className="text-center text-mono-600 text-xs uppercase tracking-wider py-3 px-4 font-light">
        Mark squares to find matches
      </p>

      {/* Bingo indicator */}
      {hasBingo && (
        <div className="bg-mono-900 text-mono-50 text-center py-3 font-medium text-xs uppercase tracking-[0.2em]">
          ★ Bingo Achieved
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
