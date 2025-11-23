# Pomodoro Cafe Development Roadmap
**Version:** 1.0  
**Planning Date:** November 22, 2025

---

## Overview

This roadmap outlines the phased development approach for Pomodoro Cafe, from MVP launch through long-term vision. Each phase builds on the previous, allowing for iterative improvement based on user feedback and validation of core assumptions.

**Core Philosophy:** Ship early, learn fast, iterate based on real usage.

---

## Timeline Summary

```
Phase 0: Planning & Setup        [Weeks 1-2]    ━━━━━━━━━━━━━━━━━━━━━━━
Phase 1: MVP Development         [Weeks 3-8]    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Phase 2: Depth & Progression     [Weeks 9-16]   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Phase 3: Social & Persistence    [Weeks 17-22]  ━━━━━━━━━━━━━━━━━━━━━━━━━━
Phase 4: Focus Suite             [Weeks 23-28]  ━━━━━━━━━━━━━━━━━━━━━━━━━━
Phase 5: Mobile & Scaling        [Weeks 29-36]  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ongoing: Operations & Growth     [Continuous]   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━→
```

**Estimated Total Timeline:** 36 weeks (~9 months) to full feature set
**MVP Launch Target:** Week 8 (6 weeks from Phase 1 start)

---

## Phase 0: Planning & Setup
**Timeline:** Weeks 1-2  
**Status:** ✅ In Progress  
**Goal:** Establish foundation with clear documentation, technical decisions, and development environment.

### Week 1: Documentation & Design

#### Deliverables
- [x] Product Requirements Document (PRD)
- [x] Documentation structure guide
- [x] Agent recommendations
- [x] Development roadmap (this document)
- [ ] Technical architecture document
- [ ] Game balance spreadsheet (initial)
- [ ] Visual style guide with color palette
- [ ] Wireframes for all MVP screens

#### Key Decisions
- [ ] **Tech Stack Selection**
  - Frontend framework: React vs Vue vs Svelte
  - Isometric rendering: Canvas (Pixi.js) vs SVG vs WebGL (Three.js)
  - State management: Context API vs Zustand vs Redux
  - Testing: Vitest + React Testing Library + Playwright

- [ ] **Design Decisions**
  - Finalize color palette from Lively app
  - Confirm isometric art style (pixel vs low-poly)
  - Choose font pairings
  - Define component design patterns

- [ ] **Hosting & Deployment**
  - Static hosting: Vercel vs Netlify vs GitHub Pages
  - Domain: Purchase custom domain or subdomain?
  - CI/CD: GitHub Actions workflow

#### Success Criteria
- All core documentation exists and is linked
- Tech stack decisions documented with rationale
- Team aligned on visual direction
- Development environment can be set up in <30 minutes

---

### Week 2: Environment Setup & First Commit

#### Deliverables
- [ ] Repository initialized (GitHub)
- [ ] Project scaffolding (React + Vite + TypeScript)
- [ ] Design system foundation
  - CSS variables for design tokens
  - Base component library (Button, Card, Modal, Input)
- [ ] ESLint + Prettier configuration
- [ ] Initial folder structure (matches docs/)
- [ ] README with setup instructions
- [ ] First deployed version (empty shell on Vercel)

#### Tasks
1. **Repository Setup**
   - Create repo with clear name
   - Add .gitignore, LICENSE
   - Set up branch protection (require reviews)

2. **Development Environment**
   - Install Node.js, npm/yarn/pnpm
   - Set up VSCode workspace settings
   - Install recommended extensions

3. **Base Application**
   - Vite + React + TypeScript template
   - Router setup (React Router)
   - Basic layout structure

4. **Design System Foundation**
   - Create `/src/styles/variables.css` with design tokens
   - Implement base components
   - Set up Storybook (optional but recommended)

5. **CI/CD Pipeline**
   - GitHub Actions for tests
   - Automatic deployment to Vercel on push to main

#### Success Criteria
- `npm run dev` starts the app successfully
- Base components render correctly
- Auto-deployment works on push
- All team members can run locally

---

## Phase 1: MVP Development
**Timeline:** Weeks 3-8 (6 weeks)  
**Status:** 🔜 Next  
**Goal:** Launch playable MVP with core gameplay loop and pomodoro timer.

