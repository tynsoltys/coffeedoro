# 🎯 CRITICAL: Documentation Reconciliation & Single Source of Truth
**Pomodoro Cafe - Conflict Resolution & Implementation Priority**

**Last Updated:** November 22, 2025  
**Purpose:** Resolve all documentation conflicts and establish clear priorities for implementation

---

## ⚠️ CONFLICTS IDENTIFIED & RESOLVED

### 1. Tech Stack Discrepancy

**CONFLICT:**
- PRD says: "React or Vue.js" 
- Technical Architecture says: "React 18+"
- Roadmap says: "React (recommended)"

**✅ RESOLUTION:**
```
OFFICIAL TECH STACK (Use This):
- Framework: React 18+ with TypeScript
- Build Tool: Vite
- State: Zustand
- Rendering: Pixi.js (Canvas)
- Testing: Vitest + React Testing Library + Playwright
```

**WHY:** React has best ecosystem, TypeScript support, and AI agent familiarity.

---

### 2. Folder Structure Variations

**CONFLICT:**
Multiple folder structures suggested across documents

**✅ OFFICIAL STRUCTURE:**
```
src/
├── components/       # React components only
│   ├── common/      # Button, Card, Modal, Slider
│   ├── game/        # PlanPhase, Timer, Results, IsometricCafe
│   └── layout/      # AppLayout, Header, Footer
├── game/            # Pure game logic (NO React imports)
│   ├── simulation.ts
│   ├── economy.ts
│   ├── events.ts
│   ├── reputation.ts
│   └── balance.ts
├── store/           # Zustand stores
│   ├── gameStore.ts
│   └── settingsStore.ts
├── services/        # External integrations
│   ├── storage.ts
│   ├── timer.ts
│   ├── audio/
│   └── steamyMode.ts
├── hooks/           # Custom React hooks
├── styles/          # Global CSS
├── assets/          # Static files
├── types/           # TypeScript types
└── utils/           # Pure utility functions
```

**WHY:** Clear separation of concerns, easy to navigate.

---

### 3. Game Balance Values Inconsistency

**CONFLICT:**
- Game Balance Spreadsheet: Starting money = $100
- Game Simulation Algorithm example: Uses $100
- Data Models: Shows $173.50 in example

**✅ OFFICIAL VALUES:**
```typescript
export const GAME_BALANCE = {
  starting: {
    money: 100,           // ← USE THIS
    reputation: 50,       // ← USE THIS
    dayNumber: 1,
  },
  itemCosts: {
    coffeeBeans: 2.0,    // per unit (10 servings)
    milk: 3.0,           // per unit (15 servings)
    croissant: 1.0,      // per unit
  },
  operatingCosts: {
    rent: 10,
    utilities: 5,
    supplies: 2,
    total: 17,           // per day
  },
  customer: {
    basePerDay: 20,
    fairCoffeePrice: 5.0,
    milkUsageRate: 0.6,
    pastryPurchaseRate: 0.4,
  },
  reputation: {
    satisfiedCustomerBonus: 0.5,
    unsatisfiedCustomerPenalty: 1.0,
    stockOutPenalty: 10,
    perfectDayBonus: 5,
  },
};
```

**SOURCE:** `/src/game/balance.ts` (Create this file first!)

---

### 4. Timeline Confusion

**CONFLICT:**
- Roadmap says: "Week 1-2: Planning" 
- Implementation Guide says: "Week 2: Setup"
- Quick Start says: "This week"

**✅ OFFICIAL TIMELINE:**

```
WEEK 1 (This Week):     ✅ COMPLETE - Documentation done
WEEK 2 (Next Week):     🔜 Project setup
WEEK 3:                 🔜 Core game logic
WEEK 4:                 🔜 State & services
WEEK 5-6:               🔜 UI components
WEEK 7:                 🔜 Integration
WEEK 8:                 🚀 Launch
```

