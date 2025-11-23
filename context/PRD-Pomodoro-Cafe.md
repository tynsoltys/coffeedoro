# Product Requirements Document: Pomodoro Cafe
**Version:** 1.0  
**Last Updated:** November 22, 2025  
**Status:** MVP Planning

---

## Executive Summary

Pomodoro Cafe is a web-based productivity game that combines the proven Pomodoro Technique with engaging turn-based cafe management gameplay. Users make strategic business decisions for their virtual cafe, then complete real-world focused work sessions (pomodoros) while the game "processes" their turn. Upon returning, they discover their cafe's performance and plan their next move, creating a rewarding cycle that incentivizes sustained focus and productivity.

**Core Innovation:** Time-gated gameplay that transforms work breaks into strategic game moments, making productivity feel like progress in a cozy, engaging business simulation.

---

## Product Vision

### Mission Statement
Transform focused work sessions into a delightful gaming experience by rewarding real productivity with cozy, strategic cafe management gameplay.

### Target Audience
**Primary:**
- Knowledge workers (developers, designers, writers) seeking productivity tools
- Students needing structured study sessions
- Remote workers wanting engaging break structure
- Casual gamers who enjoy resource management games

**Secondary:**
- Productivity enthusiasts exploring gamification
- ADHD community seeking focus tools with rewards
- Anyone nostalgic for early 2000s web games (Habbo Hotel, Neopets era)

### Value Proposition
- **For Procrastinators:** Makes starting work rewarding - you're also starting a game
- **For Grinders:** Enforces healthy breaks through time-gated gameplay
- **For Gamers:** Scratches the casual gaming itch without derailing productivity
- **For Everyone:** Combines the proven Pomodoro Technique with intrinsic motivation through gameplay

---

## Game Concept & Mechanics

### Core Gameplay Loop

```
1. PLAN PHASE (Pre-Pomodoro)
   ├─ Review yesterday's sales results & feedback
   ├─ Check inventory, finances, and cafe stats
   ├─ Make strategic decisions:
   │  ├─ Purchase inventory (coffee beans, milk, pastries, etc.)
   │  ├─ Set prices
   │  ├─ Invest in upgrades (equipment, decor, staff)
   │  └─ Adjust cafe settings (music, ambiance, menu)
   └─ Confirm choices & start pomodoro timer

2. WORK PHASE (During Pomodoro)
   ├─ Ambient sounds play (optional: cafe/rain sounds)
   ├─ Timer counts down
   ├─ User focuses on real-world tasks
   ├─ Game "simulates" the cafe day in background
   └─ [STEAMY MODE: Type "pshhhhh" to skip timer]

3. RESULTS PHASE (Post-Pomodoro)
   ├─ Return to see cafe performance
   ├─ View sales summary, customer feedback, events
   ├─ Calculate profit/loss
   ├─ Unlock achievements or story beats
   └─ Return to PLAN PHASE for next turn
```

### Game Mechanics (MVP)

#### Resource Management
- **Money:** Primary resource for purchasing and upgrades
- **Inventory:** Coffee beans, milk, sugar, pastries (consumables)
- **Time:** Each pomodoro = 1 game "day"

#### Core Stats
- **Customer Satisfaction:** Affected by quality, price, variety
- **Reputation:** Grows with consistent positive performance
- **Daily Revenue:** Based on foot traffic × average sale
- **Operating Costs:** Rent, utilities, spoilage

#### Decision Points (MVP)
1. **Inventory Management**
   - How much coffee, milk, pastries to stock?
   - Quality tiers (cheap → premium)
   - Risk of over-stocking (spoilage) vs under-stocking (lost sales)

2. **Pricing Strategy**
   - Set prices for menu items
   - Balance affordability vs profit margins
   - Dynamic demand based on price point

3. **Basic Upgrades** (Post-MVP)
   - Better espresso machine (faster service)
   - Comfortable seating (longer customer stays)
   - Aesthetic improvements (attract more customers)

