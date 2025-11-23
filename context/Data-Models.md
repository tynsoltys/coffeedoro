# Data Models & Type Definitions
**Pomodoro Cafe MVP**

---

## Overview

This document defines all data structures used in Pomodoro Cafe. These TypeScript types serve as the contract between UI and game logic, ensuring type safety across the application.

---

## Core Data Types

### GameState (Complete)

```typescript
/**
 * Complete game state - stored in Zustand and localStorage
 */
export interface GameState {
  // Version for migrations
  version: number;
  
  // Player state
  player: PlayerState;
  
  // Current inventory
  inventory: Inventory;
  
  // Current pricing
  pricing: Pricing;
  
  // Game history
  history: DayResult[];
  
  // Current day status
  currentTurn: TurnStatus;
  
  // Metadata
  createdAt: string; // ISO 8601 timestamp
  lastPlayed: string; // ISO 8601 timestamp
}
```

### PlayerState

```typescript
export interface PlayerState {
  // Financial state
  money: number; // Current money (can go negative)
  totalRevenue: number; // All-time revenue
  totalProfit: number; // All-time profit
  
  // Reputation (0-100 scale)
  reputation: number;
  
  // Progression
  dayNumber: number; // Current day (starts at 1)
  
  // Milestones (for achievements)
  milestonesAchieved: string[]; // e.g., ['survived_7_days', 'earned_500']
}
```

### Inventory

```typescript
export interface Inventory {
  // Coffee supplies (in servings)
  coffeeBeans: number; // 1 unit = 10 servings
  
  // Milk (in servings)
  milk: number; // 1 unit = 15 servings
  
  // Pastries (in units)
  croissants: number;
  muffins: number; // Phase 2
  cookies: number; // Phase 2
}

// Simplified for MVP
export type InventoryMVP = Pick<Inventory, 'coffeeBeans' | 'milk' | 'croissants'>;
```

### Pricing

```typescript
export interface Pricing {
  // Menu item prices
  coffee: number; // Price per cup
  croissant: number; // Price per pastry
  
  // Phase 2 additions
  cappuccino?: number;
  latte?: number;
  muffin?: number;
  cookie?: number;
}

// MVP only
export type PricingMVP = Pick<Pricing, 'coffee' | 'croissant'>;
```

### TurnStatus

```typescript
export type TurnPhase = 'planning' | 'working' | 'results';

export interface TurnStatus {
  phase: TurnPhase;
  
  // Planning phase data (what player chose)
  plannedPurchases?: InventoryPurchases;
  plannedPricing?: Pricing;
  
  // Working phase data
  pomodoroStartTime?: string; // ISO 8601
  pomodoroDurationMs?: number;
  
  // Results phase data
  lastResult?: DayResult;
}
```

---

## Game Simulation Types

### Simulation Input

```typescript
/**
 * Input to the simulation engine
 */
export interface SimulationInput {
  // Current player state
  player: PlayerState;
  
  // Inventory at start of day
  inventory: Inventory;
  
  // Prices for the day
  pricing: Pricing;
  
  // Random seed (for reproducibility)
  seed?: number;
}
```

### Simulation Output (DayResult)

```typescript
/**
 * Result of a single day's simulation
 */
export interface DayResult {
  // Day info
  day: number;
  timestamp: string; // ISO 8601
  
  // Financial results
  revenue: number;
  costs: OperatingCosts;
  profit: number; // revenue - costs.total
  
  // Sales breakdown
  sales: SalesBreakdown;
  
  // Customer metrics
  customersServed: number;
  customersSatisfied: number;
  customersUnsatisfied: number;
  customersTurnedAway: number; // Due to stock-outs
  
  // Inventory changes
  inventoryUsed: InventoryUsed;
  inventorySpoiled: InventoryUsed; // For Phase 2 (none in MVP)
  inventoryRemaining: Inventory;
  
  // Reputation
  reputationChange: number;
  newReputation: number;
  
  // Events
  events: GameEvent[];
  
  // Customer feedback (for display)
  feedback: CustomerFeedback[];
  
  // Stock-outs (what ran out)
  stockOuts: string[]; // e.g., ['coffee', 'milk']
  
  // Updated player state
  newPlayerState: PlayerState;
}
```

