/**
 * Generic localStorage persistence utilities
 */

const SSR_GUARD = typeof window === 'undefined';

export interface StorageConfig<T> {
  key: string;
  version: number;
  validate: (data: unknown) => data is T;
}

/**
 * Load data from localStorage with validation
 */
export function loadFromStorage<T>(config: StorageConfig<T>): T | null {
  if (SSR_GUARD) {
    return null;
  }

  try {
    const saved = localStorage.getItem(config.key);
    if (!saved) {
      return null;
    }

    const parsed = JSON.parse(saved);
    
    if (config.validate(parsed)) {
      return parsed;
    } else {
      console.warn(`Invalid data in localStorage for ${config.key}, clearing...`);
      localStorage.removeItem(config.key);
    }
  } catch (error) {
    console.warn(`Failed to load from ${config.key}:`, error);
    localStorage.removeItem(config.key);
  }

  return null;
}

/**
 * Save data to localStorage
 */
export function saveToStorage<T>(key: string, data: T): void {
  if (SSR_GUARD) {
    return;
  }

  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn(`Failed to save to ${key}:`, error);
  }
}
