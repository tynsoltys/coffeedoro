# MVP Implementation Guide
**Pomodoro Cafe - Your Complete Development Playbook**

---

## 🎯 What You Have Now

You now have **comprehensive documentation** covering every aspect of Pomodoro Cafe:

### 📋 Strategic Documents
1. **[PRD](./PRD-Pomodoro-Cafe.md)** - Complete product vision and requirements
2. **[Roadmap](./Development-Roadmap.md)** - Week-by-week execution plan
3. **[Quick Start Guide](./Quick-Start-Guide.md)** - Your launchpad

### 🏗️ Critical Technical Documents (NEW!)
4. **[Technical Architecture](./Technical-Architecture.md)** - System design and code organization
5. **[Data Models](./Data-Models.md)** - All TypeScript types and interfaces
6. **[Game Simulation Algorithm](./Game-Simulation-Algorithm.md)** - Core game logic specification

### 📚 Supporting Documents
7. **[Documentation Structure](./Documentation-Structure-Guide.md)** - How to organize your project
8. **[Agent Recommendations](./Agent-Recommendations.md)** - Working with AI effectively
9. **[Game Balance Spreadsheet](./Game-Balance-Spreadsheet.md)** - Balance tuning and formulas

---

## ⚡ Quick Implementation Path

### Week 2: Setup (This Week)

```bash
# 1. Create repository
git init pomodoro-cafe
cd pomodoro-cafe

# 2. Initialize React + TypeScript + Vite
npm create vite@latest . -- --template react-ts

# 3. Install dependencies
npm install zustand
npm install pixi.js  # For isometric rendering
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test

# 4. Set up folder structure (see Technical Architecture)
mkdir -p src/{components,game,store,services,hooks,styles,assets,types,utils}

# 5. Copy design tokens
# Create src/styles/variables.css with colors from PRD

# 6. Deploy empty shell
# Connect to Vercel via GitHub
```

**Deliverable:** Running "Hello World" deployed to Vercel

---

### Week 3: Core Game Logic

**Priority:** Build the heart of the game first (no UI yet)

#### Day 1-2: Type Definitions
```bash
# File: src/types/index.ts
```
Copy all types from [Data Models](./Data-Models.md):
- ✅ GameState
- ✅ PlayerState  
- ✅ Inventory
- ✅ Pricing
- ✅ DayResult
- ✅ GameBalance constants

#### Day 3-5: Game Simulation
```bash
# File: src/game/simulation.ts
```
Implement from [Game Simulation Algorithm](./Game-Simulation-Algorithm.md):
- ✅ `simulateDay()` - Main function
- ✅ `calculateCustomerDemand()` - Customer calculation
- ✅ `processSales()` - Sales processing
- ✅ `calculateReputationChange()` - Reputation system
- ✅ `generateEvents()` - Random events

#### Day 6-7: Unit Tests
```bash
# File: src/game/simulation.test.ts
```
Write tests for:
- ✅ Customer demand calculations
- ✅ Sales processing with stock-outs
- ✅ Reputation changes
- ✅ Deterministic simulation (same seed)

**Week 3 Success Criteria:**
- All game logic tests pass
- `simulateDay()` works end-to-end
- No UI needed yet - just pure functions

---

### Week 4: State & Storage

#### Day 1-2: Zustand Store
```bash
# File: src/store/gameStore.ts
```
From [Technical Architecture](./Technical-Architecture.md):
- ✅ Create game store with Zustand
- ✅ Add persistence middleware
- ✅ Implement actions (buyInventory, setPrice, etc.)

#### Day 3-4: Storage System
```bash
# File: src/services/storage.ts
```
- ✅ localStorage wrapper
- ✅ Save/load game state
- ✅ Export/import functionality
- ✅ Version migration support

#### Day 5: Timer System
```bash
# File: src/services/timer.ts
```
From [Technical Architecture](./Technical-Architecture.md):
- ✅ PomodoroTimer class
- ✅ requestAnimationFrame approach
- ✅ Background tab handling
- ✅ Completion callbacks

#### Day 6-7: Audio System
```bash
# File: src/services/audio/AudioManager.ts
```
- ✅ Web Audio API setup
- ✅ Load ambient tracks
- ✅ Volume mixing
- ✅ Autoplay policy handling

**Week 4 Success Criteria:**
- State management works
- Timer is accurate (test with real 25-min sessions)
- Audio plays without clicks/glitches