### MVP Feature Checklist

**Must Have (P0):**
- [ ] Landing page with onboarding
- [ ] Pomodoro timer with audio
- [ ] Plan Phase: inventory purchase, pricing
- [ ] Results Phase: sales summary, feedback
- [ ] Game simulation logic
- [ ] Basic isometric cafe view
- [ ] Settings: timer duration, audio controls
- [ ] Steamy Mode debug feature
- [ ] LocalStorage persistence

**Should Have (P1):**
- [ ] Animated transitions between phases
- [ ] Sound effects (button clicks, notifications)
- [ ] Basic tutorial/tooltips
- [ ] Responsive design (mobile-friendly)

**Nice to Have (P2):**
- [ ] Multiple cafe interior themes
- [ ] Ambient background animations
- [ ] "Share your cafe" screenshot feature

---

### Week 3: Core Infrastructure

#### Focus: Game Logic Foundation

**Deliverables:**
- [ ] Game state management system (Zustand store)
- [ ] LocalStorage wrapper with versioning
- [ ] Core game simulation module (`/src/game/simulation.js`)
- [ ] Economy calculations (`/src/game/economy.js`)
- [ ] Balance constants file (`/src/game/balance.js`)
- [ ] Unit tests for game logic

**Key Tasks:**
1. **Game State Schema**
   ```typescript
   GameState {
     player: { money, reputation, dayNumber }
     inventory: { coffee, milk, pastries }
     settings: { pomodoroMinutes, soundEnabled }
     history: DayResult[]
   }
   ```

2. **Simulation Algorithm**
   - Customer demand calculation
   - Sales processing
   - Revenue/cost accounting
   - Reputation updates
   - Random events (basic)

3. **Balance Tuning**
   - Starting values: $100, reputation 50
   - Item costs and prices
   - Difficulty scaling per day

**Success Criteria:**
- Unit tests pass (>85% coverage on game logic)
- Simulation is deterministic (same inputs → same outputs)
- Balance feels fair in testing

**Testing Approach:**
```javascript
// Example test
describe('Game Simulation', () => {
  it('should calculate revenue correctly', () => {
    const gameState = createTestState();
    const result = simulateDay(gameState);
    expect(result.revenue).toBe(expectedValue);
  });
});
```

---

### Week 4: Timer & Audio System

#### Focus: Pomodoro Timer & Sound Management

**Deliverables:**
- [ ] Pomodoro timer component with countdown
- [ ] Web Worker for background timer (if needed)
- [ ] Audio system with Web Audio API
- [ ] Sound mixer UI (volume controls)
- [ ] Browser notification on timer completion
- [ ] Timer accuracy tests

**Key Tasks:**
1. **Timer Implementation**
   - Countdown from configured minutes
   - Circular progress indicator (CSS/SVG)
   - Pause/resume functionality (post-MVP)
   - Keep running when tab is inactive

2. **Audio System**
   - Load ambient sound files (cafe, rain)
   - Multi-layer mixing with individual volumes
   - Cross-fade transitions
   - Respect browser autoplay policies

3. **Browser Notifications**
   - Request permission on first timer start
   - Show notification when complete
   - Click notification → focus app

**Technical Considerations:**
- **Timer Accuracy:** Use `requestAnimationFrame` or Web Workers
- **Audio Autoplay:** Requires user interaction (starting timer counts)
- **Tab Visibility:** Use Page Visibility API to handle background tabs

**Success Criteria:**
- Timer accurate within ±2 seconds over 25 minutes
- Audio plays without clicks/pops
- Notifications work on Chrome, Firefox, Safari
- Smooth performance on mid-range devices

---

### Week 5: UI Components (Part 1)

#### Focus: Landing Page & Plan Phase

**Deliverables:**
- [ ] Landing page with hero and CTA
- [ ] Onboarding configuration modal
- [ ] Plan Phase screen layout
- [ ] Inventory purchase panel
- [ ] Pricing controls (sliders)
- [ ] Stats dashboard
- [ ] Navigation between screens