**WHY:** Week 1 planning is done. Start Week 2 setup next.

---

### 5. Data Model Type Names

**CONFLICT:**
- Some docs use `GameState`
- Some use `GameStore`
- Confusion about difference

**✅ CLARIFICATION:**

```typescript
// Types (data shape)
interface GameState {      // ← Pure data
  player: PlayerState;
  inventory: Inventory;
  // ...
}

// Store (Zustand)
interface GameStore {      // ← Data + actions
  // State
  player: PlayerState;
  inventory: Inventory;
  // Actions
  buyInventory: (item, qty) => void;
  setPrice: (item, price) => void;
}
```

**RULE:** 
- `GameState` = Just data (for types/storage)
- `GameStore` = Data + methods (for Zustand)

---

## 📋 SINGLE SOURCE OF TRUTH: PRIORITY ORDER

When documents conflict, use this priority:

1. **THIS DOCUMENT** ← You're reading it (highest priority)
2. **Technical Architecture** ← Implementation details
3. **Data Models** ← Type definitions
4. **Game Simulation Algorithm** ← Core logic
5. **Game Balance Spreadsheet** ← Tunable values
6. **PRD** ← Product vision (strategic)
7. **Other docs** ← Supporting information

---

## 🎯 QUICK START: WHAT TO DO RIGHT NOW

### For Human Developers

**Step 1: Set Up Project (30 minutes)**
```bash
# Create project
npm create vite@latest pomodoro-cafe -- --template react-ts
cd pomodoro-cafe

# Install dependencies
npm install zustand pixi.js
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test

# Start dev server
npm run dev
```

**Step 2: Create Folder Structure (10 minutes)**
```bash
mkdir -p src/{components/{common,game,layout},game,store,services/audio,hooks,styles,assets,types,utils}
```

**Step 3: Create First File (20 minutes)**
Create `src/game/balance.ts` - copy values from section 3 above.

**Step 4: Commit & Deploy (10 minutes)**
```bash
git init
git add .
git commit -m "Initial setup"
# Connect to Vercel/Netlify
```

**Total Time: ~70 minutes to running project**

---

### For Claude Code (AI Agent)

**Context Priority:**
1. Read THIS document first (conflicts resolved)
2. Reference Technical Architecture for implementation patterns
3. Reference Data Models for exact types
4. Reference Game Simulation Algorithm for logic

**Implementation Order:**
1. `src/game/balance.ts` - Constants (5 min)
2. `src/types/index.ts` - Type definitions (10 min)
3. `src/game/simulation.ts` - Core logic (30 min)
4. `src/game/simulation.test.ts` - Tests (20 min)
5. `src/store/gameStore.ts` - State management (15 min)

**Prompt Pattern:**
```
I'm building Pomodoro Cafe. I've completed project setup.

Context:
- See /mnt/project/Documentation-Reconciliation.md for resolved conflicts
- Using React 18 + TypeScript + Zustand + Pixi.js
- Following folder structure from section 2

Task: Create [specific file]

Requirements:
- Follow type definitions from Data Models doc
- Use balance values from GAME_BALANCE (section 3)
- Pure functions for game logic (no React imports in /game)

Return: Complete file with comments and types.
```

---

## 🚨 CRITICAL RULES FOR IMPLEMENTATION

### Rule 1: Separation of Concerns

```typescript
// ✅ CORRECT: Pure game logic
// File: src/game/simulation.ts
export function simulateDay(input: SimulationInput): DayResult {
  // No React imports
  // No UI code
  // Pure functions only
}

// ❌ WRONG: Mixing concerns
import { useState } from 'react'; // NO!
export function simulateDay(input: SimulationInput): DayResult {
  const [state, setState] = useState(); // NO!
}
```

### Rule 2: Type Safety First