### Supporting Types

```typescript
export interface OperatingCosts {
  rent: number; // Fixed: $10/day
  utilities: number; // Fixed: $5/day
  supplies: number; // Fixed: $2/day
  spoilage: number; // Phase 2
  wages: number; // Phase 2 (staff)
  total: number; // Sum of all costs
}

export interface SalesBreakdown {
  coffee: {
    sold: number; // Units sold
    revenue: number; // Total revenue
  };
  croissant: {
    sold: number;
    revenue: number;
  };
  // Phase 2: more items
}

export interface InventoryUsed {
  coffeeBeans: number; // Servings used
  milk: number; // Servings used
  croissants: number; // Units used
}

export interface CustomerFeedback {
  type: 'positive' | 'negative' | 'neutral';
  message: string;
}
```

---

## Event System Types

### GameEvent

```typescript
export type EventType =
  | 'weather'
  | 'supply_shortage'
  | 'food_critic'
  | 'competitor'
  | 'local_event'
  | 'equipment_malfunction' // Phase 2
  | 'regular_customer'; // Phase 2

export interface GameEvent {
  type: EventType;
  name: string; // e.g., 'rainy_day'
  description: string; // User-facing description
  
  // Effects
  effects: EventEffects;
  
  // Duration (days)
  duration?: number; // Some events last multiple days
}

export interface EventEffects {
  customerModifier?: number; // Multiplier (e.g., 1.3 for +30%)
  reputationChange?: number; // Direct change
  costModifier?: number; // Affects ingredient costs
  priceToleranceChange?: number; // Customers more/less price-sensitive
}
```

### Event Examples

```typescript
export const EVENTS: Record<string, GameEvent> = {
  RAINY_DAY: {
    type: 'weather',
    name: 'rainy_day',
    description: 'Rainy weather brings more customers seeking warmth.',
    effects: {
      customerModifier: 1.3, // +30% customers
    },
  },
  
  SUPPLY_SHORTAGE: {
    type: 'supply_shortage',
    name: 'coffee_shortage',
    description: 'Regional coffee shortage! Bean prices increased.',
    effects: {
      costModifier: 1.5, // +50% cost for next purchase
    },
  },
  
  FOOD_CRITIC: {
    type: 'food_critic',
    name: 'critic_visit',
    description: 'A food critic is visiting today!',
    effects: {
      // Determined by player performance
      // +15 or -15 reputation
    },
  },
  
  COMPETITOR_OPENS: {
    type: 'competitor',
    name: 'new_competitor',
    description: 'A new cafe opened nearby.',
    effects: {
      customerModifier: 0.8, // -20% customers
    },
    duration: 3, // Lasts 3 days
  },
  
  LOCAL_FESTIVAL: {
    type: 'local_event',
    name: 'local_festival',
    description: 'A local festival is happening nearby!',
    effects: {
      customerModifier: 1.4, // +40% customers
    },
  },
};
```

---

## User Settings Types

### SettingsState

```typescript
export interface SettingsState {
  // Timer settings
  pomodoroMinutes: number; // 5-60
  
  // Audio settings
  audio: AudioSettings;
  
  // Debug settings
  debug: DebugSettings;
  
  // UI preferences
  ui: UISettings;
}

export interface AudioSettings {
  cafeSoundsEnabled: boolean;
  rainSoundsEnabled: boolean;
  cafeSoundsVolume: number; // 0-1
  rainSoundsVolume: number; // 0-1
  masterVolume: number; // 0-1
  notificationSoundEnabled: boolean;
}

export interface DebugSettings {
  steamyModeEnabled: boolean;
  showDebugInfo: boolean; // Show FPS, state, etc.
}

export interface UISettings {
  theme: 'light' | 'dark'; // Phase 2
  animationsEnabled: boolean;
  reducedMotion: boolean; // Accessibility
}
```

---

## Constants & Configuration Types

### Game Balance Constants

