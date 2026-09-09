# 🎵 Let It Play — Music Matching Party Game Companion (v2.0)

> **Live Netlify URL**: [https://vigorous-bardeen-238e3c.netlify.app/](https://vigorous-bardeen-238e3c.netlify.app/)  
> **Repository**: [https://github.com/nead51/letitplay](https://github.com/nead51/letitplay)

**Let It Play** is the interactive web companion for the music-matching party game for up to 8 players. Combining human taste, anonymous song submissions, Bluetooth speaker DJing, and the legendary **Gold "Let It Play" Chip**!

---

## 🎮 How the Game Works

### Physical Components
- **Color Tokens**: 8 player colors (Orange, Red, Blue, Yellow, Black, Purple, Green, Teal).
- **Points**: A bank of bottlecaps.
- **Special Tokens**: Each player receives **1 Gold "Let It Play" Chip** per game.
- **Audio Gear**: One Bluetooth speaker connected to the host/DJ's phone.

### The 4-Step Round Loop
1. **Step 1 — Setup & Rules**: Up to 8 players pick a color. One player acts as the DJ.
2. **Step 2 — Draw a Category**: The active round's **Judge** draws a theme from the Category Wheel (or enters a custom theme).
3. **Step 3 — The Game Arena & Audition**:
   - Other players secretly add 1 matching song to that Judge's color playlist on Spotify.
   - The DJ plays the submissions.
   - The Judge can trigger the **Judge's Buzzer** ("I've Heard Enough!") when ready to deliberate.
   - **Special Rule — Gold Chip**: Any player can slam down their 1-time Gold Chip to force the DJ to play the *entire* song without skipping. If played, the song's submitter earns **+5 Bottlecaps**!
   - The Judge awards **1 Bottlecap** to the winning song.
4. **Step 4 — Spotify Color Playlists**: Instant 1-tap links directly into the Spotify mobile app (or web player) for each of the 8 player colors.

---

## ⚡ Key Features in v2.0
- **Modern Vite + React 18 + Tailwind CSS v4**: Blazing-fast build times, zero legacy CRA bloat, fully responsive across phones, tablets, and smart TVs.
- **Synthesized Web Audio API**: Crisp offline retro game show buzzer, gold fanfare, bottlecap clinks, and shuffle sound effects with zero audio asset latency.
- **Interactive Game Arena (Step 3)**:
  - Turn rotation tracker (cycles through the 8 player colors).
  - DJ listening countdown timer with 30s, 45s, 60s, 90s presets.
  - Giant tactile "Judge's Buzzer".
  - Gold "Let It Play" Chip celebration modal with gold confetti shower and automatic +5 score award.
  - Live Bottlecap Scoreboard with custom player names and leader tracking.
- **Category Wheel 2.0**:
  - 100+ curated and categorized music prompts (Decades, High Energy, Movies & TV, Genres, Party Vibes, Wildcards).
  - Rapid shuffle animation.
  - Session history tracker to avoid repeat cards.
  - Custom category builder for inside jokes and house rules.
- **Spotify Deep-Linking**:
  - `spotify:playlist:<id>` native app launcher for iOS & Android.
  - Web player fallback.
  - Inline Spotify preview embeds.

---

## 🛠️ Development & Deployment

### Local Setup
```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Netlify Deployment
This repository is configured with `netlify.toml` for automatic deployments on push to `master`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```
