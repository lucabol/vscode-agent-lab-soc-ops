interface ScavengerModalProps {
  onDismiss: () => void;
}

export function ScavengerModal({ onDismiss }: ScavengerModalProps) {
  return (
    <div className="fixed inset-0 bg-mono-950/60 flex items-center justify-center p-6 z-50">
      <div className="bg-mono-50 border-2 border-mono-900 p-8 max-w-xs w-full text-center">
        <div className="text-4xl mb-6 font-light text-mono-900">★</div>
        <h2 className="text-2xl font-medium text-mono-950 mb-2 tracking-tight uppercase">
          Complete!
        </h2>
        <p className="text-mono-600 mb-8 text-xs uppercase tracking-wider">
          All items found
        </p>

        <button
          onClick={onDismiss}
          className="w-full border-2 border-mono-900 bg-mono-900 text-mono-50 font-medium py-3 px-6 text-xs uppercase tracking-[0.15em] transition-all duration-200 hover:bg-mono-950 active:scale-[0.98]"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
