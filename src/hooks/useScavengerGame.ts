import { useState, useCallback, useMemo, useEffect } from 'react';
import type { ScavengerItemData } from '../utils/scavengerLogic';
import {
  generateChecklist,
  toggleItem,
  calculateProgress,
  isComplete,
} from '../utils/scavengerLogic';

export type ScavengerGameState = 'start' | 'scavenger-playing' | 'scavenger-complete';

export interface ScavengerGameHookState {
  gameState: ScavengerGameState;
  items: ScavengerItemData[];
  progress: number;
  showCompleteModal: boolean;
}

export interface ScavengerGameActions {
  startGame: () => void;
  handleItemClick: (itemId: number) => void;
  resetGame: () => void;
  dismissModal: () => void;
}

const STORAGE_KEY = 'scavenger-game-state';
const STORAGE_VERSION = 1;

interface StoredGameData {
  version: number;
  gameState: ScavengerGameState;
  items: ScavengerItemData[];
}

function validateStoredData(data: unknown): data is StoredGameData {
  if (!data || typeof data !== 'object') {
    return false;
  }
  
  const obj = data as Record<string, unknown>;
  
  if (obj.version !== STORAGE_VERSION) {
    return false;
  }
  
  if (typeof obj.gameState !== 'string' || !['start', 'scavenger-playing', 'scavenger-complete'].includes(obj.gameState)) {
    return false;
  }
  
  if (!Array.isArray(obj.items)) {
    return false;
  }
  
  const validItems = obj.items.every((item: unknown) => {
    if (!item || typeof item !== 'object') return false;
    const i = item as Record<string, unknown>;
    return (
      typeof i.id === 'number' &&
      typeof i.text === 'string' &&
      typeof i.isChecked === 'boolean'
    );
  });
  
  if (!validItems) {
    return false;
  }
  
  return true;
}

function loadGameState(): Pick<StoredGameData, 'gameState' | 'items'> | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return null;
    }

    const parsed = JSON.parse(saved);
    
    if (validateStoredData(parsed)) {
      return {
        gameState: parsed.gameState,
        items: parsed.items,
      };
    } else {
      console.warn('Invalid scavenger game state data in localStorage, clearing...');
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.warn('Failed to load scavenger game state:', error);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return null;
}

function saveGameState(gameState: ScavengerGameState, items: ScavengerItemData[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const data: StoredGameData = {
      version: STORAGE_VERSION,
      gameState,
      items,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save scavenger game state:', error);
  }
}

export function useScavengerGame(): ScavengerGameHookState & ScavengerGameActions {
  const loadedState = useMemo(() => loadGameState(), []);

  const [gameState, setGameState] = useState<ScavengerGameState>(
    () => loadedState?.gameState || 'start'
  );
  const [items, setItems] = useState<ScavengerItemData[]>(
    () => loadedState?.items || []
  );
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const progress = useMemo(() => calculateProgress(items), [items]);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    saveGameState(gameState, items);
  }, [gameState, items]);

  const startGame = useCallback(() => {
    setItems(generateChecklist(24));
    setGameState('scavenger-playing');
  }, []);

  const handleItemClick = useCallback((itemId: number) => {
    setItems((currentItems) => {
      const newItems = toggleItem(currentItems, itemId);
      
      // Check for completion after toggling
      if (isComplete(newItems) && gameState !== 'scavenger-complete') {
        queueMicrotask(() => {
          setGameState('scavenger-complete');
          setShowCompleteModal(true);
        });
      }
      
      return newItems;
    });
  }, [gameState]);

  const resetGame = useCallback(() => {
    setGameState('start');
    setItems([]);
    setShowCompleteModal(false);
  }, []);

  const dismissModal = useCallback(() => {
    setShowCompleteModal(false);
  }, []);

  return {
    gameState,
    items,
    progress,
    showCompleteModal,
    startGame,
    handleItemClick,
    resetGame,
    dismissModal,
  };
}
