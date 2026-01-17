import type { CardData } from '../types';
import { shuffleArray } from './shuffle';

/**
 * Creates a shuffled deck of cards from questions
 */
export function createDeck(questions: string[]): CardData[] {
  return shuffleArray(questions).map((text) => ({ text }));
}

/**
 * Picks a random card from the available questions
 */
export function pickRandomCard(questions: string[]): CardData {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return { text: questions[randomIndex] };
}

/**
 * Picks a random card, avoiding the current one if possible
 */
export function pickNewRandomCard(
  questions: string[],
  currentText: string | null
): CardData {
  if (questions.length <= 1) {
    return { text: questions[0] || '' };
  }

  let newCard: CardData;
  do {
    newCard = pickRandomCard(questions);
  } while (newCard.text === currentText && questions.length > 1);

  return newCard;
}