```typescript
export interface GameBalance {
  // Starting values
  starting: {
    money: number;
    reputation: number;
    dayNumber: number;
  };
  
  // Item costs
  itemCosts: {
    coffeeBeans: number; // Per unit (10 servings)
    milk: number; // Per unit (15 servings)
    croissant: number; // Per unit
  };
  
  // Operating costs
  operatingCosts: {
    rent: number; // Per day
    utilities: number; // Per day
    supplies: number; // Per day
  };
  
  // Customer behavior
  customer: {
    basePerDay: number; // Base customers at 50 reputation
    milkUsageRate: number; // % of coffee drinks that use milk
    pastryPurchaseRate: number; // % of customers who buy pastries
    
    // Price sensitivity
    fairCoffeePrice: number; // Market rate
    priceToleranceRange: number; // ±range before penalty
    pricePenaltyPerDollar: number; // % penalty per $1 over fair
  };
  
  // Reputation
  reputation: {
    min: number; // 0
    max: number; // 100
    satisfiedCustomerBonus: number; // +0.5 per customer
    unsatisfiedCustomerPenalty: number; // -1.0 per customer
    stockOutPenalty: number; // -10 per item
    perfectDayBonus: number; // +5 for perfect day
  };
  
  // Events
  events: {
    probabilityByDay: {
      days1to5: number; // 10%
      days6to15: number; // 25%
      days16plus: number; // 35%
    };
  };
  
  // Difficulty progression
  progression: {
    baseCustomerGrowth: number; // Customers increase per day
    costInflation: number; // Costs increase per day (Phase 2)
  };
}

/**
 * Actual balance values (imported from balance.ts)
 */
export const GAME_BALANCE: GameBalance = {
  starting: {
    money: 100,
    reputation: 50,
    dayNumber: 1,
  },
  itemCosts: {
    coffeeBeans: 2.0,
    milk: 3.0,
    croissant: 1.0,
  },
  operatingCosts: {
    rent: 10,
    utilities: 5,
    supplies: 2,
  },
  customer: {
    basePerDay: 20,
    milkUsageRate: 0.6,
    pastryPurchaseRate: 0.4,
    fairCoffeePrice: 5.0,
    priceToleranceRange: 1.0,
    pricePenaltyPerDollar: 0.05,
  },
  reputation: {
    min: 0,
    max: 100,
    satisfiedCustomerBonus: 0.5,
    unsatisfiedCustomerPenalty: 1.0,
    stockOutPenalty: 10,
    perfectDayBonus: 5,
  },
  events: {
    probabilityByDay: {
      days1to5: 0.1,
      days6to15: 0.25,
      days16plus: 0.35,
    },
  },
  progression: {
    baseCustomerGrowth: 0.5, // +0.5 customers per day
    costInflation: 0.01, // +1% per day (Phase 2)
  },
};
```

---

## Inventory Purchase Types

```typescript
/**
 * Player's intended purchases during planning phase
 */
export interface InventoryPurchases {
  coffeeBeans: number; // Units to buy
  milk: number; // Units to buy
  croissants: number; // Units to buy
}

/**
 * Purchase validation result
 */
export interface PurchaseValidation {
  valid: boolean;
  totalCost: number;
  canAfford: boolean;
  errors: string[]; // e.g., ['Insufficient funds']
}
```

---

## Timer Types

```typescript
export interface TimerState {
  status: 'idle' | 'running' | 'paused' | 'complete';
  startTime: number | null; // Unix timestamp (ms)
  durationMs: number; // Total duration in milliseconds
  remainingMs: number; // Remaining time in milliseconds
}

export interface TimerCallbacks {
  onTick: (remaining: number) => void;
  onComplete: () => void;
  onPause?: () => void;
  onResume?: () => void;
}
```

---

## Audio Types

```typescript
export interface AudioTrack {
  name: string;
  url: string;
  loaded: boolean;
  playing: boolean;
  loop: boolean;
  volume: number;
}

export interface AudioManagerState {
  initialized: boolean;
  tracks: Map<string, AudioTrack>;
  masterVolume: number;
}
```

---

## Achievement Types (Phase 2)

