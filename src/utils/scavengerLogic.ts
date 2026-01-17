import type { ScavengerItemData } from '../types';

// Re-export type for convenience
export type { ScavengerItemData } from '../types';

/** Progress through the scavenger hunt */
export interface ScavengerProgress {
  checked: number;
  total: number;
  percent: number;
}

/**
 * Create scavenger items from an array of questions
 */
export function createScavengerItems(questions: string[]): ScavengerItemData[] {
  return questions.map((text, index) => ({
    id: index,
    text,
    isChecked: false,
  }));
}

/**
 * Toggle a scavenger item's checked state
 */
export function toggleScavengerItem(
  items: ScavengerItemData[],
  id: number
): ScavengerItemData[] {
  return items.map((item) =>
    item.id === id ? { ...item, isChecked: !item.isChecked } : item
  );
}

/**
 * Calculate progress through the scavenger hunt
 */
export function calculateProgress(items: ScavengerItemData[]): ScavengerProgress {
  const total = items.length;
  const checked = items.filter((item) => item.isChecked).length;
  const percent = total === 0 ? 0 : Math.round((checked / total) * 100);

  return { checked, total, percent };
}

/**
 * Check if all scavenger items are complete
 */
export function isScavengerComplete(items: ScavengerItemData[]): boolean {
  return items.every((item) => item.isChecked);
}