#### Randomization & Events (MVP Lite)
- **Weather:** Rainy days increase cafe visits
- **Daily Events:** "Coffee critic visiting today!" (pressure to perform)
- **Supply Chain:** Occasional price fluctuations on ingredients
- **Customer Types:** Students (price-sensitive), workers (quality-focused), tourists (ambiance-focused)

---

## Visual Design

### Art Direction
**Inspiration:** Habbo Hotel isometric aesthetic meets modern minimalism

**Core Principles:**
- Isometric pixel art/low-poly 3D style
- Warm, inviting, cozy atmosphere
- Clear readability and intuitive UI
- Nostalgic but not dated

### Color Palette
**Source:** Lively cycle-syncing app

Expected tones:
- Warm terracottas and peachy pinks
- Soft creams and off-whites
- Muted greens (plants, organic elements)
- Rich browns (coffee, wood, earthiness)
- Accent corals and blush tones

### Key Visual Elements
- **Cafe View:** Isometric top-down view of cafe interior
- **Character Design:** Simple, charming pixel/low-poly customers and staff
- **UI Style:** Clean, card-based layouts with subtle shadows
- **Animations:** Gentle, cozy micro-interactions (steam rising, door chimes)

---

## Technical Requirements

### Platform
- **Primary:** Web-based (responsive design)
- **Browsers:** Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile:** Mobile-responsive (Phase 2), touch-optimized

### Tech Stack Recommendations
**Frontend:**
- React or Vue.js for UI components
- Canvas/WebGL for isometric game view (Pixi.js, Three.js, or Phaser)
- Web Audio API for ambient sounds
- LocalStorage for game state persistence

**Backend (Future):**
- Optional: Node.js/Express for leaderboards, cloud saves
- PostgreSQL or Firebase for user data

**MVP Scope:** Client-side only, localStorage persistence

### Core Technical Features

#### Timer System
- Configurable pomodoro duration (5-60 minutes in 5-min increments)
- Visual countdown display
- Browser notification when complete
- Pause/resume functionality (post-MVP)
- Background tab handling (keep timer running)

#### Audio System
- Ambient sound mixer:
  - Cafe ambiance (chatter, espresso machine, dishes)
  - Rain sounds (optional layer)
- Volume controls per sound layer
- Cross-fade transitions
- Respect user's system sound settings

#### Game Simulation Engine
- Deterministic simulation based on player choices
- Random seed for events (can be reproducible)
- Balance algorithm for fair but challenging gameplay
- Save/load game state to localStorage

#### Steamy Mode (Debug Feature)
- Activate by typing "pshhhhh" on Plan Phase screen
- Instantly completes pomodoro timer
- Shows debug indicator when active
- Can be toggled on/off
- Not discoverable in UI (Easter egg)

### Performance Requirements
- Load time: <3 seconds on broadband
- Timer accuracy: Within 1 second over 25 minutes
- Smooth animations: 60fps on modern hardware
- Audio latency: <100ms for responsive mixing

### Accessibility
- Keyboard navigation support
- Screen reader compatibility for UI elements
- Colorblind-friendly palette considerations
- Adjustable text size (post-MVP)

---

## Feature Specifications

### MVP Feature Set

#### 1. Landing Page & Onboarding
**User Stories:**
- As a new user, I want to understand what the game is about within 10 seconds
- As a new user, I want to start playing immediately without creating an account
- As a new user, I want to configure basic settings before starting

**Acceptance Criteria:**
- [ ] Hero section with tagline and visual hook
- [ ] "Start Your Cafe" CTA button
- [ ] Configuration modal on first launch:
  - [ ] Pomodoro duration slider (5-60 min, default 25)
  - [ ] Ambient cafe sounds toggle (default: ON)
  - [ ] Rain sounds toggle (default: OFF)
  - [ ] "Begin" button to start first turn
