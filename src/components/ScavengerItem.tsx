import type { ScavengerItemData } from '../types';

interface ScavengerItemProps {
  item: ScavengerItemData;
  onToggle: () => void;
}

export function ScavengerItem({ item, onToggle }: ScavengerItemProps) {
  return (
    <button
      onClick={onToggle}
      className={`
        w-full flex items-start gap-3 p-4 text-left border-b border-mono-200
        transition-all duration-200 hover:bg-mono-100
        ${item.isChecked ? 'bg-mono-100' : 'bg-mono-50'}
      `}
      aria-pressed={item.isChecked}
      aria-label={`${item.text}${item.isChecked ? ', completed' : ''}`}
    >
      {/* Checkbox */}
      <div
        className={`
          flex-shrink-0 w-5 h-5 mt-0.5 border-2 flex items-center justify-center
          transition-all duration-200
          ${item.isChecked 
            ? 'border-mono-900 bg-mono-900 text-mono-50' 
            : 'border-mono-400 bg-mono-50'
          }
        `}
      >
        {item.isChecked && (
          <svg 
            className="w-3 h-3" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      
      {/* Text */}
      <span
        className={`
          text-sm leading-relaxed
          transition-all duration-200
          ${item.isChecked 
            ? 'text-mono-500 line-through' 
            : 'text-mono-800'
          }
        `}
      >
        {item.text}
      </span>
    </button>
  );
}