```typescript
// ✅ CORRECT: Explicit types
export function calculateDemand(
  reputation: number
): number {
  return GAME_BALANCE.customer.basePerDay * (reputation / 50);
}

// ❌ WRONG: Implicit any
export function calculateDemand(reputation) { // Missing type!
  return 20 * (reputation / 50);
}
```

### Rule 3: Use Constants, Not Magic Numbers

```typescript
// ✅ CORRECT: Use constants
import { GAME_BALANCE } from './balance';
const baseDemand = GAME_BALANCE.customer.basePerDay;

// ❌ WRONG: Magic numbers
const baseDemand = 20; // What does 20 mean?
```

### Rule 4: Test Everything

```typescript
// ✅ CORRECT: Test before UI
describe('calculateDemand', () => {
  it('returns 20 at reputation 50', () => {
    expect(calculateDemand(50)).toBe(20);
  });
});

// Then build UI that uses tested logic
```

---

## 📝 FILE CREATION ORDER

Create files in this exact order (prevents dependency issues):

### Week 2-3: Foundation
```
1. src/game/balance.ts           ← Constants first
2. src/types/index.ts            ← Then types
3. src/game/simulation.ts        ← Then logic
4. src/game/simulation.test.ts   ← Test it!
```

### Week 4: State & Services  
```
5. src/store/gameStore.ts        ← State management
6. src/services/storage.ts       ← Persistence
7. src/services/timer.ts         ← Timer logic
8. src/services/audio/AudioManager.ts  ← Audio system
```

### Week 5-6: UI
```
9. src/components/common/Button.tsx    ← Base components
10. src/components/game/PlanPhase/     ← Game screens
11. src/components/game/Timer/
12. src/components/game/Results/
```

### Week 7: Integration
```
13. src/App.tsx                  ← Wire everything together
14. src/router.tsx               ← Navigation
15. src/services/steamyMode.ts   ← Debug feature
```

---

## 🔧 CORRECTED SPECIFICATIONS

### Steamy Mode Implementation (Definitive)

**Location:** `src/services/steamyMode.ts`

**How It Works:**
```typescript
// Global keyboard listener
let steamyModeEnabled = false;
let steamyBuffer = '';

document.addEventListener('keypress', (e) => {
  steamyBuffer += e.key.toLowerCase();
  
  // Check if last 8 chars = "pshhhhh"
  if (steamyBuffer.slice(-8) === 'pshhhhh') {
    steamyModeEnabled = !steamyModeEnabled;
    localStorage.setItem('steamy-mode', steamyModeEnabled.toString());
    console.log('🚂 Steamy Mode:', steamyModeEnabled);
    
    // Show indicator
    showSteamyIndicator(steamyModeEnabled);
  }
  
  // Keep buffer short
  if (steamyBuffer.length > 20) {
    steamyBuffer = steamyBuffer.slice(-10);
  }
});
```

**Integration with Timer:**
```typescript
// In Timer component
const { steamyModeEnabled } = useSteamyMode();

useEffect(() => {
  if (steamyModeEnabled) {
    // Skip timer immediately
    handleTimerComplete();
  } else {
    // Normal timer
    startTimer(pomodoroMinutes * 60 * 1000);
  }
}, [steamyModeEnabled]);
```

**Visual Indicator:**
```typescript
// Show in top-right corner
{steamyModeEnabled && (
  <div className="steamy-indicator">
    🚂 Steamy Mode Active
  </div>
)}
```

---

## 🎮 Game Balance (Final Values)

**ONLY EDIT THIS ONE FILE TO TUNE BALANCE:**
`src/game/balance.ts`

