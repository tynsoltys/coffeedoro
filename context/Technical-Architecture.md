# Technical Architecture: Pomodoro Cafe
**Version:** 1.0  
**Last Updated:** November 22, 2025  
**Status:** MVP Architecture

---

## Overview

This document defines the technical architecture for Pomodoro Cafe MVP. It covers system design, code organization, data flow, and key technical decisions.

**Architecture Philosophy:** 
- Separation of concerns (UI vs game logic)
- Pure functions for testability
- Simple state management (avoid over-engineering)
- Progressive enhancement

---

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         BROWSER                              │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                   React Application                     │ │
│  │                                                          │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │ │
│  │  │   Landing    │  │  Plan Phase  │  │    Timer     │ │ │
│  │  │     Page     │→│  Component   │→│  Component   │ │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘ │ │
│  │         ↓                  ↓                  ↓         │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │ │
│  │  │   Settings   │  │   Results    │  │   Isometric  │ │ │
│  │  │    Modal     │  │  Component   │  │  Cafe View   │ │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘ │ │
│  │                                                          │ │
│  │                    ┌──────────────┐                     │ │
│  │                    │  Game State  │                     │ │
│  │                    │   (Zustand)  │                     │ │
│  │                    └──────────────┘                     │ │
│  │                           ↕                              │ │
│  │         ┌─────────────────────────────────┐             │ │
│  │         │      Game Logic Module          │             │ │
│  │         │  (Pure Functions - No UI)       │             │ │
│  │         │                                  │             │ │
│  │         │  • simulation.js                │             │ │
│  │         │  • economy.js                   │             │ │
│  │         │  • events.js                    │             │ │
│  │         │  • reputation.js                │             │ │
│  │         │  • balance.js (constants)       │             │ │
│  │         └─────────────────────────────────┘             │ │
│  │                           ↕                              │ │
│  │         ┌─────────────────────────────────┐             │ │
│  │         │      Utilities & Services       │             │ │
│  │         │                                  │             │ │
│  │         │  • storage.js (localStorage)    │             │ │
│  │         │  • timer.js (pomodoro logic)    │             │ │
│  │         │  • audio.js (Web Audio API)     │             │ │
│  │         │  • steamyMode.js (debug)        │             │ │
│  │         └─────────────────────────────────┘             │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                   Browser APIs                          │ │
│  │                                                          │ │
│  │  • localStorage (game persistence)                      │ │
│  │  • Web Audio API (ambient sounds)                       │ │
│  │  • Notifications API (timer complete)                   │ │
│  │  • Page Visibility API (background tabs)                │ │
│  │  • Web Workers (timer accuracy - optional)              │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## Technology Stack (Recommended)

### Core Technologies

| Category | Technology | Rationale |
|----------|-----------|-----------|
| **Framework** | React 18+ | Industry standard, rich ecosystem, excellent for UI state |
| **Build Tool** | Vite | Fast dev server, optimized production builds, modern |
| **Language** | TypeScript | Type safety, better IDE support, catches errors early |
| **State Management** | Zustand | Simple, no boilerplate, perfect for MVP complexity |
| **Routing** | React Router v6 | Standard routing solution (minimal routes in MVP) |
| **Styling** | CSS Modules + CSS Variables | Scoped styles, design token system |
| **Testing** | Vitest + React Testing Library | Fast, Vite-native, component testing |
| **E2E Testing** | Playwright | Reliable, multi-browser, good DX |
| **Linting** | ESLint + Prettier | Code quality, consistent formatting |

### Rendering & Graphics

| Category | Technology | Rationale |
|----------|-----------|-----------|
| **Isometric View** | Pixi.js (Canvas) | Best balance of performance and ease, WebGL-backed |
| **Alternative** | CSS-based isometric | Simpler but less performant for complex scenes |
| **Animations** | CSS Transitions + Framer Motion (if needed) | Native performance, progressive enhancement |

### Audio

