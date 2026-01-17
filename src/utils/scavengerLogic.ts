import { questions } from '../data/questions';

// Re-export type for convenience
export interface ScavengerItemData {
  id: number;
  text: string;
  isChecked: boolean;
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generate a shuffled checklist of scavenger hunt items
 * @param count Number of items to include (default: 24)
 */
export function generateChecklist(count: number = 24): ScavengerItemData[] {
  if (count > questions.length) {
    throw new Error(`Cannot generate ${count} items, only ${questions.length} questions available`);
  }
  
  const shuffled = shuffleArray(questions).slice(0, count);
  return shuffled.map((text, index) => ({
    id: index,
    text,
    isChecked: false,
  }));
}

/**
 * Toggle an item's checked state
 */
export function toggleItem(items: ScavengerItemData[], id: number): ScavengerItemData[] {
  return items.map((item) =>
    item.id === id ? { ...item, isChecked: !item.isChecked } : item
  );
}

/**
 * Calculate progress as a percentage (0-100)
 */
export function calculateProgress(items: ScavengerItemData[]): number {
  if (items.length === 0) return 0;
  const checkedCount = items.filter((item) => item.isChecked).length;
  return Math.round((checkedCount / items.length) * 100);
}

/**
 * Check if all items are completed
 */
export function isComplete(items: ScavengerItemData[]): boolean {
  return items.every((item) => item.isChecked);
}
