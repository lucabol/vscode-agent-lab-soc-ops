import type { ScavengerItemData } from '../types';
import type { ScavengerProgress } from '../utils/scavengerLogic';

interface ScavengerScreenProps {
  items: ScavengerItemData[];
  progress: ScavengerProgress;
  isComplete: boolean;
  onItemClick: (id: number) => void;
  onReset: () => void;
}

export function ScavengerScreen({
  items,
  progress,
  isComplete,
  onItemClick,
  onReset,
}: ScavengerScreenProps) {
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
        <h1 className="font-medium text-mono-950 tracking-tight text-sm uppercase">
          SOC OPS
        </h1>
        <div className="w-20"></div>
      </header>

      {/* Progress Bar */}
      <div className="px-4 py-3 border-b border-mono-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase tracking-wider text-mono-500 font-light">
            Scavenger Hunt
          </span>
          <span className="text-xs uppercase tracking-wider text-mono-700 font-medium">
            {progress.checked} / {progress.total}
          </span>
        </div>
        <div className="h-2 bg-mono-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-mono-900 transition-all duration-300 ease-out"
            style={{ width: `${progress.percent}%` }}
            role="progressbar"
            aria-valuenow={progress.percent}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <p className="text-center text-mono-500 text-xs mt-2">
          {progress.percent}% complete
        </p>
      </div>

      {/* Completion indicator */}
      {isComplete && (
        <div className="bg-mono-900 text-mono-50 text-center py-3 font-medium text-xs uppercase tracking-[0.2em]">
          ★ All Found
        </div>
      )}

      {/* Checklist */}
      <div className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2 max-w-lg mx-auto">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onItemClick(item.id)}
                className={`w-full text-left p-4 border-2 transition-all duration-150 flex items-start gap-3 ${
                  item.isChecked
                    ? 'bg-mono-900 border-mono-900 text-mono-50'
                    : 'bg-mono-50 border-mono-300 text-mono-800 hover:border-mono-500'
                }`}
                aria-pressed={item.isChecked}
              >
                {/* Checkbox indicator */}
                <span
                  className={`flex-shrink-0 w-5 h-5 border-2 flex items-center justify-center mt-0.5 ${
                    item.isChecked
                      ? 'border-mono-50 bg-mono-50 text-mono-900'
                      : 'border-mono-400'
                  }`}
                >
                  {item.isChecked && (
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>
                {/* Item text */}
                <span
                  className={`text-sm leading-relaxed ${
                    item.isChecked ? 'line-through opacity-80' : ''
                  }`}
                >
                  {item.text}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