| Category | Technology | Rationale |
|----------|-----------|-----------|
| **Audio System** | Web Audio API (native) | Precise control, mixing, low latency |
| **Audio Files** | MP3/OGG (compressed loops) | Good quality/size ratio, browser support |
| **Fallback** | HTML5 Audio (if needed) | Older browser support |

### Deployment & Hosting

| Category | Technology | Rationale |
|----------|-----------|-----------|
| **Hosting** | Vercel | Zero-config, auto-deploy from git, fast CDN, free tier |
| **Alternative** | Netlify | Similar benefits, slightly different features |
| **Domain** | Custom domain | Professional, memorable |
| **SSL** | Auto (via Vercel/Netlify) | HTTPS by default |

---

## Code Organization

### Folder Structure

```
src/
├── components/              # React components
│   ├── common/             # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Slider.tsx
│   │   └── Toggle.tsx
│   │
│   ├── game/               # Game-specific components
│   │   ├── PlanPhase/
│   │   │   ├── PlanPhase.tsx
│   │   │   ├── InventoryPanel.tsx
│   │   │   ├── PricingPanel.tsx
│   │   │   └── StatsDisplay.tsx
│   │   │
│   │   ├── Timer/
│   │   │   ├── Timer.tsx
│   │   │   ├── CircularProgress.tsx
│   │   │   └── SoundMixer.tsx
│   │   │
│   │   ├── Results/
│   │   │   ├── Results.tsx
│   │   │   ├── SalesSummary.tsx
│   │   │   ├── CustomerFeedback.tsx
│   │   │   └── ReputationChange.tsx
│   │   │
│   │   └── IsometricCafe/
│   │       ├── IsometricCafe.tsx
│   │       ├── CafeRenderer.ts (Pixi.js)
│   │       └── CafeAssets.ts
│   │
│   └── layout/             # Layout components
│       ├── AppLayout.tsx
│       ├── Header.tsx
│       └── Footer.tsx
│
├── game/                   # Pure game logic (NO React dependencies)
│   ├── simulation.ts       # Main simulation engine
│   ├── economy.ts          # Pricing, revenue, costs
│   ├── events.ts           # Random events system
│   ├── reputation.ts       # Reputation calculations
│   ├── balance.ts          # Game constants (tunable)
│   └── types.ts            # TypeScript types for game state
│
├── store/                  # State management
│   ├── gameStore.ts        # Zustand store
│   └── settingsStore.ts    # User preferences
│
├── services/               # External integrations & utilities
│   ├── storage.ts          # localStorage wrapper
│   ├── timer.ts            # Pomodoro timer logic
│   ├── audio/              # Audio system
│   │   ├── AudioManager.ts
│   │   ├── SoundMixer.ts
│   │   └── audioConfig.ts
│   └── steamyMode.ts       # Debug feature
│
├── hooks/                  # Custom React hooks
│   ├── useTimer.ts
│   ├── useGameState.ts
│   ├── useAudio.ts
│   └── useSteamyMode.ts
│
├── styles/                 # Global styles
│   ├── variables.css       # Design tokens (CSS custom properties)
│   ├── reset.css           # CSS reset/normalize
│   ├── typography.css      # Font styles
│   ├── animations.css      # Shared animations
│   └── global.css          # Global styles
│
├── assets/                 # Static assets
│   ├── images/
│   ├── audio/
│   │   ├── cafe-ambiance.mp3
│   │   └── rain-sounds.mp3
│   └── sprites/
│
├── utils/                  # Pure utility functions
│   ├── helpers.ts
│   ├── formatters.ts
│   └── validators.ts
│
├── types/                  # Shared TypeScript types
│   └── index.ts
│
├── App.tsx                 # Root component
├── main.tsx               # Entry point
└── router.tsx             # Route definitions
```

