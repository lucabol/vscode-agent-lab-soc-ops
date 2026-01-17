# Card Deck Shuffle - Design Spec

## Overview
A simple tap-to-reveal game mode where players get random question cards from the deck.

## User Flow
1. Player selects "Card Deck" from start screen
2. Screen shows a stylized card face-down
3. Tap card → flip animation → reveals random question
4. Tap again → shuffles to next random card
5. "Back to menu" option always visible

## Visual Design
- **Aesthetic**: Playing card / deck theme with minimal monochrome palette
- **Card**: Large centered card with subtle shadow and rotation
- **Animation**: 3D flip effect on tap (CSS transform)
- **Typography**: Question text centered on card face

## Components
- `CardDeckScreen.tsx` - Main screen with card and controls
- `useCardDeckGame.ts` - Simple state: current card, shuffle logic
- `cardDeckLogic.ts` - Pure logic for picking random cards

## Technical Notes
- Reuse existing `questions.ts` data source
- Use Tailwind v4 3D transforms: `rotate-y-180`, `preserve-3d`
- Fisher-Yates shuffle from existing `shuffle.ts`

## Iterations
- [x] Iteration 1: Basic card display and shuffle
