interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  return (
    <div className="fixed inset-0 bg-vintage-brown/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-vintage-paper rounded-sm p-8 max-w-sm w-full text-center vintage-shadow border-4 border-double border-vintage-gold animate-[bounce_0.5s_ease-out] relative">
        {/* Corner decorations */}
        <div className="absolute top-3 left-3 text-vintage-gold text-2xl">❧</div>
        <div className="absolute top-3 right-3 text-vintage-gold text-2xl">❧</div>
        <div className="absolute bottom-3 left-3 text-vintage-gold text-2xl">❧</div>
        <div className="absolute bottom-3 right-3 text-vintage-gold text-2xl">❧</div>
        
        <div className="text-6xl mb-4 text-vintage-gold">✦</div>
        <h2 className="text-5xl font-display font-black text-vintage-burgundy mb-3 tracking-wide">BINGO!</h2>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px bg-vintage-border flex-1"></div>
          <span className="text-vintage-gold text-xl">❖</span>
          <div className="h-px bg-vintage-border flex-1"></div>
        </div>
        <p className="text-vintage-brown font-body text-lg mb-8 italic">You completed a line!</p>
        
        <button
          onClick={onDismiss}
          className="w-full bg-vintage-burgundy text-vintage-cream font-display font-bold py-4 px-8 rounded-sm border-2 border-vintage-burgundy-dark active:bg-vintage-burgundy-dark transition-all vintage-shadow tracking-wide uppercase text-lg"
        >
          Continue Playing
        </button>
      </div>
    </div>
  );
}