### Import Aliases (tsconfig.json)

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@game/*": ["./src/game/*"],
      "@store/*": ["./src/store/*"],
      "@services/*": ["./src/services/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@styles/*": ["./src/styles/*"],
      "@assets/*": ["./src/assets/*"],
      "@utils/*": ["./src/utils/*"],
      "@types/*": ["./src/types/*"]
    }
  }
}
```

**Usage:**
```typescript
import { simulateDay } from '@game/simulation';
import { Button } from '@components/common/Button';
import { useGameStore } from '@store/gameStore';
```

---

## Data Flow Architecture

### 1. Unidirectional Data Flow

```
User Action (UI)
    ↓
Component Handler
    ↓
Store Action (Zustand)
    ↓
Game Logic (Pure Function)
    ↓
New State Computed
    ↓
Store Updated
    ↓
Components Re-render
```

### 2. Example: Completing a Pomodoro

```typescript
// 1. User clicks "Start Day" in PlanPhase
const handleStartDay = () => {
  // 2. Store action
  startPomodoro();
  
  // 3. Navigate to Timer
  navigate('/timer');
};

// 4. Timer completes (or Steamy Mode skips)
const handleTimerComplete = () => {
  // 5. Get current game state
  const gameState = useGameStore.getState();
  
  // 6. Call pure game logic
  const dayResult = simulateDay(gameState);
  
  // 7. Update store with results
  useGameStore.setState({
    player: dayResult.newPlayerState,
    history: [...gameState.history, dayResult],
  });
  
  // 8. Save to localStorage
  saveGameState(useGameStore.getState());
  
  // 9. Navigate to Results
  navigate('/results');
};
```

### 3. Game Logic Independence

**Critical Principle:** Game logic NEVER imports React or UI code.

```typescript
// ✅ GOOD: Pure function in game/simulation.ts
export function simulateDay(gameState: GameState): DayResult {
  const customers = calculateCustomers(gameState);
  const sales = processSales(gameState, customers);
  const reputation = updateReputation(gameState, sales);
  
  return {
    revenue: sales.revenue,
    costs: sales.costs,
    reputation,
    // ...
  };
}

// ❌ BAD: Game logic shouldn't know about React
import { useState } from 'react'; // NO!
```

This allows:
- Testing game logic without UI
- Reusing logic in future (mobile app, backend)
- Clear boundaries

---

## State Management (Zustand)

### Game Store Structure

```typescript
// store/gameStore.ts

interface GameStore {
  // Player state
  player: {
    money: number;
    reputation: number;
    dayNumber: number;
  };
  
  // Current inventory
  inventory: {
    coffeeBeans: number;  // servings available
    milk: number;         // servings available
    pastries: number;     // units available
  };
  
  // Pricing
  pricing: {
    coffee: number;
    pastry: number;
  };
  
  // History
  history: DayResult[];  // Results from each day
  
  // Actions
  buyInventory: (item: string, quantity: number) => void;
  setPrice: (item: string, price: number) => void;
  completeTurn: (result: DayResult) => void;
  resetGame: () => void;
}

// Create store
const useGameStore = create<GameStore>((set) => ({
  player: {
    money: 100,
    reputation: 50,
    dayNumber: 1,
  },
  inventory: {
    coffeeBeans: 0,
    milk: 0,
    pastries: 0,
  },
  pricing: {
    coffee: 5.0,
    pastry: 3.5,
  },
  history: [],
  
  buyInventory: (item, quantity) => set((state) => ({
    inventory: {
      ...state.inventory,
      [item]: state.inventory[item] + quantity,
    },
    player: {
      ...state.player,
      money: state.player.money - (ITEM_COSTS[item] * quantity),
    },
  })),
  
  setPrice: (item, price) => set((state) => ({
    pricing: {
      ...state.pricing,
      [item]: price,
    },
  })),
  
  completeTurn: (result) => set((state) => ({
    player: result.newPlayerState,
    inventory: result.newInventory,
    history: [...state.history, result],
  })),
  
  resetGame: () => set(INITIAL_STATE),
}));
```

### Settings Store

```typescript
// store/settingsStore.ts

interface SettingsStore {
  // Timer settings
  pomodoroMinutes: number;
  
  // Audio settings
  cafeSoundsEnabled: boolean;
  rainSoundsEnabled: boolean;
  cafeSoundsVolume: number;
  rainSoundsVolume: number;
  
  // Debug
  steamyModeEnabled: boolean;
  
  // Actions
  setPomodoroMinutes: (minutes: number) => void;
  toggleCafeSounds: () => void;
  toggleRainSounds: () => void;
  setCafeSoundsVolume: (volume: number) => void;
  setRainSoundsVolume: (volume: number) => void;
  toggleSteamyMode: () => void;
}
```

### Store Persistence

```typescript
// Middleware to auto-save to localStorage
import { persist } from 'zustand/middleware';

const useGameStore = create(
  persist(
    (set) => ({
      // ... store definition
    }),
    {
      name: 'pomodoro-cafe-game-state',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        // Handle version migrations
        if (version === 0) {
          // Migrate from v0 to v1
        }
        return persistedState;
      },
    }
  )
);
```

---

## LocalStorage Strategy

### Storage Keys

```typescript
// Constants
const STORAGE_KEYS = {
  GAME_STATE: 'pomodoro-cafe-game-state',
  SETTINGS: 'pomodoro-cafe-settings',
  STEAMY_MODE: 'pomodoro-cafe-steamy-mode',
} as const;
```

### Data Structure (Persisted)

```json
{
  "state": {
    "player": {
      "money": 173.50,
      "reputation": 59,
      "dayNumber": 2
    },
    "inventory": {
      "coffeeBeans": 2,
      "milk": 4,
      "pastries": 0
    },
    "pricing": {
      "coffee": 5.0,
      "pastry": 3.5
    },
    "history": [
      {
        "day": 1,
        "revenue": 114.50,
        "costs": 29,
        "profit": 85.50,
        "customersServed": 18,
        "reputationChange": 9,
        "events": ["sunny_weather"],
        "timestamp": "2025-11-22T10:30:00Z"
      }
    ]
  },
  "version": 1
}
```

### Storage Utilities

```typescript
// services/storage.ts

export class GameStorage {
  static save(gameState: GameState): void {
    try {
      const serialized = JSON.stringify({
        state: gameState,
        version: STORAGE_VERSION,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem(STORAGE_KEYS.GAME_STATE, serialized);
    } catch (error) {
      console.error('Failed to save game state:', error);
      // Handle quota exceeded, etc.
    }
  }
  
  static load(): GameState | null {
    try {
      const serialized = localStorage.getItem(STORAGE_KEYS.GAME_STATE);
      if (!serialized) return null;
      
      const parsed = JSON.parse(serialized);
      
      // Version check
      if (parsed.version !== STORAGE_VERSION) {
        return this.migrate(parsed);
      }
      
      return parsed.state;
    } catch (error) {
      console.error('Failed to load game state:', error);
      return null;
    }
  }
  
  static export(): string {
    // Export save as downloadable JSON
    const gameState = this.load();
    return JSON.stringify(gameState, null, 2);
  }
  
  static import(jsonString: string): boolean {
    try {
      const gameState = JSON.parse(jsonString);
      this.save(gameState);
      return true;
    } catch {
      return false;
    }
  }
  
  static clear(): void {
    localStorage.removeItem(STORAGE_KEYS.GAME_STATE);
  }
  
  private static migrate(oldData: any): GameState {
    // Handle version migrations
    // e.g., v0 -> v1: add new fields with defaults
    return oldData;
  }
}
```

### Size Management

```typescript
// Monitor localStorage usage
function getStorageUsage(): {
  used: number;
  total: number;
  percentage: number;
} {
  const total = 5 * 1024 * 1024; // 5MB typical limit
  let used = 0;
  
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      used += localStorage[key].length + key.length;
    }
  }
  
  return {
    used,
    total,
    percentage: (used / total) * 100,
  };
}

// Warn if approaching limit
if (getStorageUsage().percentage > 80) {
  console.warn('LocalStorage usage high, consider cleanup');
}
```

---

## Timer System Architecture

### Core Requirements

1. **Accuracy:** ±2 seconds over 25 minutes
2. **Background resilience:** Continue when tab inactive
3. **No drift:** Adjust for system clock changes
4. **Cancellable:** User can stop (post-MVP)
5. **Steamy Mode:** Instant completion for testing

### Implementation Approach

#### Option A: requestAnimationFrame (Simple)

```typescript
// services/timer.ts

class PomodoroTimer {
  private startTime: number = 0;
  private duration: number = 0;
  private rafId: number | null = null;
  private onTick: (remaining: number) => void;
  private onComplete: () => void;
  
  start(durationMs: number) {
    this.startTime = Date.now();
    this.duration = durationMs;
    this.tick();
  }
  
  private tick = () => {
    const elapsed = Date.now() - this.startTime;
    const remaining = Math.max(0, this.duration - elapsed);
    
    this.onTick(remaining);
    
    if (remaining > 0) {
      this.rafId = requestAnimationFrame(this.tick);
    } else {
      this.onComplete();
    }
  };
  
  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }
}
```

**Pros:** Simple, accurate, no dependencies  
**Cons:** May pause in background tabs (but we use Date.now() so it catches up)

#### Option B: Web Worker (Background-safe)

```typescript
// workers/timer.worker.ts

let timerId: number | null = null;

self.addEventListener('message', (e) => {
  const { type, duration } = e.data;
  
  if (type === 'START') {
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    timerId = setInterval(() => {
      const remaining = Math.max(0, endTime - Date.now());
      
      self.postMessage({
        type: 'TICK',
        remaining,
      });
      
      if (remaining === 0) {
        self.postMessage({ type: 'COMPLETE' });
        clearInterval(timerId!);
      }
    }, 100); // Update every 100ms
  }
  
  if (type === 'STOP') {
    if (timerId) clearInterval(timerId);
  }
});
```

**Pros:** Runs in background reliably  
**Cons:** More complex, overkill for MVP

**Recommendation:** Start with Option A, add Option B if background issues arise.

### Timer Hook

```typescript
// hooks/useTimer.ts

export function useTimer() {
  const [remaining, setRemaining] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<PomodoroTimer | null>(null);
  
  const start = (durationMinutes: number) => {
    const durationMs = durationMinutes * 60 * 1000;
    
    timerRef.current = new PomodoroTimer({
      onTick: setRemaining,
      onComplete: () => {
        setIsRunning(false);
        showNotification('Pomodoro Complete!');
        playCompletionSound();
      },
    });
    
    timerRef.current.start(durationMs);
    setIsRunning(true);
  };
  
  const stop = () => {
    timerRef.current?.stop();
    setIsRunning(false);
  };
  
  return { remaining, isRunning, start, stop };
}
```

### Steamy Mode Integration

```typescript
// Timer component with Steamy Mode
function Timer() {
  const { start, remaining } = useTimer();
  const { steamyModeEnabled } = useSettingsStore();
  
  useEffect(() => {
    if (steamyModeEnabled) {
      // Skip timer entirely
      setTimeout(() => {
        handleTimerComplete();
      }, 0);
    } else {
      // Normal timer
      start(pomodoroMinutes);
    }
  }, []);
  
  // ...
}
```

---

## Audio System Architecture

### Web Audio API Setup

```typescript
// services/audio/AudioManager.ts

export class AudioManager {
  private audioContext: AudioContext;
  private tracks: Map<string, AudioTrack> = new Map();
  private masterGainNode: GainNode;
  
  constructor() {
    // Create audio context (user interaction required)
    this.audioContext = new AudioContext();
    this.masterGainNode = this.audioContext.createGain();
    this.masterGainNode.connect(this.audioContext.destination);
  }
  
  async loadTrack(name: string, url: string): Promise<void> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    
    const track = new AudioTrack(
      this.audioContext,
      audioBuffer,
      this.masterGainNode
    );
    
    this.tracks.set(name, track);
  }
  
  play(name: string, loop: boolean = true): void {
    const track = this.tracks.get(name);
    if (!track) {
      console.warn(`Track "${name}" not found`);
      return;
    }
    
    track.play(loop);
  }
  
  stop(name: string): void {
    this.tracks.get(name)?.stop();
  }
  
  setVolume(name: string, volume: number): void {
    this.tracks.get(name)?.setVolume(volume);
  }
  
  setMasterVolume(volume: number): void {
    this.masterGainNode.gain.value = volume;
  }
}

// Individual track wrapper
class AudioTrack {
  private context: AudioContext;
  private buffer: AudioBuffer;
  private source: AudioBufferSourceNode | null = null;
  private gainNode: GainNode;
  
  constructor(
    context: AudioContext,
    buffer: AudioBuffer,
    destination: AudioNode
  ) {
    this.context = context;
    this.buffer = buffer;
    this.gainNode = context.createGain();
    this.gainNode.connect(destination);
  }
  
  play(loop: boolean = false): void {
    // Stop existing playback
    this.stop();
    
    // Create new source
    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.loop = loop;
    this.source.connect(this.gainNode);
    this.source.start(0);
  }
  
  stop(): void {
    if (this.source) {
      this.source.stop();
      this.source.disconnect();
      this.source = null;
    }
  }
  
  setVolume(volume: number): void {
    // Smooth volume changes to avoid clicks
    this.gainNode.gain.setTargetAtTime(
      volume,
      this.context.currentTime,
      0.015
    );
  }
}
```

### Audio Mixer Component

```typescript
// components/game/Timer/SoundMixer.tsx

function SoundMixer() {
  const {
    cafeSoundsVolume,
    rainSoundsVolume,
    setCafeSoundsVolume,
    setRainSoundsVolume,
  } = useSettingsStore();
  
  const audioManager = useAudioManager();
  
  const handleCafeVolumeChange = (volume: number) => {
    setCafeSoundsVolume(volume);
    audioManager.setVolume('cafe', volume);
  };
  
  const handleRainVolumeChange = (volume: number) => {
    setRainSoundsVolume(volume);
    audioManager.setVolume('rain', volume);
  };
  
  return (
    <div className="sound-mixer">
      <Slider
        label="Cafe Ambiance"
        value={cafeSoundsVolume}
        onChange={handleCafeVolumeChange}
        min={0}
        max={1}
        step={0.01}
      />
      <Slider
        label="Rain Sounds"
        value={rainSoundsVolume}
        onChange={handleRainVolumeChange}
        min={0}
        max={1}
        step={0.01}
      />
    </div>
  );
}
```

### Autoplay Policy Handling

```typescript
// Initialize audio on user interaction
function App() {
  const [audioReady, setAudioReady] = useState(false);
  const audioManager = useAudioManager();
  
  const initAudio = useCallback(async () => {
    if (audioReady) return;
    
    try {
      await audioManager.loadTrack('cafe', '/assets/audio/cafe-ambiance.mp3');
      await audioManager.loadTrack('rain', '/assets/audio/rain-sounds.mp3');
      setAudioReady(true);
    } catch (error) {
      console.error('Failed to load audio:', error);
    }
  }, [audioReady]);
  
  // Initialize on first user interaction
  useEffect(() => {
    document.addEventListener('click', initAudio, { once: true });
    return () => document.removeEventListener('click', initAudio);
  }, []);
  
  return (
    // ... app content
  );
}
```

---

## Isometric Rendering (Pixi.js)

### Setup

```typescript
// components/game/IsometricCafe/CafeRenderer.ts

import * as PIXI from 'pixi.js';

export class CafeRenderer {
  private app: PIXI.Application;
  private stage: PIXI.Container;
  private tileSize = 64; // Isometric tile size
  
  constructor(canvas: HTMLCanvasElement) {
    this.app = new PIXI.Application({
      view: canvas,
      width: 800,
      height: 600,
      backgroundColor: 0xFFF9F5, // Cream background
      antialias: true,
    });
    
    this.stage = new PIXI.Container();
    this.app.stage.addChild(this.stage);
    
    // Center the stage
    this.stage.x = this.app.view.width / 2;
    this.stage.y = 100;
  }
  
  // Convert grid coordinates to isometric screen coordinates
  private toIso(gridX: number, gridY: number): { x: number; y: number } {
    return {
      x: (gridX - gridY) * (this.tileSize / 2),
      y: (gridX + gridY) * (this.tileSize / 4),
    };
  }
  
  // Render cafe scene
  render(gameState: GameState): void {
    this.stage.removeChildren();
    
    // Draw floor tiles
    this.drawFloor(5, 5); // 5x5 grid
    
    // Draw furniture
    this.drawCounter(2, 2);
    this.drawTable(1, 3);
    this.drawTable(3, 3);
    
    // Draw inventory indicators
    this.drawInventoryIndicators(gameState.inventory);
  }
  
  private drawFloor(width: number, height: number): void {
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const tile = new PIXI.Graphics();
        tile.beginFill(0xE89B7B); // Warm terracotta
        
        // Draw isometric tile (diamond shape)
        const pos = this.toIso(x, y);
        tile.moveTo(pos.x, pos.y);
        tile.lineTo(pos.x + this.tileSize / 2, pos.y + this.tileSize / 4);
        tile.lineTo(pos.x, pos.y + this.tileSize / 2);
        tile.lineTo(pos.x - this.tileSize / 2, pos.y + this.tileSize / 4);
        tile.closePath();
        tile.endFill();
        
        this.stage.addChild(tile);
      }
    }
  }
  
  private drawCounter(gridX: number, gridY: number): void {
    // Coffee counter sprite/graphic
    const counter = PIXI.Sprite.from('/assets/sprites/counter.png');
    const pos = this.toIso(gridX, gridY);
    counter.x = pos.x;
    counter.y = pos.y - 32; // Adjust for height
    counter.anchor.set(0.5);
    this.stage.addChild(counter);
  }
  
  // ... more rendering methods
}
```

### React Integration

```typescript
// components/game/IsometricCafe/IsometricCafe.tsx

function IsometricCafe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<CafeRenderer | null>(null);
  const gameState = useGameStore();
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Initialize renderer
    rendererRef.current = new CafeRenderer(canvasRef.current);
    
    return () => {
      rendererRef.current?.destroy();
    };
  }, []);
  
  useEffect(() => {
    // Re-render when game state changes
    rendererRef.current?.render(gameState);
  }, [gameState]);
  
  return <canvas ref={canvasRef} />;
}
```

---

## Testing Strategy

### Unit Tests (Game Logic)

```typescript
// game/simulation.test.ts

import { describe, it, expect } from 'vitest';
import { simulateDay } from './simulation';
import { createMockGameState } from './test-utils';

describe('simulateDay', () => {
  it('should calculate revenue correctly', () => {
    const gameState = createMockGameState({
      inventory: { coffeeBeans: 20, milk: 15, pastries: 10 },
      pricing: { coffee: 5.0, pastry: 3.5 },
      player: { reputation: 50 },
    });
    
    const result = simulateDay(gameState);
    
    expect(result.revenue).toBeGreaterThan(0);
    expect(result.customersServed).toBeGreaterThan(0);
  });
  
  it('should handle stock-outs', () => {
    const gameState = createMockGameState({
      inventory: { coffeeBeans: 5, milk: 15, pastries: 10 },
      player: { reputation: 50 },
    });
    
    const result = simulateDay(gameState);
    
    expect(result.stockOuts).toContain('coffee');
    expect(result.reputationChange).toBeLessThan(0);
  });
});
```

### Component Tests

```typescript
// components/game/PlanPhase/PlanPhase.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { PlanPhase } from './PlanPhase';
import { useGameStore } from '@store/gameStore';

describe('PlanPhase', () => {
  it('should display current money', () => {
    render(<PlanPhase />);
    expect(screen.getByText(/\$100/)).toBeInTheDocument();
  });
  
  it('should allow purchasing inventory', () => {
    render(<PlanPhase />);
    
    const buyButton = screen.getByText('Buy Coffee');
    fireEvent.click(buyButton);
    
    const state = useGameStore.getState();
    expect(state.inventory.coffeeBeans).toBeGreaterThan(0);
    expect(state.player.money).toBeLessThan(100);
  });
});
```

### E2E Tests (Playwright)

```typescript
// e2e/game-flow.spec.ts

import { test, expect } from '@playwright/test';

test('complete first day flow', async ({ page }) => {
  await page.goto('/');
  
  // Start game
  await page.click('text=Start Your Cafe');
  
  // Configure pomodoro
  await page.fill('[data-testid="pomodoro-minutes"]', '25');
  await page.click('text=Begin');
  
  // Plan phase
  await page.click('[data-testid="buy-coffee"]');
  await page.click('[data-testid="buy-milk"]');
  await page.click('[data-testid="start-day"]');
  
  // Should navigate to timer (or results if Steamy Mode)
  await expect(page).toHaveURL(/\/timer|\/results/);
});
```

---

## Performance Considerations

### Bundle Size

**Target:** <200KB initial load (gzipped)

**Strategies:**
- Code splitting by route
- Lazy load Pixi.js (only when rendering cafe)
- Compress images (WebP format)
- Tree-shake unused code

```typescript
// Lazy load heavy components
const IsometricCafe = lazy(() => import('./components/game/IsometricCafe'));
```

### Animation Performance

**Target:** 60fps on mid-range devices

**Strategies:**
- Use CSS transforms (GPU-accelerated)
- Limit Pixi.js sprite count (<100 for MVP)
- RequestAnimationFrame for smooth updates
- Avoid layout thrashing

### localStorage Performance

**Target:** <10ms read/write

**Strategies:**
- Debounce saves (don't save every keystroke)
- Compress large data (if needed)
- Limit history length (keep last 30 days)

---

## Security Considerations

### localStorage

- No sensitive data (it's client-side)
- Validate on load (prevent corrupted saves)
- Version check for migrations

### XSS Prevention

- React escapes by default
- Sanitize user input (if any Phase 2+ features)
- No `dangerouslySetInnerHTML` unless absolutely necessary

### HTTPS

- Always use HTTPS in production
- Secure cookies (if Phase 3+ auth)

---

## Deployment Architecture

### Build Process

```bash
# Development
npm run dev       # Vite dev server with HMR

# Production
npm run build     # TypeScript → JavaScript, bundling, minification
npm run preview   # Test production build locally
```

### Vercel Deployment

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Environment Variables

```bash
# .env.production
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=production
```

---

## Monitoring & Observability (Post-MVP)

### Error Tracking

```typescript
// Sentry integration (future)
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.VITE_APP_ENV,
});
```

### Analytics

```typescript
// PostHog or similar (future)
import posthog from 'posthog-js';

posthog.init('YOUR_API_KEY', {
  api_host: 'https://app.posthog.com',
});

// Track events
posthog.capture('pomodoro_completed', {
  duration: 25,
  steamyMode: false,
});
```

---

## Next Steps

1. **Week 2:** Implement this architecture
2. **Week 3:** Build core game logic following separation of concerns
3. **Week 4:** Implement timer and audio systems
4. **Week 5-6:** Build UI components
5. **Week 7:** Integration and testing
6. **Week 8:** Polish and launch

---

## Questions & Decisions

### Open Questions
- [ ] Use CSS isometric or Pixi.js? (Recommend Pixi.js for quality)
- [ ] Web Worker for timer? (Start without, add if needed)
- [ ] Audio file format? (MP3 is fine, add OGG for Firefox if needed)

### Decisions Made
- ✅ React + TypeScript
- ✅ Zustand for state
- ✅ Vite for build tool
- ✅ Separation of game logic from UI
- ✅ Vercel for hosting

---

**Last Updated:** November 22, 2025  
**Owner:** Technical Team  
**Next Review:** After Week 2 implementation
