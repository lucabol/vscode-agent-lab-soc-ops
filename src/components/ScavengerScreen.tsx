import type { ScavengerItemData } from '../utils/scavengerLogic';
import { ScavengerItem } from './ScavengerItem';

interface ScavengerScreenProps {
  items: ScavengerItemData[];
  progress: number;
  isComplete: boolean;
  onItemClick: (itemId: number) => void;
  onReset: () => void;
}

export function ScavengerScreen({
  items,
  progress,
  isComplete,
  onItemClick,
  onReset,
}: ScavengerScreenProps) {
  const checkedCount = items.filter(i => i.isChecked).length;

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
        <h1 className="font-medium text-mono-950 tracking-tight text-sm uppercase">Scavenger Hunt</h1>
        <div className="w-20"></div>
      </header>

      {/* Progress Section */}
      <div className="px-4 py-3 border-b border-mono-200 bg-mono-50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase tracking-wider text-mono-500 font-medium">Progress</span>
          <span className="text-xs uppercase tracking-wider text-mono-700 font-medium">
            {checkedCount} / {items.length}
          </span>
        </div>
        {/* Progress Bar */}
        <div className="h-2 bg-mono-200 overflow-hidden">
          <div
            className="h-full bg-mono-900 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${progress}% complete`}
          />
        </div>
      </div>

      {/* Complete indicator */}
      {isComplete && (
        <div className="bg-mono-900 text-mono-50 text-center py-3 font-medium text-xs uppercase tracking-[0.2em]">
          ★ Hunt Complete
        </div>
      )}

      {/* Checklist */}
      <div className="flex-1 overflow-y-auto">
        {items.map((item) => (
          <ScavengerItem
            key={item.id}
            item={item}
            onToggle={() => onItemClick(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
