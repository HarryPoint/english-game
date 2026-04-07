# 俄罗斯方块 - Tetris

## Project Overview
- **Type**: Classic arcade game
- **Core**: Full-width Tetris with keyboard controls
- **Target**: Desktop browsers

## Visual Specification

### Layout
- Game board centered, sized to fit comfortably in viewport width
- Side panel for score, next piece preview, and controls help
- Retro pixel-art aesthetic with clean modern touches

### Colors
- Background: Dark navy (#1a1a2e)
- Board: Darker background with grid lines
- Pieces: Classic Tetris colors (cyan, yellow, purple, orange, blue, green, red)
- UI: White text with accent colors

### Typography
- Monospace font for retro feel
- Score display with large numbers

## Game Specification

### Board
- 10 columns × 20 rows (standard Tetris)
- Cell size calculated from available width

### Pieces (Tetrominos)
- I, O, T, S, Z, J, L
- Standard Tetris rotation rules
- SRS (Super Rotation System) not required

### Controls
- Arrow Left/Right: Move piece
- Arrow Down: Soft drop
- Arrow Up: Rotate clockwise
- Space: Hard drop
- P: Pause/Resume

### Scoring
- 1 line: 100 × level
- 2 lines: 300 × level
- 3 lines: 500 × level
- 4 lines (Tetris): 800 × level
- Level increases every 10 lines

### Game States
- Start screen with "Press any key"
- Playing
- Paused
- Game Over with score and restart option

## Acceptance Criteria
1. Full-width responsive game board
2. All 7 tetrominos spawn and rotate correctly
3. Line clearing with animation
4. Score and level tracking
5. Next piece preview
6. Game over detection
7. Restart functionality
