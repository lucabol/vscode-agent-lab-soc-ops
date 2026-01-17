import { useState, useCallback, useMemo, useEffect } from 'react';
import type { ScavengerItemData, ScavengerGameState } from '../types';
import {
  generateChecklist,
  toggleItem,
  calculateProgress,
  isComplete,
} from '../utils/scavengerLogic';
import { loadFromStorage, saveToStorage, type StorageConfig } from '../utils/storage';

export type { ScavengerGameState } from '../types';

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

const storageConfig: StorageConfig<StoredGameData> = {
  key: STORAGE_KEY,
  version: STORAGE_VERSION,
  validate: validateStoredData,
};

export function useScavengerGame(): ScavengerGameHookState & ScavengerGameActions {
  const loadedState = useMemo(() => loadFromStorage(storageConfig), []);

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
    const data: StoredGameData = {
      version: STORAGE_VERSION,
      gameState,
      items,
    };
    saveToStorage(STORAGE_KEY, data);
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