**Key Tasks:**
1. **Landing Page**
   - Hero section with tagline
   - Visual hook (animated cafe scene?)
   - "Start Your Cafe" button
   - Configuration modal:
     - Pomodoro duration slider (5-60 min)
     - Audio toggles (cafe sounds, rain sounds)
     - "Begin" button

2. **Plan Phase Screen**
   - Isometric cafe view (placeholder or simple version)
   - Current stats: money, reputation, day number
   - Inventory panel:
     - Coffee beans, milk, pastries quantity selectors
     - Price per unit displayed
     - Total cost calculated in real-time
   - Pricing panel:
     - Coffee price slider
     - Pastry price slider
     - Visual feedback (too expensive/too cheap)
   - "Start Day" button (initiates timer)

**Design Checklist:**
- [ ] Follows design tokens (colors, spacing, typography)
- [ ] Accessible (keyboard navigation, ARIA labels)
- [ ] Responsive (works on 375px mobile width)
- [ ] Smooth animations (60fps)

**Success Criteria:**
- User can complete onboarding flow
- All inputs work and persist to state
- Visual polish matches mockups
- No console errors

---

### Week 6: UI Components (Part 2)

#### Focus: Results Phase & Isometric View

**Deliverables:**
- [ ] Results screen with animated reveal
- [ ] Customer feedback display
- [ ] Reputation change indicator
- [ ] Isometric cafe visualization (MVP version)
- [ ] Settings modal
- [ ] Complete navigation flow

**Key Tasks:**
1. **Results Phase Screen**
   - Animated results reveal (staggered timing)
   - Sales summary:
     - Revenue, items sold, costs, profit/loss
   - Customer feedback (2-3 quotes)
   - Reputation change (+/- with animation)
   - Event description ("Rainy day increased visits!")
   - "Continue" button → return to Plan Phase

2. **Isometric Cafe View**
   - Simple isometric grid (MVP: static image or basic Canvas)
   - Visual indicators: inventory levels, quality
   - Cozy aesthetic: wood, plants, warm lighting
   - Future: Animated customers, steam from espresso

3. **Settings Modal**
   - Accessible from Plan Phase (gear icon)
   - Adjustable settings:
     - Pomodoro duration
     - Audio toggles
     - Volume sliders
   - Reset game button (with confirmation)
   - About/credits section

**Animation Specs:**
- Results reveal: Fade in, stagger by 200ms per element
- Reputation change: Count-up animation, color pulse
- Transitions: 300ms ease-out between screens

**Success Criteria:**
- Results feel satisfying and clear
- Isometric view is visually appealing
- Settings persist correctly
- Complete gameplay loop works end-to-end

---

### Week 7: Integration & Steamy Mode

#### Focus: Connect All Pieces

**Deliverables:**
- [ ] Full gameplay loop integration
- [ ] Steamy Mode implementation
- [ ] Game state persistence (localStorage)
- [ ] Error handling and edge cases
- [ ] Loading states and transitions
- [ ] Initial playtesting with team

**Key Tasks:**
1. **Gameplay Loop Integration**
   - Wire Plan Phase → Timer → Results → Plan Phase
   - Ensure state updates correctly between screens
   - Handle all user inputs and edge cases
   - Test with real 25-minute pomodoros

2. **Steamy Mode (Debug Feature)**
   - Listen for "pshhhhh" keyboard input on Plan Phase
   - Toggle indicator in top-right corner
   - When active: "Start Day" → instant Results (0s timer)
   - Persist mode in localStorage
   - Not mentioned in UI (Easter egg)

3. **Persistence & State Management**
   - Auto-save game state after every action
   - Load saved game on app start
   - Handle corrupted saves gracefully
   - Export/import save feature

4. **Error Handling**
   - Network errors (if fetching assets)
   - Audio playback failures
   - LocalStorage quota exceeded
   - Invalid user inputs

**Edge Cases to Test:**
- [ ] Starting with $0 (bankruptcy)
- [ ] Buying more inventory than you can afford
- [ ] Extreme prices ($0 or $999)
- [ ] Running out of inventory mid-day
- [ ] Browser tab closed during timer
- [ ] LocalStorage disabled

**Success Criteria:**
- Complete gameplay loop works without bugs
- Steamy Mode works for rapid testing
- Game state never corrupts
- All edge cases handled gracefully

