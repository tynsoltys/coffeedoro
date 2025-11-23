# Technical Architecture: Coffeedoro

## Overview

This document outlines the technical architecture, technology choices, and implementation patterns for Coffeedoro. The goal is to create a maintainable, performant desktop application that combines a Pomodoro timer with a cozy coffee shop game.

---

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Application Architecture](#application-architecture)
3. [Data Models](#data-models)
4. [State Management](#state-management)
5. [File Structure](#file-structure)
6. [Core Systems](#core-systems)
7. [Performance Considerations](#performance-considerations)
8. [Security & Privacy](#security--privacy)
9. [Testing Strategy](#testing-strategy)
10. [Deployment](#deployment)

---

## Technology Stack

### Desktop Framework
**Recommendation**: **Tauri** (with Electron as fallback)

#### Tauri
**Pros**:
- Smaller bundle size (~3MB vs 100MB+ for Electron)
- Better performance (native system webview)
- Lower memory footprint
- Rust backend (security, performance)
- Built-in security features

**Cons**:
- Younger ecosystem
- Smaller community
- Rust learning curve for backend features

#### Electron (Fallback Option)
**Pros**:
- Mature, battle-tested
- Huge ecosystem and community
- Consistent across platforms
- Easy to find solutions

**Cons**:
- Large bundle size
- Higher memory usage
- Performance overhead

**Decision**: Start with Tauri, fall back to Electron if blockers arise

---

### Frontend Framework
**Recommendation**: **React 18+**

**Rationale**:
- Large ecosystem
- Great dev tools
- Component reusability
- React.lazy for code splitting
- Hooks for clean state management

**Alternatives considered**:
- Vue 3: Simpler, but smaller ecosystem for game dev
- Svelte: Fast, but less game framework integration
- Vanilla JS: Too much boilerplate for this scope

---

### Game Rendering
**Recommendation**: **PixiJS v7+**

**Rationale**:
- WebGL-powered 2D rendering
- Excellent performance
- Flexible (not opinionated like Phaser)
- Good React integration (@pixi/react)
- Smaller than Phaser

**Alternatives considered**:
- Phaser 3: Full game framework, but more opinionated
- Three.js: Overkill for 2D game
- Canvas API: Too low-level, reinventing wheel

---

### State Management
**Recommendation**: **Zustand**

**Rationale**:
- Simple, minimal boilerplate
- Excellent TypeScript support
- No provider hell
- Easy to persist state
- Great dev tools (Redux DevTools compatible)

**Store Structure**:
```typescript
// Timer store
useTimerStore: {
  mode, duration, elapsed, isRunning, settings
}

// Game store
useGameStore: {
  player, shop, inventory, customers, currentDay, stats
}

// UI store
useUIStore: {
  activeScreen, modals, notifications, settings
}
```

**Alternatives considered**:
- Redux Toolkit: More boilerplate, overkill for this size
- MobX: Less predictable, harder to debug
- Context API: Performance issues with frequent updates

---

### Styling
**Recommendation**: **TailwindCSS + CSS Modules**

**Rationale**:
- Rapid prototyping with Tailwind
- CSS Modules for component-specific styles
- No runtime overhead
- Excellent tree-shaking

**Complementary**:
- Framer Motion: Animations
- Radix UI: Accessible headless components

---

### Build Tool
**Recommendation**: **Vite**

**Rationale**:
- Lightning-fast HMR
- Optimized production builds
- Great TypeScript support
- Tauri's default choice

---

### Language
**Recommendation**: **TypeScript**

**Rationale**:
- Type safety prevents bugs
- Better IDE support
- Self-documenting code
- Required for complex game state

---

### Data Persistence
**Recommendation**: **Tauri's Store Plugin + JSON**

**Primary**: Tauri Store (encrypted key-value store)
- Simple API
- Automatic persistence
- Encrypted by default

**Backup**: JSON files in user data directory
- Human-readable
- Easy to debug
- Manual backups possible

**Schema versioning**: Include version in save files for migrations

---

### Audio
**Recommendation**: **Howler.js**

**Rationale**:
- Simple API
- Cross-browser compatible
- Sprite support (single file, multiple sounds)
- Volume control per sound

---

## Application Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────┐
│           Tauri Desktop Shell               │
│  ┌───────────────────────────────────────┐  │
│  │       React Application               │  │
│  │  ┌─────────────┐  ┌────────────────┐  │  │
│  │  │   Timer UI  │  │   Game UI      │  │  │
│  │  │   (React)   │  │ (React + Pixi) │  │  │
│  │  └──────┬──────┘  └───────┬────────┘  │  │
│  │         │                  │           │  │
│  │  ┌──────┴──────────────────┴────────┐  │  │
│  │  │     State Management (Zustand)   │  │  │
│  │  └──────┬──────────────────┬────────┘  │  │
│  │         │                  │           │  │
│  │  ┌──────┴──────┐    ┌──────┴────────┐  │  │
│  │  │ Timer Engine│    │  Game Engine  │  │  │
│  │  └──────┬──────┘    └──────┬────────┘  │  │
│  │         │                  │           │  │
│  └─────────┼──────────────────┼───────────┘  │
│            │                  │              │
│  ┌─────────┴──────────────────┴───────────┐  │
│  │      Tauri Backend (Rust)              │  │
│  │  - File system access                  │  │
│  │  - System notifications                │  │
│  │  - Window management                   │  │
│  └────────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### Component Architecture

```
src/
├── timer/
│   ├── TimerView.tsx         # Main timer UI
│   ├── TimerControls.tsx     # Start/stop/pause buttons
│   ├── TimerDisplay.tsx      # Time visualization
│   ├── TimerSettings.tsx     # Configuration
│   └── useTimer.ts           # Timer logic hook
│
├── game/
│   ├── GameView.tsx          # Main game container
│   ├── ShopScene/            # Coffee shop view
│   │   ├── ShopCanvas.tsx    # Pixi canvas wrapper
│   │   ├── ShopRenderer.ts   # Pixi rendering logic
│   │   └── ShopAssets.ts     # Asset loading
│   ├── CustomerService/      # Customer interaction
│   │   ├── CustomerQueue.tsx
│   │   ├── OrderDisplay.tsx
│   │   └── RecipeCrafter.tsx
│   ├── Management/           # Shop management
│   │   ├── Inventory.tsx
│   │   ├── Upgrades.tsx
│   │   └── Statistics.tsx
│   └── engine/               # Game logic
│       ├── customerSystem.ts
│       ├── economySystem.ts
│       ├── recipeSystem.ts
│       └── progressionSystem.ts
│
├── shared/
│   ├── components/           # Shared UI components
│   ├── hooks/                # Shared hooks
│   ├── utils/                # Helper functions
│   └── types/                # TypeScript types
│
└── stores/
    ├── timerStore.ts
    ├── gameStore.ts
    └── uiStore.ts
```

---

## Data Models

### TypeScript Interfaces

#### Timer Domain

```typescript
interface TimerState {
  mode: 'work' | 'shortBreak' | 'longBreak' | 'paused';
  duration: number;        // Total duration in seconds
  elapsed: number;         // Elapsed time in seconds
  isRunning: boolean;
  sessionCount: number;    // Pomodoros completed today
  totalSessions: number;   // All-time sessions
  settings: TimerSettings;
}

interface TimerSettings {
  workDuration: number;      // Default: 25 * 60
  shortBreakDuration: number; // Default: 5 * 60
  longBreakDuration: number;  // Default: 15 * 60
  longBreakInterval: number;  // Every N sessions
  autoStartBreaks: boolean;
  autoStartWork: boolean;
  notifications: {
    enabled: boolean;
    sound: boolean;
    volume: number;
  };
}

interface TimerStats {
  today: {
    sessions: number;
    focusTime: number;      // Seconds
    breakTime: number;
  };
  thisWeek: {
    sessions: number;
    focusTime: number;
  };
  allTime: {
    sessions: number;
    focusTime: number;
    coinsEarned: number;    // Game integration
  };
}
```

#### Game Domain

```typescript
interface GameState {
  player: PlayerData;
  shop: ShopData;
  inventory: Inventory;
  day: DayData;
  stats: GameStats;
  unlocks: UnlockState;
}

interface PlayerData {
  coins: number;
  hearts: number;           // Reputation currency
  level: number;
  experience: number;
  shopName: string;
}

interface ShopData {
  reputation: number;       // 0-100
  reputationTier: number;   // 1-5
  cleanliness: number;      // 0-100
  ambiance: number;         // 0-100
  equipment: Equipment[];
  decorations: Decoration[];
  theme: string;
}

interface Inventory {
  ingredients: Record<string, IngredientStack>;
  supplies: Record<string, number>;
}

interface IngredientStack {
  id: string;
  quantity: number;
  quality: 'basic' | 'good' | 'premium';
  expiresInDays?: number;
}

interface Recipe {
  id: string;
  name: string;
  base: 'coffee' | 'espresso' | 'tea';
  ingredients: RecipeIngredient[];
  unlocked: boolean;
  cost: number;            // To make
  basePrice: number;       // Default sell price
}

interface RecipeIngredient {
  ingredientId: string;
  quantity: number;
  required: boolean;
}

interface Customer {
  id: string;
  name: string;
  type: 'regular' | 'tourist' | 'student' | 'business';
  order: Order;
  preferences: CustomerPreferences;
  patience: number;        // Time willing to wait
  budget: { min: number; max: number };
}

interface Order {
  recipeId: string;
  modifications: string[]; // e.g., "extra shot", "oat milk"
  size: 'small' | 'medium' | 'large';
  temperature: 'hot' | 'iced';
}

interface CustomerPreferences {
  favoriteRecipes: string[];
  dislikedIngredients: string[];
  priceSensitivity: number; // 0-1
  qualitySensitivity: number; // 0-1
}

interface DayData {
  dayNumber: number;
  startTime: Date;
  customersServed: number;
  revenue: number;
  expenses: number;
  satisfactionScores: number[];
  eventsToday: GameEvent[];
}

interface GameStats {
  totalDays: number;
  totalRevenue: number;
  totalCustomers: number;
  averageSatisfaction: number;
  bestDay: { day: number; revenue: number };
  recipesUnlocked: number;
  upgradesPurchased: number;
}

interface Equipment {
  id: string;
  name: string;
  description: string;
  cost: number;
  owned: boolean;
  effects: EquipmentEffect[];
}

interface EquipmentEffect {
  type: 'capacity' | 'quality' | 'speed' | 'unlock';
  value: number | string;
}
```

#### Save File Format

```typescript
interface SaveFile {
  version: string;          // "1.0.0" - for migrations
  createdAt: Date;
  lastPlayed: Date;
  timer: {
    stats: TimerStats;
    settings: TimerSettings;
  };
  game: GameState;
  checksum?: string;        // Optional integrity check
}
```

---

## State Management

### Store Architecture

#### Timer Store (Zustand)

```typescript
// src/stores/timerStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TimerStore extends TimerState {
  // Actions
  start: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  tick: () => void;
  completeSession: () => void;
  updateSettings: (settings: Partial<TimerSettings>) => void;
}

export const useTimerStore = create<TimerStore>()(
  persist(
    (set, get) => ({
      // Initial state
      mode: 'work',
      duration: 25 * 60,
      elapsed: 0,
      isRunning: false,
      sessionCount: 0,
      totalSessions: 0,
      settings: DEFAULT_TIMER_SETTINGS,

      // Actions
      start: () => set({ isRunning: true }),
      pause: () => set({ isRunning: false }),
      resume: () => set({ isRunning: true }),
      stop: () => set({ elapsed: 0, isRunning: false }),

      tick: () => {
        const state = get();
        if (!state.isRunning) return;

        const newElapsed = state.elapsed + 1;

        if (newElapsed >= state.duration) {
          get().completeSession();
        } else {
          set({ elapsed: newElapsed });
        }
      },

      completeSession: () => {
        const state = get();
        // Logic for session completion
        // Trigger notifications
        // Award game bonuses
        // Transition to next mode
      },

      updateSettings: (settings) =>
        set((state) => ({
          settings: { ...state.settings, ...settings }
        })),
    }),
    {
      name: 'coffeedoro-timer',
      partialize: (state) => ({
        sessionCount: state.sessionCount,
        totalSessions: state.totalSessions,
        settings: state.settings,
      }),
    }
  )
);
```

#### Game Store (Zustand)

```typescript
// src/stores/gameStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameStore extends GameState {
  // Actions
  startNewDay: () => void;
  endDay: () => void;
  serveCustomer: (customerId: string, recipe: Recipe) => void;
  purchaseItem: (itemId: string, quantity: number) => void;
  upgradeShop: (upgradeId: string) => void;
  unlockRecipe: (recipeId: string) => void;
  updateInventory: (changes: Partial<Inventory>) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // Initial state
      player: INITIAL_PLAYER_DATA,
      shop: INITIAL_SHOP_DATA,
      inventory: INITIAL_INVENTORY,
      day: INITIAL_DAY_DATA,
      stats: INITIAL_STATS,
      unlocks: INITIAL_UNLOCKS,

      // Actions
      startNewDay: () => {
        set((state) => ({
          day: {
            dayNumber: state.day.dayNumber + 1,
            startTime: new Date(),
            customersServed: 0,
            revenue: 0,
            expenses: 0,
            satisfactionScores: [],
            eventsToday: generateDailyEvents(state),
          }
        }));
      },

      serveCustomer: (customerId, recipe) => {
        // Calculate satisfaction
        // Process payment
        // Update stats
        // Grant rewards
      },

      purchaseItem: (itemId, quantity) => {
        const item = getItemById(itemId);
        const cost = item.cost * quantity;

        set((state) => {
          if (state.player.coins < cost) return state;

          return {
            player: {
              ...state.player,
              coins: state.player.coins - cost,
            },
            inventory: addToInventory(state.inventory, itemId, quantity),
          };
        });
      },

      // ... other actions
    }),
    {
      name: 'coffeedoro-game',
    }
  )
);
```

---

## Core Systems

### 1. Timer Engine

```typescript
// src/timer/engine/TimerEngine.ts

class TimerEngine {
  private intervalId: number | null = null;

  constructor() {
    // Bind to store
  }

  start() {
    if (this.intervalId) return;

    this.intervalId = window.setInterval(() => {
      useTimerStore.getState().tick();
    }, 1000);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  // Use Web Workers for better accuracy
  private initWorker() {
    const worker = new Worker(new URL('./timer.worker.ts', import.meta.url));
    worker.onmessage = (e) => {
      if (e.data.type === 'tick') {
        useTimerStore.getState().tick();
      }
    };
    return worker;
  }
}

// timer.worker.ts - Accurate timing
let interval: number | null = null;

self.onmessage = (e) => {
  if (e.data.type === 'start') {
    interval = setInterval(() => {
      self.postMessage({ type: 'tick' });
    }, 1000);
  } else if (e.data.type === 'stop') {
    if (interval) clearInterval(interval);
  }
};
```

### 2. Notification System

```typescript
// src/shared/services/NotificationService.ts

class NotificationService {
  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) return false;

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  async notify(title: string, options?: NotificationOptions) {
    if (Notification.permission !== 'granted') {
      return;
    }

    // Use Tauri's notification API for better OS integration
    const { sendNotification } = await import('@tauri-apps/api/notification');

    await sendNotification({
      title,
      body: options?.body,
      icon: options?.icon,
    });
  }

  notifySessionComplete(type: 'work' | 'break') {
    const messages = {
      work: {
        title: '☕ Work Session Complete!',
        body: 'Time for a break! Your coffee shop awaits.',
      },
      break: {
        title: '💼 Break Over!',
        body: 'Ready to focus again? Let\'s get productive!',
      },
    };

    this.notify(messages[type].title, { body: messages[type].body });
  }
}

export const notificationService = new NotificationService();
```

### 3. Save/Load System

```typescript
// src/shared/services/SaveService.ts
import { Store } from '@tauri-apps/plugin-store';

class SaveService {
  private store: Store;

  constructor() {
    this.store = new Store('savegame.dat');
  }

  async save(): Promise<void> {
    const saveData: SaveFile = {
      version: '1.0.0',
      createdAt: new Date(),
      lastPlayed: new Date(),
      timer: {
        stats: useTimerStore.getState().stats,
        settings: useTimerStore.getState().settings,
      },
      game: useGameStore.getState(),
    };

    await this.store.set('saveData', saveData);
    await this.store.save(); // Persist to disk

    // Also create backup
    await this.createBackup(saveData);
  }

  async load(): Promise<SaveFile | null> {
    const data = await this.store.get<SaveFile>('saveData');

    if (!data) return null;

    // Version migration if needed
    return this.migrate(data);
  }

  async createBackup(data: SaveFile): Promise<void> {
    const backupStore = new Store(`backup-${Date.now()}.dat`);
    await backupStore.set('saveData', data);
    await backupStore.save();

    // Keep only last 5 backups
    await this.cleanOldBackups();
  }

  private async migrate(data: SaveFile): Promise<SaveFile> {
    // Handle version migrations
    if (data.version === '1.0.0') {
      // No migration needed
      return data;
    }

    // Future: handle version upgrades
    return data;
  }

  private async cleanOldBackups(): Promise<void> {
    // Implementation: delete oldest backups keeping only 5 most recent
  }
}

export const saveService = new SaveService();
```

### 4. Game Loop

```typescript
// src/game/engine/GameLoop.ts

class GameLoop {
  private rafId: number | null = null;
  private lastTime = 0;

  start() {
    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }

  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private loop(currentTime: number) {
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    // Update game systems
    this.update(deltaTime);

    // Render is handled by React + Pixi

    this.rafId = requestAnimationFrame((time) => this.loop(time));
  }

  private update(deltaTime: number) {
    // Update customer AI
    customerSystem.update(deltaTime);

    // Update animations
    animationSystem.update(deltaTime);

    // Update timers (ingredient expiration, etc.)
    timeSystem.update(deltaTime);
  }
}
```

### 5. Audio System

```typescript
// src/shared/services/AudioService.ts
import { Howl, Howler } from 'howler';

class AudioService {
  private sounds: Map<string, Howl> = new Map();
  private music: Howl | null = null;

  async init() {
    // Load sound sprite
    const sfxSprite = new Howl({
      src: ['/assets/audio/sfx-sprite.webm', '/assets/audio/sfx-sprite.mp3'],
      sprite: {
        coinDrop: [0, 500],
        coffeePour: [500, 1200],
        customerEnter: [1700, 800],
        buttonClick: [2500, 200],
        achievement: [2700, 1500],
      },
    });

    this.sounds.set('sfx', sfxSprite);

    // Load music
    this.music = new Howl({
      src: ['/assets/audio/cafe-music.webm'],
      loop: true,
      volume: 0.3,
    });
  }

  play(soundId: string) {
    const sound = this.sounds.get('sfx');
    if (sound) {
      sound.play(soundId);
    }
  }

  playMusic() {
    this.music?.play();
  }

  stopMusic() {
    this.music?.stop();
  }

  setVolume(type: 'sfx' | 'music', volume: number) {
    if (type === 'sfx') {
      this.sounds.get('sfx')?.volume(volume);
    } else {
      this.music?.volume(volume);
    }
  }
}

export const audioService = new AudioService();
```

---

## Performance Considerations

### Optimization Strategies

1. **Code Splitting**
   ```typescript
   // Lazy load game when entering break
   const GameView = lazy(() => import('./game/GameView'));

   // In App.tsx
   <Suspense fallback={<LoadingSpinner />}>
     {isBreak && <GameView />}
   </Suspense>
   ```

2. **Asset Loading**
   - Use sprite sheets (reduce HTTP requests)
   - Lazy load decorations/upgrades (only load what's unlocked)
   - Compress images (WebP format)
   - Use texture atlases for Pixi

3. **State Updates**
   - Batch updates where possible
   - Use selectors to prevent unnecessary rerenders
   - Memoize expensive calculations

4. **Memory Management**
   - Dispose Pixi resources when unmounting
   - Clean up intervals/timers
   - Limit particle effects

5. **Background Behavior**
   - Reduce update frequency when window not focused
   - Pause game loop during work sessions
   - Throttle auto-save (every 30 seconds max)

---

## Security & Privacy

### Principles
1. **Local-first**: All data stored locally
2. **No telemetry**: No tracking without consent
3. **Offline-capable**: No required network calls
4. **Data ownership**: Easy export/import

### Implementation
```typescript
// Optional analytics (opt-in only)
interface AnalyticsConfig {
  enabled: boolean;
  events: {
    sessionComplete: boolean;
    gameDay: boolean;
    upgrade: boolean;
  };
}

// If user opts in, use privacy-respecting analytics
// e.g., Plausible, Simple Analytics (no cookies, no tracking)
```

### Save File Encryption (Optional)
```typescript
// Use Tauri's crypto plugin for sensitive data
import { encrypt, decrypt } from '@tauri-apps/plugin-crypto';

async function saveSensitive(data: any) {
  const encrypted = await encrypt(JSON.stringify(data), 'user-password');
  await store.set('encrypted', encrypted);
}
```

---

## Testing Strategy

### Unit Tests
- **Framework**: Vitest
- **Coverage**: Core game logic (economy, recipes, progression)
- **Mocking**: Zustand stores, Tauri APIs

```typescript
// Example: Recipe cost calculation
describe('recipeSystem', () => {
  it('calculates recipe cost correctly', () => {
    const recipe = {
      ingredients: [
        { id: 'coffee-beans', quantity: 2 },
        { id: 'milk', quantity: 1 },
      ],
    };

    const cost = calculateRecipeCost(recipe, inventory);
    expect(cost).toBe(2.50);
  });
});
```

### Integration Tests
- **Framework**: Testing Library (React)
- **Coverage**: User flows (start timer, serve customer, purchase upgrade)

```typescript
// Example: Timer flow
it('completes work session and transitions to break', async () => {
  render(<App />);

  const startButton = screen.getByText('Start');
  fireEvent.click(startButton);

  // Fast-forward time
  act(() => {
    vi.advanceTimersByTime(25 * 60 * 1000);
  });

  expect(screen.getByText(/Break Time/i)).toBeInTheDocument();
});
```

### E2E Tests
- **Framework**: Playwright
- **Coverage**: Critical paths (new game, save/load, full day cycle)

```typescript
// Example: Full game day
test('can complete a full game day', async ({ page }) => {
  await page.goto('/');
  await page.click('text=New Game');

  // Purchase ingredients
  await page.click('text=Inventory');
  await page.click('text=Buy Coffee Beans');

  // Serve customer
  await page.click('text=Start Day');
  await page.click('text=Serve Customer');

  // Verify earnings
  const coins = await page.textContent('[data-testid="coin-count"]');
  expect(parseInt(coins)).toBeGreaterThan(0);
});
```

### Manual Testing Checklist
- [ ] Timer accuracy (compare to system clock)
- [ ] Notifications appear correctly
- [ ] Game saves and loads properly
- [ ] All recipes craftable
- [ ] Economy balanced (can progress steadily)
- [ ] UI responsive on different screen sizes
- [ ] Audio plays correctly
- [ ] Performance acceptable (60fps)

---

## Deployment

### Build Process

```bash
# Development
npm run dev

# Production build (all platforms)
npm run tauri build

# Platform-specific
npm run tauri build -- --target x86_64-pc-windows-msvc
npm run tauri build -- --target x86_64-apple-darwin
npm run tauri build -- --target x86_64-unknown-linux-gnu
```

### Release Checklist
- [ ] Version bump in `package.json` and `tauri.conf.json`
- [ ] Update `CHANGELOG.md`
- [ ] Run full test suite
- [ ] Build for all platforms
- [ ] Test installers on clean VMs
- [ ] Code sign (macOS, Windows)
- [ ] Create GitHub release
- [ ] Upload artifacts
- [ ] Update website/distribution channels

### Auto-Update (Future)
```json
// tauri.conf.json
{
  "updater": {
    "active": true,
    "endpoints": ["https://releases.coffeedoro.app/{{target}}/{{current_version}}"],
    "dialog": true,
    "pubkey": "PUBLIC_KEY_HERE"
  }
}
```

---

## Development Guidelines

### Code Style
- **Linter**: ESLint + Prettier
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Files**: kebab-case for filenames
- **Exports**: Named exports preferred

### Git Workflow
- **Main**: Production-ready code
- **Develop**: Integration branch
- **Feature branches**: `feature/timer-accuracy`, `feature/recipe-system`
- **Commit style**: Conventional Commits

```
feat: add recipe creation system
fix: timer notification timing
docs: update architecture diagrams
chore: upgrade dependencies
```

### Documentation
- TSDoc comments for complex functions
- README in each major module
- Architecture Decision Records (ADRs) for big choices

---

## Future Technical Considerations

### Scalability
- **Save file format**: JSON allows for easy migrations
- **Mod support**: Plugin system (load custom recipes, themes)
- **Multi-language**: i18n structure (react-i18next)

### Cloud Sync (Optional Future Feature)
- End-to-end encrypted
- Conflict resolution strategy
- Optional, not required

### Mobile Apps
- Consider React Native with shared game logic
- Simpler UI for mobile
- Cloud save becomes more important

---

## Appendix

### Useful Libraries

| Purpose | Library | Why |
|---------|---------|-----|
| Desktop Framework | Tauri | Small, fast, secure |
| Frontend | React | Ecosystem, components |
| Game Rendering | PixiJS | Performance, flexibility |
| State Management | Zustand | Simple, powerful |
| Styling | Tailwind CSS | Fast development |
| Animation | Framer Motion | Smooth, declarative |
| Audio | Howler.js | Simple, reliable |
| Testing | Vitest + Playwright | Fast, modern |
| Build Tool | Vite | Speed, DX |

### Resources
- [Tauri Documentation](https://tauri.app/)
- [Pixi.js Guide](https://pixijs.com/guides)
- [Zustand Documentation](https://docs.pmnd.rs/zustand)
- [React Best Practices](https://react.dev/)

---

**Architecture Version**: 1.0
**Last Updated**: 2025-11-23
**Status**: Ready for Implementation