```typescript
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string; // Icon name or URL
  
  // Unlock condition
  condition: AchievementCondition;
  
  // State
  unlocked: boolean;
  unlockedAt?: string; // ISO 8601
  
  // Rewards (Phase 3+)
  rewards?: {
    money?: number;
    reputation?: number;
    unlocksFeature?: string;
  };
}

export type AchievementCondition =
  | { type: 'days_survived'; days: number }
  | { type: 'total_revenue'; amount: number }
  | { type: 'reputation_reached'; reputation: number }
  | { type: 'perfect_days'; count: number }
  | { type: 'event_survived'; eventType: string };

// Examples
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'survived_7_days',
    name: 'Week One',
    description: 'Survived 7 days',
    icon: 'calendar',
    condition: { type: 'days_survived', days: 7 },
    unlocked: false,
  },
  {
    id: 'earned_500',
    name: 'Silver Spoon',
    description: 'Earned $500 total profit',
    icon: 'money',
    condition: { type: 'total_revenue', amount: 500 },
    unlocked: false,
  },
];
```

---

## Validation & Helper Types

### Form Validation

```typescript
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  values: T;
  errors: ValidationError[];
  touched: Record<keyof T, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
}
```

### Formatting Types

```typescript
export interface FormatOptions {
  decimals?: number;
  currency?: boolean;
  percentage?: boolean;
  signed?: boolean; // Show + for positive numbers
}

// Utility functions
export const formatMoney = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

export const formatReputation = (reputation: number): string => {
  return `${Math.round(reputation)}/100`;
};

export const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(0)}%`;
};
```

---

## API Response Types (Phase 3+)

```typescript
/**
 * For future backend integration
 */

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  timestamp: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  
  // Game data
  gameStates: GameState[]; // Multiple saves
  currentGameId: string | null;
  
  // Stats
  stats: {
    totalPomodoros: number;
    totalDaysPlayed: number;
    highestReputation: number;
    mostMoneyEarned: number;
  };
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  score: number;
  metric: 'profit' | 'reputation' | 'days_survived';
  timestamp: string;
}
```

---

## Storage Format

### localStorage Structure

```typescript
/**
 * How data is actually stored in localStorage
 */

// Key: 'pomodoro-cafe-game-state'
export interface StoredGameState {
  version: number;
  state: GameState;
  checksum?: string; // For corruption detection (Phase 2)
  compressed?: boolean; // For large saves (Phase 2)
}

// Key: 'pomodoro-cafe-settings'
export interface StoredSettings {
  version: number;
  settings: SettingsState;
}

// Key: 'pomodoro-cafe-steamy-mode'
export interface StoredDebugFlags {
  steamyModeEnabled: boolean;
  lastActivated?: string; // ISO 8601
}
```

---

## Type Guards

```typescript
/**
 * Runtime type checking
 */

export function isValidGameState(obj: any): obj is GameState {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.version === 'number' &&
    typeof obj.player === 'object' &&
    typeof obj.inventory === 'object' &&
    typeof obj.pricing === 'object' &&
    Array.isArray(obj.history)
  );
}

export function isValidDayResult(obj: any): obj is DayResult {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.day === 'number' &&
    typeof obj.revenue === 'number' &&
    typeof obj.profit === 'number'
  );
}

export function isDayResultArray(arr: any): arr is DayResult[] {
  return Array.isArray(arr) && arr.every(isValidDayResult);
}
```

---

## Migration Types

```typescript
/**
 * For handling version upgrades
 */

export interface MigrationResult {
  success: boolean;
  fromVersion: number;
  toVersion: number;
  changes: string[];
  errors: string[];
}

export type MigrationFunction = (oldState: any) => GameState;

export const MIGRATIONS: Record<string, MigrationFunction> = {
  // v0 -> v1
  'v0_to_v1': (oldState: any): GameState => {
    return {
      ...oldState,
      version: 1,
      // Add new fields with defaults
      player: {
        ...oldState.player,
        totalRevenue: 0,
        totalProfit: 0,
      },
    };
  },
  
  // v1 -> v2 (future)
  'v1_to_v2': (oldState: any): GameState => {
    // Future migration
    return oldState;
  },
};
```

---

## Computed/Derived Types

```typescript
/**
 * Types for derived/computed values
 */