---

### Week 8: Polish, Testing & Launch

#### Focus: Bug Fixes, Testing, Deployment

**Deliverables:**
- [ ] Comprehensive testing (unit, integration, e2e)
- [ ] Bug fixes from playtesting
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Launch checklist completed
- [ ] **MVP LAUNCH** 🚀

**Key Tasks:**
1. **Testing Suite**
   - Unit tests: Game logic (90%+ coverage)
   - Integration tests: User flows
   - E2E tests: Critical path (onboarding → 3 days → results)
   - Cross-browser testing (Chrome, Firefox, Safari)
   - Mobile device testing

2. **Playtesting**
   - Internal team: 5-10 people play for 1 week
   - Collect feedback: clarity, bugs, balance, fun
   - Iterate on major issues
   - Validate game balance

3. **Performance Optimization**
   - Lighthouse audit (target: 90+ performance score)
   - Optimize images and assets
   - Code splitting for faster load
   - Lazy load non-critical components

4. **Accessibility**
   - Keyboard navigation works throughout
   - Screen reader testing (NVDA/VoiceOver)
   - Color contrast meets WCAG AA
   - Focus indicators visible

5. **Launch Preparation**
   - Final bug fixes
   - Analytics setup (PostHog, Plausible, or similar)
   - Error tracking (Sentry)
   - Privacy policy page
   - Social media cards (OG images)
   - Launch announcement draft

**Launch Checklist:**
- [ ] All P0 features work without bugs
- [ ] Performance: <3s load time, 60fps animations
- [ ] Cross-browser compatibility verified
- [ ] Mobile responsive on iOS and Android
- [ ] Analytics and error tracking configured
- [ ] Domain and SSL certificate set up
- [ ] Backup of production database (if applicable)
- [ ] Rollback plan in case of critical issues

**Success Criteria:**
- MVP is publicly accessible and stable
- Core gameplay loop is fun and clear
- No critical bugs
- Ready for initial user feedback

---

## Phase 2: Depth & Progression
**Timeline:** Weeks 9-16 (8 weeks)  
**Status:** 🔮 Future  
**Goal:** Add depth to gameplay with upgrades, achievements, and expanded content.

### Overview
Based on MVP user feedback, enhance the game with progression systems that keep players engaged beyond the first few days.

### Week 9-10: Upgrade System

**Features:**
- [ ] Cafe equipment upgrades (3 tiers each)
  - Espresso machine (speed, quality)
  - Grinder (consistency)
  - Seating (capacity)
  - Decor (ambiance)
- [ ] Upgrade UI (shop interface)
- [ ] Unlock conditions (money, reputation, day number)
- [ ] Visual changes in isometric view when upgraded
- [ ] Balance impact on gameplay

**Design Considerations:**
- Upgrades should feel meaningful (clear gameplay impact)
- Cost scaling: Each tier 2-3x more expensive
- Visual feedback: Better equipment visible in cafe
- Progression: Unlocks over 20-30 days of play

---

### Week 11-12: Staff & Menu Expansion

**Features:**
- [ ] Staff hiring system
  - Baristas with unique traits (fast, friendly, perfectionist)
  - Training and skill progression
  - Wage costs and management
- [ ] Expanded menu items
  - Specialty coffees (cappuccino, latte, cold brew)
  - Food items (sandwiches, cookies, salads)
  - Seasonal specials
- [ ] Recipe unlocking system
- [ ] Staff management UI

**Gameplay Impact:**
- Staff reduce player workload (automate some decisions)
- More menu items = more strategy (what to focus on?)
- Higher complexity without overwhelming

---

### Week 13-14: Events & Narrative

**Features:**
- [ ] Expanded events library (30+ events)
  - Story events (meet a regular customer, food critic review)
  - Challenges (survive a heatwave, coffee shortage)
  - Opportunities (catering gig, collaboration offer)
- [ ] Event chains (choices lead to follow-up events)
- [ ] Light narrative progression
  - Milestones: "Your cafe is getting noticed!"
  - Character development (recurring customers)
- [ ] Achievement system (20-30 achievements)
  - Sales milestones
  - Survival challenges
  - Easter eggs

