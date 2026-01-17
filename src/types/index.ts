/** Domain types for the Bingo game */

export interface BingoSquareData {
  id: number;
  text: string;
  isMarked: boolean;
  isFreeSpace: boolean;
}

export interface BingoLine {
  type: 'row' | 'column' | 'diagonal';
  index: number;
  squares: number[];
}

export type GameState = 'start' | 'playing' | 'bingo';

/** Domain types for the Scavenger Hunt game */

export interface ScavengerItemData {
  id: number;
  text: string;
  isChecked: boolean;
}

export type ScavengerGameState = 'start' | 'scavenger-playing' | 'scavenger-complete';

/** Domain types for the Card Deck game */

export interface CardData {
  text: string;
}

export type CardDeckGameState = 'start' | 'card-ready' | 'card-revealed';