```typescript
export const GAME_BALANCE = {
  starting: {
    money: 100,
    reputation: 50,
    dayNumber: 1,
  },
  
  itemCosts: {
    coffeeBeans: 2.0,  // per unit = 10 servings
    milk: 3.0,         // per unit = 15 servings
    croissant: 1.0,    // per unit = 1 pastry
  },
  
  operatingCosts: {
    rent: 10,      // per day
    utilities: 5,   // per day
    supplies: 2,    // per day
  },
  
  customer: {
    basePerDay: 20,              // at reputation 50
    milkUsageRate: 0.6,          // 60% of coffees use milk
    pastryPurchaseRate: 0.4,     // 40% of customers buy pastries
    fairCoffeePrice: 5.0,        // market rate
    pricePenaltyPerDollar: 0.05, // -5% per $1 over fair price
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
      days1to5: 0.10,    // 10% chance
      days6to15: 0.25,   // 25% chance
      days16plus: 0.35,  // 35% chance
    },
  },
} as const;
```

**Tuning Guide:**
- Too easy? Increase `operatingCosts` or decrease `starting.money`
- Too hard? Decrease `operatingCosts` or increase `starting.money`
- Customers too sensitive to price? Decrease `pricePenaltyPerDollar`

---

## 📊 Type Definitions (Final)

**Location:** `src/types/index.ts`

**Core Types (Copy exactly):**
```typescript
// Game State (for storage and state management)
export interface GameState {
  version: number;
  player: PlayerState;
  inventory: Inventory;
  pricing: Pricing;
  history: DayResult[];
  currentTurn: TurnStatus;
  createdAt: string;
  lastPlayed: string;
}

export interface PlayerState {
  money: number;
  totalRevenue: number;
  totalProfit: number;
  reputation: number;
  dayNumber: number;
  milestonesAchieved: string[];
}

export interface Inventory {
  coffeeBeans: number;  // servings
  milk: number;         // servings
  croissants: number;   // units
}

export interface Pricing {
  coffee: number;       // price per cup
  croissant: number;    // price per pastry
}

// Simulation Types
export interface SimulationInput {
  player: PlayerState;
  inventory: Inventory;
  pricing: Pricing;
  seed?: number;
}

export interface DayResult {
  day: number;
  timestamp: string;
  revenue: number;
  costs: OperatingCosts;
  profit: number;
  sales: SalesBreakdown;
  customersServed: number;
  customersSatisfied: number;
  customersUnsatisfied: number;
  customersTurnedAway: number;
  inventoryUsed: InventoryUsed;
  inventorySpoiled: InventoryUsed;
  inventoryRemaining: Inventory;
  reputationChange: number;
  newReputation: number;
  events: GameEvent[];
  feedback: CustomerFeedback[];
  stockOuts: string[];
  newPlayerState: PlayerState;
}

// See Data Models doc for complete definitions
```

---

## 🧪 Testing Requirements

**Minimum Coverage:**
- Game logic (`src/game/`): **90%+**
- Services (`src/services/`): **80%+**
- Components (`src/components/`): **70%+**

**Critical Tests:**
```typescript
// Must have these tests before UI:
✅ calculateCustomerDemand()
✅ processSales()
✅ calculateReputationChange()
✅ simulateDay() end-to-end
✅ gameStore state updates
✅ localStorage save/load
```

**Test Command:**
```bash
npm test                    # Run all tests
npm test -- --coverage      # With coverage report
npm run test:watch         # Watch mode for development
```

---

## 🎨 Design Tokens (Final)

**Location:** `src/styles/variables.css`

```css
:root {
  /* Colors from Lively app palette */
  --color-primary: #E89B7B;      /* Warm terracotta */
  --color-secondary: #C88770;    /* Deeper terracotta */
  --color-background: #FFF9F5;   /* Soft cream */
  --color-text: #4A3326;         /* Rich brown */
  --color-text-light: #8B7355;   /* Lighter brown */
  
  --color-success: #A8C686;      /* Muted green */
  --color-warning: #F4A460;      /* Peachy orange */
  --color-error: #D97373;        /* Soft red */
  
  --color-accent: #E8A87C;       /* Coral */
  --color-accent-light: #F5CDB4; /* Light peach */
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  
  /* Typography */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-size-2xl: 32px;
  --line-height: 1.5;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --transition-fast: 150ms ease-out;
  --transition-base: 300ms ease-out;
  --transition-slow: 500ms ease-out;
}
```