**Narrative Themes:**
- Small business journey (scrappy startup → neighborhood staple)
- Community building (regulars, local relationships)
- Work-life balance (mirroring player's own productivity)

---

### Week 15-16: Polish & Balance

**Features:**
- [ ] Visual upgrades to isometric view
  - Animated customers
  - Weather effects
  - Day/night cycle
- [ ] Sound design expansion
  - More ambient sounds
  - Menu-specific sounds (pour, steam, clinking)
- [ ] Game balance tuning based on data
  - Difficulty curve adjustments
  - Economic balance (costs, revenue)
  - Event frequency and impact
- [ ] Tutorial improvements (onboarding flow)
- [ ] Quality of life improvements based on feedback

**Success Criteria:**
- Median play session: 5+ days (vs 2-3 in MVP)
- Retention: 40%+ return next day
- Engagement: Players explore upgrades and menus
- Feedback: "More depth than I expected!"

---

## Phase 3: Social & Persistence
**Timeline:** Weeks 17-22 (6 weeks)  
**Status:** 🔮 Future  
**Goal:** Add social features, user accounts, and persistent progression.

### Week 17-18: Backend Infrastructure

**Features:**
- [ ] Backend architecture setup
  - Node.js + Express + PostgreSQL (or Firebase/Supabase)
  - RESTful API or GraphQL
  - Database schema design
- [ ] User authentication system
  - Email/password registration
  - Google OAuth
  - Guest → Registered user migration
- [ ] Cloud save system
  - Sync game state to cloud
  - Conflict resolution (local vs cloud)
  - Cross-device play

**Technical Decisions:**
- **Option A:** Firebase (fast setup, managed services)
- **Option B:** Custom backend (more control, lower long-term costs)
- **Option C:** Supabase (middle ground)

**Migration Path:**
- Existing localStorage saves import to cloud
- Seamless transition for MVP users

---

### Week 19-20: Social Features

**Features:**
- [ ] Leaderboards
  - Most profitable cafe (daily, weekly, all-time)
  - Longest streak
  - Most customers served
  - Fastest to $1000
- [ ] Cafe showcase
  - "Visit" friend's cafes (view-only)
  - Share cafe screenshot on social media
  - Cafe profiles (description, theme, stats)
- [ ] Daily challenges
  - Special objectives (e.g., "Use only premium coffee today")
  - Rewards: Exclusive upgrades, cosmetics
- [ ] Friend system
  - Add friends by username
  - See friends' stats and cafes

**Privacy Considerations:**
- Opt-in for public leaderboards
- Friends-only sharing by default
- No real names displayed (usernames only)

---

### Week 21-22: Community & Content

**Features:**
- [ ] Community hub (in-app or forum)
  - Share strategies and tips
  - Request features
  - Report bugs
- [ ] User-generated content (Phase 5+)
  - Custom cafe themes
  - Modding support (JSON-based)
- [ ] Seasonal events
  - Halloween: Pumpkin spice latte special
  - Winter: Hot chocolate, holiday decor
  - Summer: Iced drinks, outdoor seating
- [ ] Push notifications (opt-in)
  - "Your cafe has been idle for a day!"
  - Daily challenge available
  - Friend visited your cafe

**Success Criteria:**
- 20%+ of users create accounts
- Leaderboards have 100+ active players
- Daily challenges completion rate: 30%+
- Social features increase retention by 15%+

---

## Phase 4: Focus Suite Integration
**Timeline:** Weeks 23-28 (6 weeks)  
**Status:** 🔮 Future  
**Goal:** Expand productivity features to become a comprehensive focus tool.

### Week 23-24: To-Do List Integration

**Features:**
- [ ] Built-in to-do list
  - Create, edit, complete tasks
  - Priority levels (Eisenhower matrix)
  - Tags and categories
  - Link tasks to pomodoro sessions
- [ ] Task-focused pomodoros
  - "What are you working on this session?"
  - Track which tasks get most focus time
- [ ] Productivity insights
  - Time spent per task category
  - Most productive time of day
  - Correlation: focus quality ↔ game progress

**UI/UX:**
- Non-intrusive: Optional panel, doesn't block game
- Quick capture: Easy to add tasks without leaving Plan Phase
- Smart defaults: Today's tasks auto-suggested

---

### Week 25-26: Third-Party Integrations

**Features:**
- [ ] Todoist integration
  - OAuth authentication
  - Fetch today's tasks
  - Mark complete from Pomodoro Cafe
  - Two-way sync
- [ ] Notion integration (if feasible)
  - Connect to database
  - Update task status
- [ ] Calendar integration (Google Calendar, Apple Calendar)
  - See upcoming events
  - Block time for pomodoros
- [ ] Focus mode triggers
  - "Start pomodoro" → DND mode on phone (via shortcuts)
  - Block distracting websites (browser extension?)

**Privacy & Permissions:**
- Clear data usage disclosures
- Minimal permissions requested
- User controls what data is shared

---

### Week 27-28: Analytics & Insights

**Features:**
- [ ] Focus analytics dashboard
  - Total pomodoros completed (daily/weekly/monthly/all-time)
  - Focus streaks (consecutive days)
  - Average session quality (self-reported?)
  - Patterns: Best time of day, day of week
- [ ] Game-productivity correlation
  - Does better cafe performance = more focus?
  - "You're on a 5-day streak! Your cafe is thriving!"
- [ ] Goal setting
  - Set weekly pomodoro targets
  - Track progress toward goals
  - Celebrate milestones
- [ ] Habit tracking
  - Check-in on focus habits
  - Reflect on what helps/hinders productivity

**Data Visualization:**
- Clean, minimalist charts (avoid information overload)
- Actionable insights (not just numbers)
- Positive reinforcement (celebrate wins)

**Success Criteria:**
- 30%+ of users use to-do list feature
- 10%+ connect third-party integrations
- Users report improved focus (survey)
- Pomodoro completion rate increases

---

## Phase 5: Mobile & Scaling
**Timeline:** Weeks 29-36 (8 weeks)  
**Status:** 🔮 Future  
**Goal:** Native mobile apps, performance optimization, scaling infrastructure.

### Week 29-31: Mobile App Development

**Platforms:**
- [ ] iOS app (React Native or Swift)
- [ ] Android app (React Native or Kotlin)

**Mobile-Specific Features:**
- [ ] Push notifications (timer complete, daily reminders)
- [ ] Lock screen widget (timer countdown)
- [ ] Apple Watch / WearOS support (timer control)
- [ ] Offline mode (play without internet)
- [ ] Haptic feedback
- [ ] Native performance optimizations

**Considerations:**
- Code reuse: React Native shares logic with web
- Platform-specific UX (iOS vs Android guidelines)
- App store guidelines and approval process

---

### Week 32-34: Scaling & Optimization

**Infrastructure:**
- [ ] Backend scaling (load balancers, caching)
- [ ] CDN for static assets (Cloudflare, CloudFront)
- [ ] Database optimization (indexes, query performance)
- [ ] Real-time features (WebSocket for live leaderboards?)
- [ ] API rate limiting and abuse prevention

**Performance:**
- [ ] Code splitting and lazy loading (web)
- [ ] Image optimization (WebP, responsive sizes)
- [ ] Reduce bundle size (<200KB initial load)
- [ ] Server-side rendering (SSR) for SEO

**Monitoring:**
- [ ] Performance monitoring (Lighthouse CI)
- [ ] Error tracking (Sentry)
- [ ] Analytics (PostHog, Mixpanel)
- [ ] Uptime monitoring (Pingdom, UptimeRobot)

---

### Week 35-36: Advanced Features

**Experimental / Nice-to-Have:**
- [ ] Multiple cafe locations (franchise mode)
- [ ] Multiplayer challenges (compete with friends)
- [ ] AI-powered suggestions (optimal inventory, pricing)
- [ ] Voice commands (start/stop timer hands-free)
- [ ] Accessibility: Screen reader, voice control, switch access
- [ ] Localization (i18n): Support for 5+ languages
- [ ] VR/AR experiment (isometric cafe in AR?)

**Community Features:**
- [ ] Modding API (custom cafes, items, events)
- [ ] Creator tools (design your own cafe layout)
- [ ] Community marketplace (share/download mods)

**Success Criteria:**
- Mobile apps: 10K+ downloads in first month
- Performance: Lighthouse score 95+
- Uptime: 99.9% reliability
- Scalability: Handle 100K+ concurrent users

---

## Ongoing: Operations & Growth
**Timeline:** Continuous  
**Status:** 🔄 Always Active

### Regular Cadence

#### Weekly
- [ ] Monitor analytics and key metrics
- [ ] Review user feedback and bug reports
- [ ] Triage issues and prioritize fixes
- [ ] Update community on progress (blog, Discord, Twitter)

#### Bi-Weekly
- [ ] Sprint planning and retrospectives
- [ ] Deploy updates and hotfixes
- [ ] Review A/B tests and experiments

#### Monthly
- [ ] Major feature releases
- [ ] Roadmap review and adjustments
- [ ] User research: Surveys, interviews
- [ ] Content drops: New events, seasonal themes

#### Quarterly
- [ ] Strategic planning and OKRs
- [ ] Competitive analysis
- [ ] Technology audits (dependencies, security)
- [ ] Team retrospectives and learnings

---

### Key Metrics to Track

#### Engagement Metrics
- **DAU/MAU ratio:** Daily active / Monthly active users
- **Session length:** Average time spent per visit
- **Pomodoros completed:** Per user, per session
- **Retention:** D1, D7, D30 retention rates
- **Churn rate:** % of users who stop returning

#### Game Metrics
- **Average days survived:** Median and mean
- **Bankruptcy rate:** % of players who go bankrupt
- **Upgrade adoption:** % of players who buy upgrades
- **Achievement completion:** % per achievement
- **Steamy Mode usage:** How often are players debugging?

#### Business Metrics (if monetizing)
- **Conversion rate:** Free → Paid (if applicable)
- **ARPU:** Average revenue per user
- **LTV:** Lifetime value of a user
- **CAC:** Cost to acquire a customer
- **LTV:CAC ratio:** Should be >3:1

#### Technical Metrics
- **Uptime:** % of time app is accessible
- **Error rate:** % of sessions with errors
- **Load time:** P50, P90, P99 load times
- **Crash rate:** % of sessions with crashes

---

### Growth Strategies

#### Organic Growth
- **SEO:** Blog content about productivity, game design
- **Social Media:** Twitter, Reddit, ProductHunt
- **Content Marketing:** YouTube videos, tutorials
- **Press:** Reach out to productivity bloggers, gaming press

#### Partnerships
- **Productivity tools:** Partner with Notion, Todoist, etc.
- **Educational institutions:** Promote to students
- **Corporate wellness:** B2B for remote teams

#### Paid Acquisition (if budget allows)
- **Social ads:** Facebook, Instagram, TikTok
- **Search ads:** Google Ads for productivity keywords
- **Influencer marketing:** Productivity YouTubers, streamers

#### Viral Mechanics
- **Share your cafe:** Easy social sharing
- **Referral program:** Bonus rewards for inviting friends
- **Challenges:** Weekly challenges encourage social posting

---

## Risk Management

### High-Risk Areas

#### 1. User Retention
**Risk:** Users play for 1-2 days, then abandon.  
**Mitigation:**
- Strong onboarding and tutorial
- Progression hooks (upgrades, achievements)
- Social features (friends, leaderboards)
- Regular content updates (events, challenges)

#### 2. Game Balance
**Risk:** Too easy (boring) or too hard (frustrating).  
**Mitigation:**
- Extensive playtesting before launch
- Data-driven balance adjustments
- Difficulty options (easy, normal, hard modes)
- Steamy Mode for rapid iteration

#### 3. Technical Debt
**Risk:** Rush to ship MVP leads to unmaintainable code.  
**Mitigation:**
- Code reviews and standards
- Refactor time allocated in each sprint
- Comprehensive test coverage
- Document architectural decisions

#### 4. Scope Creep
**Risk:** Adding too many features, delaying MVP.  
**Mitigation:**
- Strict MVP definition (P0 features only)
- Phase-gate approach (validate before building more)
- Ruthless prioritization
- "Ice box" for future ideas

#### 5. Platform Dependencies
**Risk:** Browser/OS changes break the app.  
**Mitigation:**
- Follow web standards (avoid experimental APIs)
- Graceful degradation for unsupported features
- Regular testing on all platforms
- User agent detection for critical features

---

## Success Criteria by Phase

### Phase 1: MVP (Week 8)
- ✅ Core gameplay loop works end-to-end
- ✅ Users can complete 1+ pomodoro session
- ✅ Game is fun for at least 3-5 days of play
- ✅ No critical bugs in production
- Target: 100 users try the app in first week

### Phase 2: Depth (Week 16)
- ✅ Median play session increases to 5+ days
- ✅ 30%+ of users unlock upgrades
- ✅ D7 retention: 40%+ (vs 20% in MVP)
- Target: 1,000 active users

### Phase 3: Social (Week 22)
- ✅ 20%+ of users create accounts
- ✅ Leaderboards have 100+ active participants
- ✅ Social features increase retention by 15%+
- Target: 5,000 registered users

### Phase 4: Focus Suite (Week 28)
- ✅ 30%+ of users use to-do list feature
- ✅ Users report improved focus (survey: 7+/10)
- ✅ Average pomodoros per user increases by 20%
- Target: 10,000 active users

### Phase 5: Mobile (Week 36)
- ✅ Mobile apps: 10K+ downloads combined
- ✅ Performance: Lighthouse score 95+
- ✅ Uptime: 99.9% reliability
- Target: 50,000 total users across platforms

---

## Flexibility & Adaptation

This roadmap is a living document. Expected adjustments:

### After MVP Launch (Week 8)
- **Evaluate:** What do users love? What's confusing?
- **Pivot:** If core loop isn't fun, iterate before Phase 2
- **Data-driven:** Prioritize Phase 2 features based on usage

### After Phase 2 (Week 16)
- **Reassess:** Is depth improving retention?
- **Decide:** Proceed to Phase 3 or double-down on gameplay?

### Ongoing
- **User feedback:** Regularly incorporate user requests
- **Market changes:** Adapt to new productivity tools, competitors
- **Technology shifts:** Adopt better tools, frameworks as they mature

---

## Open Questions & Decisions Needed

### MVP Launch
- [ ] Launch date: Target specific date or "when ready"?
- [ ] Launch strategy: Soft launch vs big splash?
- [ ] Pricing model: Free forever? Freemium? Paid app?

### Post-MVP
- [ ] Backend provider: Firebase vs Supabase vs custom?
- [ ] Monetization: Cosmetics? Premium features? Ads? Donation?
- [ ] Team growth: When to hire (designer, developer)?

### Long-Term
- [ ] Vision: Productivity tool or game first?
- [ ] Platform strategy: Web-first or mobile-first?
- [ ] Business model: VC-backed growth or bootstrapped?

---

## Resources & Links

### Documentation
- Product Requirements: `/docs/01-product/PRD.md`
- Technical Architecture: `/docs/03-technical/architecture.md`
- Agent Guide: `/docs/08-agent-context/agent-guide.md`

### Tools
- Project Management: [Notion/Linear/Asana]
- Design: [Figma link]
- Code Repository: [GitHub link]
- Analytics: [PostHog/Mixpanel]

### Inspiration
- Habbo Hotel (aesthetic reference)
- Lively App (color palette)
- Forest App (timer gamification)
- Stardew Valley (cozy progression)

---

## Changelog

### v1.0 (Nov 22, 2025)
- Initial roadmap created
- MVP scope defined
- Phase 2-5 outlines planned
- Success criteria established

---

**Document Owner:** Product Team  
**Last Review:** November 22, 2025  
**Next Review:** After MVP launch (Week 8)

---

## Quick Reference: Next Steps

### This Week (Week 1)
1. ✅ Complete all planning documents
2. Finalize tech stack decisions
3. Create visual style guide
4. Set up repository and project structure

### Next Week (Week 2)
1. Project scaffolding and development environment
2. Design system foundation
3. First deployment (empty shell)
4. Team ready to start MVP development

### Week 3 (MVP Kickoff)
1. Begin core game logic implementation
2. Set up game state management
3. Write initial unit tests
4. Start designing UI components in Figma

**The journey begins! 🚀☕**