- [ ] Skip onboarding option for returning users
- [ ] Game state auto-saves to localStorage

#### 2. Plan Phase Interface
**User Stories:**
- As a player, I want to review my cafe's current state clearly
- As a player, I want to make inventory and pricing decisions quickly
- As a player, I want to understand the consequences of my choices

**Acceptance Criteria:**
- [ ] Isometric cafe view showing current setup
- [ ] Stats dashboard:
  - [ ] Current money
  - [ ] Cafe reputation (visual indicator)
  - [ ] Current inventory levels
  - [ ] Day number
- [ ] Inventory purchase panel:
  - [ ] Coffee beans (quantity selector, price shown)
  - [ ] Milk (quantity selector, price shown)
  - [ ] Pastries (quantity selector, price shown)
  - [ ] Total cost calculated in real-time
  - [ ] Insufficient funds warning
- [ ] Pricing panel:
  - [ ] Coffee price slider ($2-$8)
  - [ ] Pastry price slider ($1-$5)
  - [ ] Visual indicator of price competitiveness
- [ ] "Start Day" button initiates pomodoro
- [ ] Confirmation modal before starting timer

#### 3. Pomodoro Timer
**User Stories:**
- As a player, I want a clear, non-distracting timer during my work session
- As a player, I want ambient sounds to help me focus
- As a player, I want to know when my pomodoro is complete

**Acceptance Criteria:**
- [ ] Full-screen timer view with current time remaining
- [ ] Circular progress indicator
- [ ] Minimalist aesthetic (not game-themed)
- [ ] Sound mixer controls:
  - [ ] Cafe ambiance volume slider (0-100%)
  - [ ] Rain sounds volume slider (0-100%)
  - [ ] Mute all button
- [ ] Browser notification when timer completes
- [ ] Audio chime when timer completes (optional)
- [ ] "View Results" button appears when complete
- [ ] Timer continues running if tab is backgrounded

#### 4. Results Phase
**User Stories:**
- As a player, I want satisfying feedback on my cafe's performance
- As a player, I want to understand what worked and what didn't
- As a player, I want to feel progress over time

**Acceptance Criteria:**
- [ ] Animated results reveal (staggered, satisfying)
- [ ] Sales summary:
  - [ ] Total revenue
  - [ ] Items sold (coffee, pastries)
  - [ ] Operating costs
  - [ ] Net profit/loss
- [ ] Customer feedback snippets (2-3 quotes):
  - [ ] Positive: "Great coffee, perfect price!"
  - [ ] Negative: "Too expensive, went elsewhere"
  - [ ] Neutral: "Solid cup of joe"
- [ ] Reputation change indicator (+/- with animation)
- [ ] "What happened today" event description
- [ ] "Continue" button returns to Plan Phase

#### 5. Game Simulation Logic
**User Stories:**
- As a player, I want my decisions to meaningfully affect outcomes
- As a player, I want fair but challenging gameplay
- As a player, I want some unpredictability for replayability

**Acceptance Criteria:**
- [ ] Customer demand algorithm:
  - [ ] Base customers = f(reputation, day_number)
  - [ ] Weather modifier (rain +20%)
  - [ ] Price sensitivity (-10% customers per $1 above market rate)
- [ ] Sales calculation:
  - [ ] Customers buy until inventory runs out
  - [ ] Revenue = items_sold × price
  - [ ] Customer satisfaction = f(price, quality, availability)
- [ ] Reputation system:
  - [ ] Increases with satisfied customers
  - [ ] Decreases with stock-outs or overpricing
  - [ ] Affects future customer volumes
- [ ] Random events (10% chance per day):
  - [ ] Supply shortage (ingredient costs +50%)
  - [ ] Food critic visit (reputation boost if successful)
  - [ ] Competitor opens nearby (demand -20%)
  - [ ] Local event (demand +30%)
