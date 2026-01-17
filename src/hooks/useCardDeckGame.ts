import { useState, useCallback } from 'react';
import type { CardData, CardDeckGameState } from '../types';
import { pickRandomCard, pickNewRandomCard } from '../utils/cardDeckLogic';
import { questions } from '../data/questions';

export interface CardDeckGameStateData {
  gameState: CardDeckGameState;
  currentCard: CardData | null;
  isFlipped: boolean;
}

export interface CardDeckGameActions {
  startGame: () => void;
  flipCard: () => void;
  drawNextCard: () => void;
  resetGame: () => void;
}

export function useCardDeckGame(): CardDeckGameStateData & CardDeckGameActions {
  const [gameState, setGameState] = useState<CardDeckGameState>('start');
  const [currentCard, setCurrentCard] = useState<CardData | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const startGame = useCallback(() => {
    const card = pickRandomCard(questions);
    setCurrentCard(card);
    setIsFlipped(true);
    setGameState('card-revealed');
  }, []);

  const flipCard = useCallback(() => {
    if (gameState === 'card-ready') {
      setIsFlipped(true);
      setGameState('card-revealed');
    }
  }, [gameState]);

  const drawNextCard = useCallback(() => {
    const newCard = pickNewRandomCard(questions, currentCard?.text ?? null);
    setCurrentCard(newCard);
    setIsFlipped(false);
    setGameState('card-ready');
  }, [currentCard]);

  const resetGame = useCallback(() => {
    setGameState('start');
    setCurrentCard(null);
    setIsFlipped(false);
  }, []);

  return {
    gameState,
    currentCard,
    isFlipped,
    startGame,
    flipCard,
    drawNextCard,
    resetGame,
  };
}