**Usage:**
```css
.button {
  background: var(--color-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
}
```

---

## ✅ CHECKLIST: Before Writing Any Code

- [ ] Read this reconciliation document completely
- [ ] Understand the folder structure (section 2)
- [ ] Have `GAME_BALANCE` values memorized (section 3)
- [ ] Understand type naming conventions (section 5)
- [ ] Know the file creation order (section 9)
- [ ] Set up development environment
- [ ] Create folder structure
- [ ] Ready to code!

---

## 🤝 PROMPTS FOR CLAUDE CODE

### Starting a New Feature
```
I'm implementing [feature] for Pomodoro Cafe.

Context:
- See /mnt/project/Documentation-Reconciliation.md for resolved specifications
- Using official tech stack: React 18 + TypeScript + Zustand
- Game balance values in GAME_BALANCE constant

Task: Create [specific file/component]

Requirements:
- Follow folder structure from reconciliation doc section 2
- Use types from Data Models doc
- Implement [specific functionality]

Return: Complete implementation with TypeScript types and comments.
```

### Fixing a Bug
```
Bug in Pomodoro Cafe: [describe bug]

Context:
- See Documentation-Reconciliation.md for official specifications
- Check if this conflicts with any resolved conflicts (sections 1-5)

Task: Debug and fix

Return: 
1. Root cause analysis
2. Fixed code
3. Test to prevent regression
```

### Adding Tests
```
Need tests for [file/function] in Pomodoro Cafe.

Context:
- Target: 90% coverage for game logic
- Using Vitest + React Testing Library
- See Game Simulation Algorithm doc for expected behavior

Task: Write comprehensive tests

Return: Test file with edge cases covered.
```

---

## 🎯 SUCCESS CRITERIA

Before considering MVP "done":

**Technical:**
- [ ] All conflicts resolved (this doc)
- [ ] Folder structure matches section 2
- [ ] Types match Data Models doc exactly
- [ ] Balance values use GAME_BALANCE constant
- [ ] 90%+ test coverage on game logic
- [ ] No console errors in production
- [ ] Steamy Mode works (type "pshhhhh")

**Functional:**
- [ ] Complete gameplay loop works
- [ ] Timer is accurate (±2 seconds)
- [ ] Audio plays without issues
- [ ] LocalStorage persists state
- [ ] Game balance feels fair (playtest!)

**Quality:**
- [ ] TypeScript strict mode (no `any` types)
- [ ] ESLint passes with no warnings
- [ ] Lighthouse score 90+ 
- [ ] Works on Chrome, Firefox, Safari
- [ ] Mobile responsive

---

## 📚 Documentation Reading Order

**For humans starting fresh:**
1. This document (you are here)
2. Quick Start Guide
3. Technical Architecture
4. Data Models
5. Game Simulation Algorithm
6. Implementation Guide

**For Claude Code:**
1. This document (conflicts resolved)
2. Technical Architecture (patterns)
3. Data Models (types)
4. Game Simulation Algorithm (logic)
5. Other docs as needed

---

## 🚨 FINAL WORD

**When in doubt:**
1. Check this document first
2. If still unclear, ask before coding
3. Prefer simple over clever
4. Test before building UI
5. Use Steamy Mode constantly

**The goal:** Working MVP in 6 weeks, not perfect code.

**Remember:** 
- ✅ Shipped and working > Perfect and incomplete
- ✅ Tested game logic > Pretty UI
- ✅ Clear code > Clever code
- ✅ MVP scope > Feature creep

---

**Last Updated:** November 22, 2025  
**Status:** AUTHORITATIVE - Use as primary reference  
**Next Action:** Set up project (Week 2)

Let's build this! 🚀☕
