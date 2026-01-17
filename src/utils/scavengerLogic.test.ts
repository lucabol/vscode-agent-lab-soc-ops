import { describe, it, expect, beforeEach } from 'vitest';
import {
  createScavengerItems,
  toggleScavengerItem,
  calculateProgress,
  isScavengerComplete,
} from './scavengerLogic';
import type { ScavengerItemData } from '../types';

/** Create a single test item with defaults */
function createTestItem(
  id: number,
  text: string,
  isChecked = false
): ScavengerItemData {
  return { id, text, isChecked };
}

/** Create multiple test items from an array of [text, isChecked] tuples */
function createTestItems(
  items: Array<[string, boolean]>
): ScavengerItemData[] {
  return items.map(([text, isChecked], id) => createTestItem(id, text, isChecked));
}

describe('scavengerLogic', () => {
  describe('createScavengerItems', () => {
    it('should create an array of items from questions', () => {
      const questions = ['Question 1', 'Question 2', 'Question 3'];
      const items = createScavengerItems(questions);
      expect(items).toHaveLength(3);
    });

    it('should assign sequential IDs starting from 0', () => {
      const questions = ['Q1', 'Q2', 'Q3', 'Q4'];
      const items = createScavengerItems(questions);
      const ids = items.map((item) => item.id);
      expect(ids).toEqual([0, 1, 2, 3]);
    });

    it('should set text from corresponding question', () => {
      const questions = ['Find a coffee cup', 'Spot a red car'];
      const items = createScavengerItems(questions);
      expect(items[0].text).toBe('Find a coffee cup');
      expect(items[1].text).toBe('Spot a red car');
    });

    it('should initialize all items with isChecked=false', () => {
      const questions = ['Q1', 'Q2', 'Q3'];
      const items = createScavengerItems(questions);
      items.forEach((item) => {
        expect(item.isChecked).toBe(false);
      });
    });

    it('should return empty array for empty questions', () => {
      const items = createScavengerItems([]);
      expect(items).toEqual([]);
    });
  });

  describe('toggleScavengerItem', () => {
    let mockItems: ScavengerItemData[];

    beforeEach(() => {
      mockItems = createTestItems([
        ['Item 1', false],
        ['Item 2', true],
        ['Item 3', false],
      ]);
    });

    it('should toggle unchecked item to checked', () => {
      const newItems = toggleScavengerItem(mockItems, 0);
      expect(newItems[0].isChecked).toBe(true);
    });

    it('should toggle checked item to unchecked', () => {
      const newItems = toggleScavengerItem(mockItems, 1);
      expect(newItems[1].isChecked).toBe(false);
    });

    it('should return a new array (immutable)', () => {
      const newItems = toggleScavengerItem(mockItems, 0);
      expect(newItems).not.toBe(mockItems);
    });

    it('should not modify the original array', () => {
      const originalChecked = mockItems[0].isChecked;
      toggleScavengerItem(mockItems, 0);
      expect(mockItems[0].isChecked).toBe(originalChecked);
    });

    it('should not modify other items', () => {
      const newItems = toggleScavengerItem(mockItems, 0);
      expect(newItems[1].isChecked).toBe(mockItems[1].isChecked);
      expect(newItems[2].isChecked).toBe(mockItems[2].isChecked);
    });

    it('should handle toggling non-existent id gracefully', () => {
      const newItems = toggleScavengerItem(mockItems, 999);
      expect(newItems).toEqual(mockItems);
    });
  });

  describe('calculateProgress', () => {
    it('should return correct counts for partially checked items', () => {
      const items = createTestItems([
        ['Item 1', true],
        ['Item 2', false],
        ['Item 3', true],
        ['Item 4', false],
      ]);
      const progress = calculateProgress(items);
      expect(progress.checked).toBe(2);
      expect(progress.total).toBe(4);
      expect(progress.percent).toBe(50);
    });

    it('should return 0% for no checked items', () => {
      const items = createTestItems([
        ['Item 1', false],
        ['Item 2', false],
      ]);
      const progress = calculateProgress(items);
      expect(progress.checked).toBe(0);
      expect(progress.total).toBe(2);
      expect(progress.percent).toBe(0);
    });

    it('should return 100% for all checked items', () => {
      const items = createTestItems([
        ['Item 1', true],
        ['Item 2', true],
        ['Item 3', true],
      ]);
      const progress = calculateProgress(items);
      expect(progress.checked).toBe(3);
      expect(progress.total).toBe(3);
      expect(progress.percent).toBe(100);
    });

    it('should handle empty array', () => {
      const progress = calculateProgress([]);
      expect(progress.checked).toBe(0);
      expect(progress.total).toBe(0);
      expect(progress.percent).toBe(0);
    });

    it('should round percentage to nearest integer', () => {
      const items = createTestItems([
        ['Item 1', true],
        ['Item 2', false],
        ['Item 3', false],
      ]);
      const progress = calculateProgress(items);
      // 1/3 = 33.33... should round to 33
      expect(progress.percent).toBe(33);
    });
  });

  describe('isScavengerComplete', () => {
    it('should return true when all items are checked', () => {
      const items = createTestItems([
        ['Item 1', true],
        ['Item 2', true],
        ['Item 3', true],
      ]);
      expect(isScavengerComplete(items)).toBe(true);
    });

    it('should return false when some items are unchecked', () => {
      const items = createTestItems([
        ['Item 1', true],
        ['Item 2', false],
        ['Item 3', true],
      ]);
      expect(isScavengerComplete(items)).toBe(false);
    });

    it('should return false when no items are checked', () => {
      const items = createTestItems([
        ['Item 1', false],
        ['Item 2', false],
      ]);
      expect(isScavengerComplete(items)).toBe(false);
    });

    it('should return true for empty array (vacuous truth)', () => {
      expect(isScavengerComplete([])).toBe(true);
    });

    it('should return true for single checked item', () => {
      const items = [createTestItem(0, 'Only item', true)];
      expect(isScavengerComplete(items)).toBe(true);
    });

    it('should return false for single unchecked item', () => {
      const items = [createTestItem(0, 'Only item', false)];
      expect(isScavengerComplete(items)).toBe(false);
    });
  });
});