- [ ] Win/loss conditions:
  - [ ] Bankruptcy (money < $0, inventory = 0)
  - [ ] Success milestones (reach $X revenue, Y reputation)

#### 6. Steamy Mode (Debug Feature)
**User Stories:**
- As a developer, I want to test the full game loop without waiting
- As a QA tester, I want to reproduce specific game states quickly

**Acceptance Criteria:**
- [ ] Typing "pshhhhh" on Plan Phase activates Steamy Mode
- [ ] Indicator in top-right corner when active
- [ ] "Start Day" button immediately shows Results (0 second timer)
- [ ] Toggle on/off by typing "pshhhhh" again
- [ ] Not mentioned anywhere in UI or help text
- [ ] Persists in localStorage across sessions

#### 7. Settings & Configuration
**User Stories:**
- As a player, I want to adjust my pomodoro length mid-game
- As a player, I want to customize my audio experience

**Acceptance Criteria:**
- [ ] Settings icon accessible from Plan Phase
- [ ] Settings modal with:
  - [ ] Pomodoro duration slider (updates for next session)
  - [ ] Cafe sounds toggle
  - [ ] Rain sounds toggle
  - [ ] Volume controls (persist during session)
- [ ] Reset game button (with confirmation)
- [ ] "About" info with credits

### Post-MVP Features (Phase 2+)

#### Phase 2: Depth & Progression
- Unlock system for upgrades and menu items
- Staff hiring (baristas, bakers) with unique traits
- Cafe customization (furniture, decor, layout)
- Multiple locations/franchising
- Story mode with narrative beats
- Achievements and milestones