export interface ComputedStats {
  // Financial
  averageDailyProfit: number;
  profitTrend: 'up' | 'down' | 'stable';
  
  // Performance
  averageCustomerSatisfaction: number;
  stockOutRate: number; // % of days with stock-outs
  
  // Efficiency
  inventoryTurnover: number; // How often inventory is used
  priceOptimality: number; // How close to optimal pricing
}

export interface GameAnalytics {
  // Play session
  sessionStartTime: string;
  sessionDuration: number; // milliseconds
  pomodorosCompleted: number;
  
  // Progress
  daysProgressed: number;
  moneyEarned: number;
  reputationChange: number;
  
  // Events encountered
  eventsEncountered: string[];
  
  // Milestones reached this session
  milestonesReached: string[];
}
```

---

## Export/Import Types

```typescript
/**
 * For save export/import feature
 */

export interface ExportedSave {
  version: number;
  exportedAt: string;
  gameState: GameState;
  settings: SettingsState;
  metadata: {
    gameName: string; // User-provided name
    platform: 'web' | 'mobile';
    appVersion: string;
  };
}

export interface ImportResult {
  success: boolean;
  gameState?: GameState;
  errors: string[];
  warnings: string[];
}
```

---

## Usage Examples

### Creating Initial State

```typescript
import { GameState, GAME_BALANCE } from '@types';

export function createInitialGameState(): GameState {
  return {
    version: 1,
    player: {
      money: GAME_BALANCE.starting.money,
      reputation: GAME_BALANCE.starting.reputation,
      dayNumber: GAME_BALANCE.starting.dayNumber,
      totalRevenue: 0,
      totalProfit: 0,
      milestonesAchieved: [],
    },
    inventory: {
      coffeeBeans: 0,
      milk: 0,
      croissants: 0,
    },
    pricing: {
      coffee: GAME_BALANCE.customer.fairCoffeePrice,
      croissant: 3.5,
    },
    history: [],
    currentTurn: {
      phase: 'planning',
    },
    createdAt: new Date().toISOString(),
    lastPlayed: new Date().toISOString(),
  };
}
```

### Type-Safe State Updates

```typescript
import { useGameStore } from '@store/gameStore';
import { InventoryPurchases } from '@types';

function buyInventory(purchases: InventoryPurchases): void {
  const state = useGameStore.getState();
  
  // TypeScript ensures we're accessing valid properties
  const totalCost =
    purchases.coffeeBeans * GAME_BALANCE.itemCosts.coffeeBeans +
    purchases.milk * GAME_BALANCE.itemCosts.milk +
    purchases.croissants * GAME_BALANCE.itemCosts.croissant;
  
  if (state.player.money < totalCost) {
    throw new Error('Insufficient funds');
  }
  
  // Type-safe update
  useGameStore.setState({
    player: {
      ...state.player,
      money: state.player.money - totalCost,
    },
    inventory: {
      coffeeBeans: state.inventory.coffeeBeans + purchases.coffeeBeans * 10,
      milk: state.inventory.milk + purchases.milk * 15,
      croissants: state.inventory.croissants + purchases.croissants,
    },
  });
}
```

---

## Type Aliases for Convenience

```typescript
// Common combinations
export type InventoryItem = keyof Inventory;
export type PricingItem = keyof Pricing;

// Numeric constraints
export type Reputation = number; // 0-100
export type Money = number; // Can be negative
export type Day = number; // >= 1

// Time
export type Timestamp = string; // ISO 8601
export type DurationMs = number; // Milliseconds

// IDs
export type GameID = string;
export type UserID = string;
export type AchievementID = string;
```

---

## Next Steps

1. **Implement these types** in `/src/types/index.ts`
2. **Use throughout codebase** for type safety
3. **Validate at runtime** using type guards
4. **Test migrations** before deploying version changes

---

**Last Updated:** November 22, 2025  
**Owner:** Technical Team  
**Related Docs:** 
- [Technical Architecture](./Technical-Architecture.md)
- [Game Balance Spreadsheet](./Game-Balance-Spreadsheet.md)
