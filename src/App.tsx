import { useBingoGame } from './hooks/useBingoGame';
import { useScavengerGame } from './hooks/useScavengerGame';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { BingoModal } from './components/BingoModal';
import { ScavengerScreen } from './components/ScavengerScreen';
import { ScavengerModal } from './components/ScavengerModal';

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

  // Show start screen if neither game is active
  if (bingoGameState === 'start' && scavengerGameState === 'start') {
    return (
      <StartScreen 
        onStartBingo={startBingoGame} 
        onStartScavenger={startScavengerGame} 
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
