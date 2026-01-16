# Copilot Instructions for Soc Ops

## ⚠️ Before Committing
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] `npm run test` passes (21 tests)

## Architecture
Social Bingo: React 19 + TypeScript + Vite 7 + Tailwind v4. Layers: `components/` (stateless UI) → `hooks/useBingoGame.ts` (state) → `utils/bingoLogic.ts` (pure logic).

**Types**: `BingoSquareData`, `BingoLine`, `GameState` in `src/types/index.ts`

## Conventions
- **Tailwind v4**: Theme in `src/index.css` via `@theme`, use `@import 'tailwindcss'`
- **Components**: Named exports, explicit prop interfaces, `aria-*` attributes
- **Testing**: Tests next to source (`*.test.ts`), test pure logic only
- **Game**: 5x5 grid, center (index 12) = FREE SPACE, Fisher-Yates shuffle

## Adding Questions
Edit `src/data/questions.ts` - add strings to array (need 24+).