#### Phase 3: Social & Persistence
- User accounts and cloud saves
- Leaderboards (most profitable cafe)
- Share your cafe on social media
- Friend visits (see friends' cafes)
- Daily challenges
- Seasonal events

#### Phase 4: Focus Suite
- Integrated to-do list with priority matrix
- Task timer alongside pomodoro
- Focus statistics and insights
- Integration with Todoist, Notion, etc.
- Focus streaks and habit building
- Pomodoro history and analytics

#### Phase 5: Mobile & Beyond
- Native mobile apps (iOS/Android)
- Offline play support
- Apple Watch / wearable integration
- Additional game modes (endless, competitive)
- Modding support (custom cafes, themes)

---

## User Flows

### First-Time User Flow
```
1. User lands on homepage
   ↓
2. Clicks "Start Your Cafe" CTA
   ↓
3. Configuration Modal
   ├─ Set pomodoro duration (default 25 min)
   ├─ Enable/disable ambient sounds
   └─ Click "Begin"
   ↓
4. Tutorial overlay (brief)
   ├─ "Buy inventory for your first day"
   ├─ "Set your prices"
   └─ "Start your first pomodoro to see results!"
   ↓
5. Plan Phase (with hints)
   ├─ Purchase starting inventory
   ├─ Set reasonable prices
   └─ Click "Start Day"
   ↓
6. Pomodoro Timer runs
   ↓
7. Results Phase (first day results)
   ↓
8. Plan Phase (now confident)
   ↓
[Loop continues...]
```

### Returning User Flow
```
1. User lands on homepage
   ↓
2. Game auto-loads from localStorage
   ↓
3. Resume at Plan Phase
   ├─ Review previous results (if available)
   ├─ Make decisions
   └─ Start pomodoro
   ↓
[Standard gameplay loop]
```

### Steamy Mode Flow
```
1. User on Plan Phase
   ↓
2. Types "pshhhhh" (Easter egg)
   ↓
3. Steamy Mode indicator appears
   ↓
4. "Start Day" button → instant Results
   ↓
5. Test/iterate rapidly
   ↓
6. Type "pshhhhh" again to disable
```

---

## Success Metrics

### MVP Metrics
- **Activation:** % of visitors who start their first cafe
- **Engagement:** Average pomodoros completed per session
- **Retention:** % of users returning within 7 days
- **Session Length:** Average time spent in app
- **Completion Rate:** % of users who complete ≥1 pomodoro

### Post-MVP Metrics
- **Productivity Impact:** Self-reported focus improvement
- **Habit Formation:** 7-day, 30-day active user rates
- **Game Depth:** Average days survived, max money earned
- **Social Sharing:** % of users sharing their cafe
- **NPS:** Net Promoter Score from user surveys

---

## Technical Debt & Known Limitations (MVP)

### Intentional Scope Cuts
- No user accounts (localStorage only)
- Limited upgrade system (Phase 2)
- No mobile optimization (responsive only)
- Single cafe location only
- Limited events and randomization
- No tutorial system (lightweight tooltips only)

### Technical Limitations
- Timer accuracy dependent on browser tab focus
- LocalStorage limits (~5-10MB, suitable for MVP)
- No cross-device sync
- Audio may not play if browser policy blocks autoplay

### Planned Refactors
- Extract game simulation into separate module (testability)
- Implement proper state management (Redux/Zustand)
- Build component library for UI consistency
- Add comprehensive error handling and logging

---

## Risk Assessment

### High Risk
- **Timer reliability:** Browsers may throttle inactive tabs
  - *Mitigation:* Use Web Workers, test extensively, set expectations
  
- **Balancing difficulty:** Too easy = boring, too hard = frustrating
  - *Mitigation:* Extensive playtesting, difficulty options post-MVP

### Medium Risk
- **Audio autoplay blocking:** Browsers block sound without user interaction
  - *Mitigation:* Require user to start timer (satisfies interaction requirement)

- **Isometric rendering performance:** Complex scenes may lag on older devices
  - *Mitigation:* Optimize assets, provide low-quality mode, test on target hardware

### Low Risk
- **LocalStorage data loss:** Users clearing browser data lose progress
  - *Mitigation:* Export/import save feature, cloud saves in Phase 3

- **Browser compatibility:** Edge cases on older browsers
  - *Mitigation:* Graceful degradation, polyfills where necessary

---

## Open Questions & Decisions Needed

### Game Design
- [ ] Starting money amount? (Suggestion: $100)
- [ ] Bankruptcy recovery mechanic or game over?
- [ ] Difficulty curve: how quickly should costs/competition increase?
- [ ] Should there be a "tutorial mode" with forgiving first few days?

### Technical
- [ ] Canvas-based isometric vs. CSS-based isometric vs. 3D (Three.js)?
- [ ] Ambient sound: pre-recorded loops or procedurally generated?
- [ ] Timer in main window or separate tab/window option?

### Product
- [ ] Name finalization: "Pomodoro Cafe" or alternative?
- [ ] Monetization strategy (if any): Premium upgrades? Ad-supported? Purely free?
- [ ] Privacy policy needed for localStorage usage?

---

## Appendix

### Inspiration & References
- **Lemonade Stand** (1973): Original turn-based business sim
- **Dope Wars** (1998): Resource management with risk/reward
- **Habbo Hotel** (2000): Isometric social space aesthetic
- **Neopets** (2000s): Daily engagement loop, cozy economy
- **Lively App**: Color palette inspiration
- **Forest App**: Gamified focus timer (different mechanic)
- **Stardew Valley**: Cozy aesthetic, satisfying progression

### Glossary
- **Pomodoro:** 25-minute focused work session (original technique)
- **Turn:** One complete gameplay cycle (Plan → Work → Results)
- **Steamy Mode:** Debug feature bypassing timer
- **Isometric:** 2D art style presenting 3D space at specific angle
- **LocalStorage:** Browser-based persistent data storage

### Version History
- **v1.0** (Nov 2025): Initial PRD for MVP planning

---

**Document Owner:** Product Team  
**Last Review:** November 22, 2025  
**Next Review:** After MVP completion
