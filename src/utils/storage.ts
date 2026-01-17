/**
 * Generic localStorage utilities with validation
 */

export interface StorageConfig<T> {
  key: string;
  version: number;
  validate: (data: unknown) => data is T;
}

/**
 * Load and validate data from localStorage
 */
export function loadFromStorage<T>(config: StorageConfig<T>): T | null {
  try {
    const raw = localStorage.getItem(config.key);
    if (!raw) return null;

    const data = JSON.parse(raw);
    if (config.validate(data)) {
      return data;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Save data to localStorage
 */
export function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Silently fail if localStorage is unavailable
  }
}
