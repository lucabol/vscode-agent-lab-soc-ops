import { useBingoGame } from './hooks/useBingoGame';
import { useScavengerGame } from './hooks/useScavengerGame';
import { useCardDeckGame } from './hooks/useCardDeckGame';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { BingoModal } from './components/BingoModal';
import { ScavengerScreen } from './components/ScavengerScreen';
import { ScavengerModal } from './components/ScavengerModal';
import { CardDeckScreen } from './components/CardDeckScreen';

function App() {
  const {
    gameState: bingoGameState,
    board,
    winningSquareIds,
    showBingoModal,
    startGame: startBingoGame,
    handleSquareClick,
    resetGame: resetBingoGame,
    dismissModal: dismissBingoModal,
  } = useBingoGame();

  const {
    gameState: scavengerGameState,
    items,
    progress,
    showCompleteModal,
    startGame: startScavengerGame,
    toggleItem,
    resetGame: resetScavengerGame,
    dismissModal: dismissScavengerModal,
  } = useScavengerGame();

  const {
    gameState: cardDeckGameState,
    currentCard,
    isFlipped,
    startGame: startCardDeckGame,
    flipCard,
    drawNextCard,
    resetGame: resetCardDeckGame,
  } = useCardDeckGame();

  // Show start screen if no game is active
  if (bingoGameState === 'start' && scavengerGameState === 'start' && cardDeckGameState === 'start') {
    return (
      <StartScreen 
        onStartBingo={startBingoGame} 
        onStartScavenger={startScavengerGame}
        onStartCardDeck={startCardDeckGame}
      />
    );
  }

  // Card Deck mode
  if (cardDeckGameState === 'card-ready' || cardDeckGameState === 'card-revealed') {
    const handleCardClick = () => {
      if (!isFlipped) {
        flipCard();
      }
    };

    return (
      <CardDeckScreen
        currentCard={currentCard}
        isFlipped={isFlipped}
        onCardClick={handleCardClick}
        onPass={drawNextCard}
        onFail={drawNextCard}
        onReset={resetCardDeckGame}
      />
    );
  }

  // Scavenger Hunt mode
  if (scavengerGameState === 'scavenger-playing' || scavengerGameState === 'scavenger-complete') {
    return (
      <>
        <ScavengerScreen
          items={items}
          progress={progress}
          isComplete={scavengerGameState === 'scavenger-complete'}
          onItemClick={toggleItem}
          onReset={resetScavengerGame}
        />
        {showCompleteModal && (
          <ScavengerModal onDismiss={dismissScavengerModal} />
        )}
      </>
    );
  }

  // Bingo mode (default for playing/bingo states)
  return (
    <>
      <GameScreen
        board={board}
        winningSquareIds={winningSquareIds}
        hasBingo={bingoGameState === 'bingo'}
        onSquareClick={handleSquareClick}
        onReset={resetBingoGame}
      />
      {showBingoModal && (
        <BingoModal onDismiss={dismissBingoModal} />
      )}
    </>
  );
}

export default App;