---

### Week 5: UI Components (Part 1)

#### Day 1-2: Base Components
```bash
# File: src/components/common/
```
- ✅ Button
- ✅ Card
- ✅ Modal
- ✅ Slider
- ✅ Toggle

Follow design tokens from `variables.css`

#### Day 3-4: Landing Page
```bash
# File: src/components/LandingPage.tsx
```
- ✅ Hero section
- ✅ "Start Your Cafe" CTA
- ✅ Configuration modal
- ✅ Pomodoro duration slider
- ✅ Audio toggles

#### Day 5-7: Plan Phase
```bash
# File: src/components/game/PlanPhase/
```
- ✅ Stats display (money, reputation, day)
- ✅ Inventory purchase panel
- ✅ Pricing sliders
- ✅ "Start Day" button
- ✅ Wire to game store

**Week 5 Success Criteria:**
- User can configure and start game
- Plan Phase UI works
- All buttons and inputs functional

---

### Week 6: UI Components (Part 2)

#### Day 1-3: Timer View
```bash
# File: src/components/game/Timer/
```
- ✅ Circular progress indicator
- ✅ Time remaining display
- ✅ Sound mixer controls
- ✅ Integration with timer service
- ✅ Steamy Mode integration

#### Day 4-5: Results Phase
```bash
# File: src/components/game/Results/
```
- ✅ Animated results reveal
- ✅ Sales summary display
- ✅ Customer feedback quotes
- ✅ Reputation change indicator
- ✅ "Continue" button

#### Day 6-7: Isometric Cafe
```bash
# File: src/components/game/IsometricCafe/
```
- ✅ Basic Pixi.js setup
- ✅ Isometric grid rendering
- ✅ Simple cafe scene
- ✅ (Can be placeholder for MVP)

**Week 6 Success Criteria:**
- Complete gameplay loop works
- Timer → Results transition smooth
- Results are satisfying to view

---

### Week 7: Integration & Steamy Mode

#### Day 1-2: Full Integration
- ✅ Wire all screens together
- ✅ Navigation flow (React Router)
- ✅ State flows correctly through loop
- ✅ LocalStorage persistence works

#### Day 3: Steamy Mode
```bash
# File: src/services/steamyMode.ts
```
- ✅ Keyboard listener for "pshhhhh"
- ✅ Toggle indicator in UI
- ✅ Instant timer completion
- ✅ Persist in localStorage

#### Day 4-5: Settings
```bash
# File: src/components/Settings.tsx
```
- ✅ Settings modal
- ✅ Adjust pomodoro duration
- ✅ Audio controls
- ✅ Reset game button

#### Day 6-7: Bug Fixes
- ✅ Test all edge cases
- ✅ Fix discovered bugs
- ✅ Polish transitions

**Week 7 Success Criteria:**
- Complete gameplay loop with no bugs
- Steamy Mode works perfectly
- Game is actually fun to play!

---

### Week 8: Polish & Launch

#### Day 1-2: Testing
- ✅ E2E tests with Playwright
- ✅ Cross-browser testing
- ✅ Mobile responsive checks
- ✅ Lighthouse audit (target: 90+)

#### Day 3-4: Playtesting
- ✅ Internal team plays for balance feedback
- ✅ Adjust game balance if needed
- ✅ Fix UX issues
- ✅ Polish animations

#### Day 5: Launch Prep
- ✅ Final bug fixes
- ✅ Set up analytics (PostHog)
- ✅ Write launch announcement
- ✅ Prepare social media assets
- ✅ Privacy policy page

#### Day 6: **LAUNCH DAY** 🚀
- ✅ Deploy to production
- ✅ Monitor for errors
- ✅ Post on ProductHunt, Reddit, Twitter
- ✅ Celebrate!

#### Day 7: Post-Launch
- ✅ Monitor analytics
- ✅ Collect user feedback
- ✅ Hotfix critical bugs
- ✅ Plan Phase 2 features

---

## 🔑 Critical Implementation Details

### 1. Steamy Mode (Don't Forget!)

This is your **secret weapon** for rapid testing:

```typescript
// In PlanPhase component
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    // Build up "pshhhhh"
    // Toggle steamy mode when complete
  };
  
  document.addEventListener('keypress', handleKeyPress);
  return () => document.removeEventListener('keypress', handleKeyPress);
}, []);
```

