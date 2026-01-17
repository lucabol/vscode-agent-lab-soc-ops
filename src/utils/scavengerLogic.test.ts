import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  generateChecklist,
  toggleItem,
  calculateProgress,
  isComplete,
  type ScavengerItemData,
} from './scavengerLogic';

describe('scavengerLogic', () => {
  describe('generateChecklist', () => {
    it('should generate a checklist with the specified number of items', () => {
      const checklist = generateChecklist(12);
      expect(checklist).toHaveLength(12);
    });

    it('should default to 24 items when no count is provided', () => {
      const checklist = generateChecklist();
      expect(checklist).toHaveLength(24);
    });

    it('should have unique IDs starting from 0', () => {
      const checklist = generateChecklist(10);
      const ids = checklist.map((item) => item.id);
      expect(ids).toEqual(Array.from({ length: 10 }, (_, i) => i));
    });

    it('should have all items unchecked initially', () => {
      const checklist = generateChecklist(15);
      checklist.forEach((item) => {
        expect(item.isChecked).toBe(false);
      });
    });

    it('should have non-empty text for all items', () => {
      const checklist = generateChecklist(24);
      checklist.forEach((item) => {
        expect(item.text).toBeTruthy();
        expect(typeof item.text).toBe('string');
        expect(item.text.length).toBeGreaterThan(0);
      });
    });

    it('should randomize question order between checklists', () => {
      // Mock Math.random to make it deterministic
      const originalRandom = Math.random;
      let callCount = 0;
      vi.spyOn(Math, 'random').mockImplementation(() => {
        callCount++;
        return callCount / 100;
      });

      const checklist1 = generateChecklist(24);

      // Reset counter for second checklist
      callCount = 0;
      const checklist2 = generateChecklist(24);

      Math.random = originalRandom;

      // Verify structure is correct
      expect(checklist1).toHaveLength(24);
      expect(checklist2).toHaveLength(24);
    });

    it('should throw an error if count exceeds available questions', () => {
      expect(() => generateChecklist(100)).toThrow();
    });

    it('should handle count of 0', () => {
      const checklist = generateChecklist(0);
      expect(checklist).toHaveLength(0);
    });

    it('should handle count of 1', () => {
      const checklist = generateChecklist(1);
      expect(checklist).toHaveLength(1);
      expect(checklist[0].id).toBe(0);
      expect(checklist[0].isChecked).toBe(false);
    });
  });

  describe('toggleItem', () => {
    let mockChecklist: ScavengerItemData[];

    beforeEach(() => {
      mockChecklist = [
        { id: 0, text: 'Find someone who speaks another language', isChecked: false },
        { id: 1, text: 'Find someone who plays an instrument', isChecked: true },
        { id: 2, text: 'Find someone who has a pet', isChecked: false },
      ];
    });

    it('should toggle unchecked item to checked', () => {
      const newChecklist = toggleItem(mockChecklist, 0);
      expect(newChecklist[0].isChecked).toBe(true);
    });

    it('should toggle checked item to unchecked', () => {
      const newChecklist = toggleItem(mockChecklist, 1);
      expect(newChecklist[1].isChecked).toBe(false);
    });

    it('should return a new array (immutable)', () => {
      const newChecklist = toggleItem(mockChecklist, 0);
      expect(newChecklist).not.toBe(mockChecklist);
    });

    it('should not modify the original array', () => {
      const originalFirstItem = mockChecklist[0].isChecked;
      toggleItem(mockChecklist, 0);
      expect(mockChecklist[0].isChecked).toBe(originalFirstItem);
    });

    it('should not modify other items', () => {
      const newChecklist = toggleItem(mockChecklist, 0);
      expect(newChecklist[1].isChecked).toBe(mockChecklist[1].isChecked);
      expect(newChecklist[2].isChecked).toBe(mockChecklist[2].isChecked);
    });

    it('should handle toggling non-existent item gracefully', () => {
      const newChecklist = toggleItem(mockChecklist, 99);
      expect(newChecklist).toEqual(mockChecklist);
    });

    it('should preserve item text and id when toggling', () => {
      const newChecklist = toggleItem(mockChecklist, 0);
      expect(newChecklist[0].id).toBe(mockChecklist[0].id);
      expect(newChecklist[0].text).toBe(mockChecklist[0].text);
    });
  });

  describe('calculateProgress', () => {
    it('should return 0 for empty checklist', () => {
      const progress = calculateProgress([]);
      expect(progress).toBe(0);
    });

    it('should return 0 when no items are checked', () => {
      const checklist: ScavengerItemData[] = [
        { id: 0, text: 'Item 1', isChecked: false },
        { id: 1, text: 'Item 2', isChecked: false },
        { id: 2, text: 'Item 3', isChecked: false },
      ];
      const progress = calculateProgress(checklist);
      expect(progress).toBe(0);
    });

    it('should return 100 when all items are checked', () => {
      const checklist: ScavengerItemData[] = [
        { id: 0, text: 'Item 1', isChecked: true },
        { id: 1, text: 'Item 2', isChecked: true },
        { id: 2, text: 'Item 3', isChecked: true },
      ];
      const progress = calculateProgress(checklist);
      expect(progress).toBe(100);
    });

    it('should return correct percentage for partially checked list', () => {
      const checklist: ScavengerItemData[] = [
        { id: 0, text: 'Item 1', isChecked: true },
        { id: 1, text: 'Item 2', isChecked: false },
        { id: 2, text: 'Item 3', isChecked: false },
        { id: 3, text: 'Item 4', isChecked: false },
      ];
      const progress = calculateProgress(checklist);
      expect(progress).toBe(25);
    });

    it('should return 50 for half checked list', () => {
      const checklist: ScavengerItemData[] = [
        { id: 0, text: 'Item 1', isChecked: true },
        { id: 1, text: 'Item 2', isChecked: true },
        { id: 2, text: 'Item 3', isChecked: false },
        { id: 3, text: 'Item 4', isChecked: false },
      ];
      const progress = calculateProgress(checklist);
      expect(progress).toBe(50);
    });

    it('should handle single item list with item checked', () => {
      const checklist: ScavengerItemData[] = [
        { id: 0, text: 'Item 1', isChecked: true },
      ];
      const progress = calculateProgress(checklist);
      expect(progress).toBe(100);
    });

    it('should handle single item list with item unchecked', () => {
      const checklist: ScavengerItemData[] = [
        { id: 0, text: 'Item 1', isChecked: false },
      ];
      const progress = calculateProgress(checklist);
      expect(progress).toBe(0);
    });

    it('should round to nearest integer', () => {
      const checklist: ScavengerItemData[] = [
        { id: 0, text: 'Item 1', isChecked: true },
        { id: 1, text: 'Item 2', isChecked: false },
        { id: 2, text: 'Item 3', isChecked: false },
      ];
      // 1/3 = 33.333... should round to 33
      const progress = calculateProgress(checklist);
      expect(progress).toBe(33);
    });
  });

  describe('isComplete', () => {
    it('should return true when all items are checked', () => {
      const checklist: ScavengerItemData[] = [
        { id: 0, text: 'Item 1', isChecked: true },
        { id: 1, text: 'Item 2', isChecked: true },
        { id: 2, text: 'Item 3', isChecked: true },
      ];
      expect(isComplete(checklist)).toBe(true);
    });

    it('should return false when no items are checked', () => {
      const checklist: ScavengerItemData[] = [
        { id: 0, text: 'Item 1', isChecked: false },
        { id: 1, text: 'Item 2', isChecked: false },
      ];
      expect(isComplete(checklist)).toBe(false);
    });

    it('should return false when some items are checked', () => {
      const checklist: ScavengerItemData[] = [
        { id: 0, text: 'Item 1', isChecked: true },
        { id: 1, text: 'Item 2', isChecked: false },
        { id: 2, text: 'Item 3', isChecked: true },
      ];
      expect(isComplete(checklist)).toBe(false);
    });

    it('should return true for empty checklist', () => {
      expect(isComplete([])).toBe(true);
    });

    it('should return true for single checked item', () => {
      const checklist: ScavengerItemData[] = [
        { id: 0, text: 'Item 1', isChecked: true },
      ];
      expect(isComplete(checklist)).toBe(true);
    });

    it('should return false for single unchecked item', () => {
      const checklist: ScavengerItemData[] = [
        { id: 0, text: 'Item 1', isChecked: false },
      ];
      expect(isComplete(checklist)).toBe(false);
    });
  });
});
