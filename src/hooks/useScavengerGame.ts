import { useState, useCallback, useMemo, useEffect } from 'react';
import type { ScavengerItemData, ScavengerGameState } from '../types';
import {
  createScavengerItems,
  toggleScavengerItem,
  calculateProgress,
  isScavengerComplete,
  type ScavengerProgress,
} from '../utils/scavengerLogic';
import { questions } from '../data/questions';

export interface ScavengerGameStateData {
  gameState: ScavengerGameState;
  items: ScavengerItemData[];
  progress: ScavengerProgress;
  isComplete: boolean;
  showCompleteModal: boolean;
}

export interface ScavengerGameActions {
  startGame: () => void;
  toggleItem: (id: number) => void;
  resetGame: () => void;
  dismissModal: () => void;
}

const STORAGE_KEY = 'scavenger-hunt-state';
const STORAGE_VERSION = 1;

interface StoredScavengerData {
  version: number;
  gameState: ScavengerGameState;
  items: ScavengerItemData[];
}

function validateStoredData(data: unknown): data is StoredScavengerData {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const obj = data as Record<string, unknown>;

  if (obj.version !== STORAGE_VERSION) {
    return false;
  }

  if (
    typeof obj.gameState !== 'string' ||
    !['start', 'scavenger-playing', 'scavenger-complete'].includes(obj.gameState)
  ) {
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

function loadFromStorage(): StoredScavengerData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const data = JSON.parse(raw);
    if (validateStoredData(data)) {
      return data;
    }
    return null;
  } catch {
    return null;
  }
}

function saveToStorage(data: StoredScavengerData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

export function useScavengerGame(): ScavengerGameStateData & ScavengerGameActions {
  const loadedState = useMemo(() => loadFromStorage(), []);

  const [gameState, setGameState] = useState<ScavengerGameState>(
    () => loadedState?.gameState || 'start'
  );
  const [items, setItems] = useState<ScavengerItemData[]>(
    () => loadedState?.items || []
  );
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  // Derived values
  const progress = useMemo(() => calculateProgress(items), [items]);
  const isComplete = useMemo(() => isScavengerComplete(items), [items]);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    const data: StoredScavengerData = {
      version: STORAGE_VERSION,
      gameState,
      items,
    };
    saveToStorage(data);
  }, [gameState, items]);

  const startGame = useCallback(() => {
    setItems(createScavengerItems(questions));
    setGameState('scavenger-playing');
    setShowCompleteModal(false);
  }, []);

  const toggleItem = useCallback((id: number) => {
    setItems((currentItems) => {
      const newItems = toggleScavengerItem(currentItems, id);

      // Check for completion after toggling
      if (isScavengerComplete(newItems)) {
        queueMicrotask(() => {
          setGameState('scavenger-complete');
          setShowCompleteModal(true);
        });
      }

      return newItems;
    });
  }, []);

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
    isComplete,
    showCompleteModal,
    startGame,
    toggleItem,
    resetGame,
    dismissModal,
  };
}