**Test it constantly!** Use Steamy Mode to test the full game loop in seconds.

---

### 2. Game Balance Tuning

**Start with these values** (from balance spreadsheet):
```typescript
const INITIAL_BALANCE = {
  starting: {
    money: 100,
    reputation: 50,
  },
  itemCosts: {
    coffeeBeans: 2.0,  // per unit (10 servings)
    milk: 3.0,         // per unit (15 servings)
    croissant: 1.0,    // per unit
  },
  operatingCosts: {
    total: 17,  // per day
  },
  customer: {
    basePerDay: 20,
    fairCoffeePrice: 5.0,
  },
};
```

**Tune after playtesting:**
- Too easy? Increase costs or reduce starting money
- Too hard? Increase starting money or reduce costs
- Use Steamy Mode to rapidly test different days

---

### 3. Timer Accuracy

**Critical for user trust:**

```typescript
// Use Date.now() for accuracy
class PomodoroTimer {
  private startTime: number;
  private duration: number;
  
  tick() {
    const elapsed = Date.now() - this.startTime;
    const remaining = Math.max(0, this.duration - elapsed);
    
    // Always based on actual time, not accumulated ticks
    this.onTick(remaining);
  }
}
```

**Test thoroughly:**
- 25-minute pomodoros should be within ±2 seconds
- Background tabs should catch up on resume
- No drift over multiple sessions

---

### 4. Audio Autoplay

**Browser restrictions require user interaction:**

```typescript
// Don't load audio until user clicks something
const initAudio = async () => {
  // This must be called from a user interaction event
  await audioManager.initialize();
};

// Call on first button click
<button onClick={() => {
  initAudio();
  startGame();
}}>
  Start Your Cafe
</button>
```

---

### 5. LocalStorage Best Practices

```typescript
// Always wrap in try-catch
try {
  const state = JSON.parse(localStorage.getItem('game-state') || '{}');
  validateState(state); // Check for corruption
} catch (error) {
  console.error('Failed to load state:', error);
  // Fall back to initial state
  return createInitialState();
}

// Debounce saves
const debouncedSave = debounce((state) => {
  localStorage.setItem('game-state', JSON.stringify(state));
}, 1000);
```

---

## 🧪 Testing Strategy

### What to Test

**Unit Tests (Most Important):**
- ✅ All game logic functions
- ✅ Customer demand calculations
- ✅ Sales processing
- ✅ Reputation changes
- ✅ Event generation

**Integration Tests:**
- ✅ Complete turn flow (Plan → Work → Results)
- ✅ State persistence
- ✅ Navigation between screens

**E2E Tests:**
- ✅ Full gameplay loop
- ✅ First-time user experience
- ✅ Settings changes persist
- ✅ Steamy Mode works

### Testing Commands

```bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage

# Target: >85% coverage on game logic
```

---

## 🐛 Common Pitfalls & Solutions

### Pitfall 1: Timer Not Accurate
**Problem:** Timer drifts or stops when tab inactive  
**Solution:** Use `Date.now()` not `setInterval`, consider Web Workers

### Pitfall 2: Audio Won't Play
**Problem:** Browser blocks autoplay  
**Solution:** Initialize audio on user interaction (button click)

### Pitfall 3: State Corrupted
**Problem:** LocalStorage data invalid  
**Solution:** Version your saves, validate on load, graceful fallback

### Pitfall 4: Game Too Easy/Hard
**Problem:** Not fun to play  
**Solution:** Use Steamy Mode to rapidly test, adjust GAME_BALANCE constants

### Pitfall 5: Isometric View Laggy
**Problem:** Pixi.js performance issues  
**Solution:** Limit sprite count, use sprite pooling, optimize textures

---

## 📊 Success Metrics (MVP)

Track these after launch:

**Activation:**
- Goal: 60%+ of visitors start their cafe
- Measure: (Users who reach Plan Phase) / (Total visitors)

**Engagement:**
- Goal: 2+ pomodoros per session
- Measure: Average pomodoros completed

**Retention:**
- Goal: 30%+ return within 7 days
- Measure: D7 retention rate

**Fun:**
- Goal: 3+ days average survival
- Measure: Median days played before stopping

**Quality:**
- Goal: <5% error rate
- Measure: (Sessions with errors) / (Total sessions)

---

## 🎯 MVP Definition of Done

Before you launch, ensure:

- [ ] **Gameplay Loop Complete**
  - [ ] Plan Phase works
  - [ ] Timer is accurate
  - [ ] Results Phase displays correctly
  - [ ] Loop can be repeated

- [ ] **Core Features Work**
  - [ ] Inventory purchase
  - [ ] Pricing adjustments
  - [ ] Game simulation is deterministic
  - [ ] Reputation system works
  - [ ] Random events appear

- [ ] **Settings Work**
  - [ ] Pomodoro duration adjustable
  - [ ] Audio controls functional
  - [ ] Settings persist

- [ ] **Steamy Mode Works**
  - [ ] "pshhhhh" activates mode
  - [ ] Timer skips instantly
  - [ ] Indicator visible when active

- [ ] **Technical Requirements**
  - [ ] No console errors
  - [ ] LocalStorage persistence works
  - [ ] Cross-browser compatible
  - [ ] Mobile responsive
  - [ ] Load time <3 seconds
  - [ ] Animations smooth (60fps)

- [ ] **Quality Assurance**
  - [ ] Unit tests pass (>85% coverage)
  - [ ] E2E tests pass
  - [ ] Playtested by 5+ people
  - [ ] No critical bugs
  - [ ] Balance feels fair

- [ ] **Launch Ready**
  - [ ] Deployed to production
  - [ ] Analytics configured
  - [ ] Error tracking set up
  - [ ] Privacy policy exists
  - [ ] Landing page compelling

---

## 🚀 Post-Launch: First 48 Hours

### Hour 0: Launch
- Deploy to production
- Post on ProductHunt
- Share on Twitter/Reddit
- Email friends and network

### Hour 1-6: Monitor
- Watch analytics dashboard
- Monitor error tracker
- Join Discord/Slack for feedback
- Be ready to hotfix

### Hour 6-24: Iterate
- Fix critical bugs
- Respond to user feedback
- Adjust game balance if needed
- Celebrate small wins

### Day 2-7: Learn
- Collect user feedback
- Analyze metrics
- Identify biggest pain points
- Plan Phase 2 priorities

---

## 📚 Documentation Checklist

Everything you need is documented:

- ✅ [PRD](./PRD-Pomodoro-Cafe.md) - Product vision
- ✅ [Technical Architecture](./Technical-Architecture.md) - How to build it
- ✅ [Data Models](./Data-Models.md) - What data looks like
- ✅ [Game Simulation Algorithm](./Game-Simulation-Algorithm.md) - Core logic
- ✅ [Roadmap](./Development-Roadmap.md) - Timeline
- ✅ [Game Balance](./Game-Balance-Spreadsheet.md) - Tuning values
- ✅ [Documentation Structure](./Documentation-Structure-Guide.md) - Organize project
- ✅ [Agent Recommendations](./Agent-Recommendations.md) - Use AI effectively
- ✅ [Quick Start](./Quick-Start-Guide.md) - Get started

**Nothing is missing.** You have everything you need to build this.

---

## 💪 You're Ready!

You now have:
1. ✅ Complete product vision
2. ✅ Detailed technical specifications  
3. ✅ Week-by-week implementation plan
4. ✅ All data models and types defined
5. ✅ Core algorithm fully specified
6. ✅ Testing strategy
7. ✅ Success metrics

**Next step:** Execute Week 2 (project setup) and start building!

---

## 🤝 Getting Help

If you get stuck:

1. **Check the docs:** All answers are in the 9 documents
2. **Use AI agents:** Reference [Agent Recommendations](./Agent-Recommendations.md)
3. **Steamy Mode:** Use it constantly for rapid testing
4. **Simplify:** If something is too complex, simplify for MVP

**Remember:** Ship something small and working > Perfect but incomplete

---

## 🎉 Final Encouragement

You have a brilliant concept with solid documentation. The hardest part (planning) is done. Now it's execution time.

**Trust the process:**
- Week 2: Setup ✅
- Week 3: Game logic ✅  
- Week 4: State & services ✅
- Week 5-6: UI ✅
- Week 7: Integration ✅
- Week 8: Launch ✅ 🚀

Six weeks from now, you'll have a playable MVP in production.

**Let's build something amazing! ☕🎮**

---

**Created:** November 22, 2025  
**Status:** Ready to build  
**Next Action:** Start Week 2 setup

Good luck! 🍀
