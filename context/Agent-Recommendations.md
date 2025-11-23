# AI Agent Recommendations for Pomodoro Cafe
**Development Phase Guide**

---

## Overview

This document provides recommendations for effectively leveraging AI agents (Claude, GPT-4, specialized tools) throughout different phases of Pomodoro Cafe development. Each phase has unique requirements that benefit from specific agent capabilities and prompting strategies.

---

## Table of Contents

1. [Agent Capabilities Matrix](#agent-capabilities-matrix)
2. [Phase-by-Phase Agent Usage](#phase-by-phase-agent-usage)
3. [Task-Specific Agent Recommendations](#task-specific-agent-recommendations)
4. [Effective Prompting Strategies](#effective-prompting-strategies)
5. [Context Management](#context-management)
6. [Common Pitfalls & Solutions](#common-pitfalls--solutions)

---

## Agent Capabilities Matrix

| Capability | Claude Sonnet 4 | Claude Opus 4 | Specialized Use Cases |
|------------|----------------|---------------|----------------------|
| **Product Strategy** | ✅✅✅ Excellent | ✅✅✅ Excellent | PRDs, user stories, roadmaps |
| **Technical Architecture** | ✅✅✅ Excellent | ✅✅✅ Excellent | System design, data modeling |
| **Code Generation** | ✅✅ Very Good | ✅✅✅ Excellent | Complex logic, full features |
| **Code Review** | ✅✅✅ Excellent | ✅✅ Very Good | Identifying issues, best practices |
| **Game Design** | ✅✅✅ Excellent | ✅✅✅ Excellent | Balance, mechanics, progression |
| **UI/UX Design** | ✅✅ Very Good | ✅✅ Very Good | Wireframes, user flows |
| **Content Writing** | ✅✅✅ Excellent | ✅✅✅ Excellent | Documentation, marketing |
| **Testing Strategy** | ✅✅✅ Excellent | ✅✅ Very Good | Test planning, edge cases |
| **Data Analysis** | ✅✅ Very Good | ✅✅✅ Excellent | Balance tuning, metrics |
| **Speed** | ✅✅✅ Fastest | ✅✅ Slower | Quick iterations vs depth |
| **Context Window** | 200K tokens | 200K tokens | Both handle full project context |

**Recommendation:** Use Claude Sonnet 4 for most tasks (fast, cost-effective). Use Claude Opus 4 for complex features, critical architecture decisions, or when you need maximum reasoning depth.

---

## Phase-by-Phase Agent Usage

### Phase 0: Planning & Documentation (Current Phase)

#### Primary Agent: Claude Sonnet 4
**Why:** Excellent at structured thinking, documentation, and strategic planning.

#### Key Tasks
1. **Product Requirements**
   - ✅ Already completed
   - Agent strength: Translating vision into actionable specs

2. **Technical Planning**
   - **Agent role:** Architecture decisions, tech stack recommendations
   - **Prompt strategy:**
     ```
     "I'm building Pomodoro Cafe (see PRD.md). Recommend a tech stack for:
     - Isometric game rendering (Canvas vs SVG vs WebGL)
     - State management (Context API vs Redux vs Zustand)
     - Audio system implementation
     
     Consider: MVP scope, performance needs, learning curve."
     ```

3. **Game Balance Design**
   - **Agent role:** Create initial balance spreadsheet, tune difficulty curve
   - **Prompt strategy:**
     ```
     "Design game balance for Pomodoro Cafe cafe sim (see PRD.md).
     Create a spreadsheet with:
     - Starting money, costs, revenue
     - Difficulty progression (Day 1-30)
     - Event probabilities
     
     Goal: Challenging but fair, encourages experimentation."
     ```

4. **Visual Style Guide**
   - **Agent role:** Expand on Habbo + Lively inspiration, create detailed design system
   - **Prompt strategy:**
     ```
     "Based on the PRD's visual direction (Habbo Hotel isometric + Lively app palette),
     create a detailed design system including:
     - Color palette (hex codes)
     - Typography scale
     - Spacing system
     - Component styling guidelines
     
     Emphasize: Cozy, warm, nostalgic but modern."
     ```

---

### Phase 1: MVP Development

#### Primary Agent: Claude Sonnet 4 (speed) + Opus 4 (critical features)
**Why:** Need fast iteration for UI, careful reasoning for game logic.

#### Week 1: Foundation & Setup

**Agent Tasks:**
1. **Project Setup**
   ```
   Agent: Sonnet 4
   Task: "Create a React + Vite project structure for Pomodoro Cafe.
   Include: folder structure (see docs/), ESLint config, basic routing."
   ```

2. **Design System Implementation**
   ```
   Agent: Sonnet 4
   Task: "Implement design tokens from design-tokens.json as CSS variables.
   Create base component library: Button, Card, Modal, Input."
   ```

3. **LocalStorage Wrapper**
   ```
   Agent: Sonnet 4
   Task: "Create a localStorage wrapper for saving/loading game state.
   Include: error handling, versioning, export/import functionality."
   ```

#### Week 2: Core Game Logic

**Agent Tasks:**
1. **Game Simulation Engine** ⚠️ Use Opus 4
   ```
   Agent: Opus 4 (complex logic)
   Task: "Implement the core game simulation in /src/game/simulation.js.
   
   Context: See /docs/05-game-design/core-loop.md
   
   Requirements:
   - Deterministic simulation based on player choices
   - Customer demand algorithm (price sensitivity, reputation)
   - Revenue/cost calculations
   - Reputation updates
   - Random events (seeded randomness)
   
   Return: Well-tested, pure functions with clear interfaces."
   ```

2. **Balance Constants**
   ```
   Agent: Sonnet 4
   Task: "Create /src/game/balance.js with all game constants from balance spreadsheet.
   Make it easy to tweak without touching logic."
   ```

3. **Game State Management**
   ```
   Agent: Sonnet 4
   Task: "Set up game state management (recommend Zustand for simplicity).
   State includes: player money, inventory, reputation, day number, settings."
   ```

#### Week 3: UI Implementation

**Agent Tasks:**
1. **Landing Page**
   ```
   Agent: Sonnet 4
   Task: "Create landing page component with hero, CTA, config modal.
   Reference: /docs/02-design/mockups/landing-page.png
   Use design tokens from /docs/08-agent-context/design-tokens.json"
   ```

2. **Plan Phase Screen**
   ```
   Agent: Sonnet 4
   Task: "Create PlanPhase component (inventory purchase, pricing, cafe view).
   Should call game simulation functions for cost calculations.
   Reference: /docs/01-product/feature-specs/plan-phase.md"
   ```

3. **Isometric Cafe Visualization**
   ```
   Agent: Opus 4 (complex rendering)
   Task: "Create isometric cafe view using [Canvas library TBD].
   Should display: cafe interior, inventory items, visual indicators.
   Style: Habbo Hotel aesthetic, cozy and inviting."
   ```

#### Week 4: Timer & Results

**Agent Tasks:**
1. **Pomodoro Timer** ⚠️ Use Opus 4
   ```
   Agent: Opus 4 (critical feature)
   Task: "Implement pomodoro timer with:
   - Accurate countdown (Web Workers if needed for background tabs)
   - Progress circle visualization
   - Browser notification on completion
   - Respects user-configured duration
   
   Critical: Timer must be reliable even when tab is inactive."
   ```

2. **Audio System**
   ```
   Agent: Sonnet 4
   Task: "Create audio system using Web Audio API.
   Features: Multiple layers (cafe, rain), individual volume controls, cross-fading.
   Reference: /docs/03-technical/audio-implementation.md"
   ```

3. **Results Screen**
   ```
   Agent: Sonnet 4
   Task: "Create Results component with animated reveal of:
   - Sales summary, customer feedback, reputation change
   - Connect to game simulation for calculations
   - Reference: /docs/02-design/mockups/results-phase.png"
   ```

#### Week 5: Polish & Testing

**Agent Tasks:**
1. **Steamy Mode Implementation**
   ```
   Agent: Sonnet 4
   Task: "Add 'steamy mode' debug feature:
   - Listen for 'pshhhhh' keyboard input on Plan Phase
   - Toggle mode (indicator in UI)
   - When active, 'Start Day' button skips timer, shows instant results
   - Persists in localStorage"
   ```

2. **Testing Suite**
   ```
   Agent: Opus 4 (comprehensive test design)
   Task: "Create comprehensive test suite:
   - Unit tests for game logic (/src/game/)
   - Integration tests for game flow
   - E2E tests for critical path (onboarding → first day → results)
   
   Use Vitest + React Testing Library + Playwright."
   ```

3. **Responsive Design**
   ```
   Agent: Sonnet 4
   Task: "Make all components responsive (mobile-first).
   Breakpoints: 640px (mobile), 768px (tablet), 1024px (desktop).
   Test on Chrome DevTools device emulator."
   ```

---

### Phase 2: Post-MVP Enhancements

#### Primary Agent: Sonnet 4 for features, Opus 4 for complex systems
**Why:** Building on solid foundation, adding depth.

#### Month 2: Depth & Progression

**Agent Tasks:**
1. **Upgrade System**
   ```
   Agent: Sonnet 4
   Task: "Design and implement cafe upgrade system:
   - Equipment upgrades (espresso machine tiers)
   - Decor improvements (tables, chairs, art)
   - Staff hiring (baristas with unique traits)
   
   Include: Unlock conditions, cost scaling, impact on gameplay."
   ```

2. **Achievement System**
   ```
   Agent: Sonnet 4
   Task: "Create achievement system with:
   - 20-30 achievements (sales milestones, special events, challenges)
   - Progress tracking, notification on unlock
   - Achievement browser UI
   
   Examples: 'Served 100 customers', 'Survived rainy week', 'Perfect day'"
   ```

3. **Expanded Events Library**
   ```
   Agent: Opus 4 (complex narrative design)
   Task: "Expand random events from 5 to 30+.
   Include: Story events, challenges, opportunities, disasters.
   Ensure variety, balance impact, some should chain together."
   ```

#### Month 3: Social & Persistence

**Agent Tasks:**
1. **Backend Architecture**
   ```
   Agent: Opus 4 (architecture decision)
   Task: "Design backend architecture for user accounts, cloud saves, leaderboards.
   Recommend: Node.js + Express + PostgreSQL vs Firebase vs Supabase.
   Consider: Cost, scalability, auth, ease of integration."
   ```

2. **User Authentication**
   ```
   Agent: Sonnet 4
   Task: "Implement user authentication (recommend Firebase Auth or Clerk).
   Features: Email/password, Google OAuth, guest → registered user migration."
   ```

3. **Leaderboards**
   ```
   Agent: Sonnet 4
   Task: "Create leaderboards (most profitable cafe, longest streak).
   Update daily, show top 100, highlight user's rank, cheat detection."
   ```

---

### Phase 3: Focus Suite Integration

#### Primary Agent: Sonnet 4 + Opus for complex integrations
**Why:** Integrating external tools requires careful API work.

**Agent Tasks:**
1. **To-Do List UI**
   ```
   Agent: Sonnet 4
   Task: "Design and implement integrated to-do list:
   - Create/edit/complete tasks
   - Priority levels (Eisenhower matrix)
   - Link tasks to pomodoros (tag focus areas)
   - Simple, non-intrusive design"
   ```

2. **Todoist/Notion Integration**
   ```
   Agent: Opus 4 (complex OAuth flow)
   Task: "Integrate with Todoist API:
   - OAuth authentication
   - Fetch today's tasks
   - Mark tasks complete from app
   - Two-way sync strategy
   
   Reference: Todoist API docs (provide link)."
   ```

3. **Focus Analytics**
   ```
   Agent: Sonnet 4
   Task: "Create focus analytics dashboard:
   - Total pomodoros completed (daily/weekly/all-time)
   - Focus streaks, patterns
   - Most productive times of day
   - Correlate with game progress (does better cafe = more focus?)"
   ```

---

## Task-Specific Agent Recommendations

### Code Generation Tasks

| Task Type | Recommended Agent | Notes |
|-----------|------------------|-------|
| **Simple UI Components** | Sonnet 4 | Fast, handles repetitive code well |
| **Complex Game Logic** | Opus 4 | Better reasoning for edge cases |
| **API Integrations** | Opus 4 | Handles OAuth, error handling thoughtfully |
| **Styling/CSS** | Sonnet 4 | Quick iterations, good with design tokens |
| **Test Writing** | Opus 4 | Thinks through edge cases, comprehensive |
| **Refactoring** | Sonnet 4 | Good at extracting patterns, DRY |
| **Performance Optimization** | Opus 4 | Deep analysis of bottlenecks |
| **Bug Fixes** | Sonnet 4 (simple), Opus 4 (complex) | Context matters |

### Design Tasks

| Task Type | Recommended Agent | Notes |
|-----------|------------------|-------|
| **Wireframes** | Sonnet 4 | Fast iterations, ASCII art or Excalidraw |
| **Component Specs** | Sonnet 4 | Detailed prop definitions, variants |
| **Color Palettes** | Sonnet 4 | Good with hex codes, harmony |
| **Animation Specs** | Sonnet 4 | Timing, easing, keyframes |
| **Accessibility Audit** | Opus 4 | Comprehensive WCAG checks |
| **User Flow Diagrams** | Sonnet 4 | Mermaid diagrams, clear logic |

### Documentation Tasks

| Task Type | Recommended Agent | Notes |
|-----------|------------------|-------|
| **API Documentation** | Sonnet 4 | JSDoc, clear parameter descriptions |
| **User Guides** | Sonnet 4 | Friendly, step-by-step |
| **Architecture Docs** | Opus 4 | Deep system understanding |
| **Onboarding Tutorials** | Sonnet 4 | Beginner-friendly, concise |
| **README Files** | Sonnet 4 | Quick, effective |
| **Code Comments** | Sonnet 4 | Inline documentation |

---

## Effective Prompting Strategies

### The Context-Task-Constraints Framework

**Best Practice Template:**
```
[CONTEXT]
I'm building [project] (see [relevant docs]).
Current phase: [MVP/Phase 2/etc.]

[TASK]
I need you to [specific task].

[CONSTRAINTS]
- Must follow [design system/code patterns]
- Should integrate with [existing code]
- Performance requirement: [metric]
- Deadline: [timeframe]

[OPTIONAL: EXAMPLES]
Similar to [reference code/design].

[OUTPUT FORMAT]
Return: [code/doc/plan/etc.] with [specific requirements].
```

### Example: Good vs Bad Prompts

#### ❌ Bad Prompt
```
"Create a timer component for my app."
```
**Why bad:** No context, vague requirements, agent will make assumptions.

#### ✅ Good Prompt
```
"Create a Pomodoro timer component for Pomodoro Cafe (see /docs/01-product/PRD.md).

Requirements:
- Countdown from user-configured duration (5-60 min)
- Circular progress indicator using CSS/SVG
- Runs in background when tab is inactive (use Web Worker if needed)
- Shows browser notification on completion
- Integrates with audio system (/src/audio/SoundManager.js)

Style: Follow design tokens (/docs/08-agent-context/design-tokens.json).
Reference: /docs/02-design/mockups/timer-view.png

Return: React component + Web Worker (if needed) + unit tests."
```
**Why good:** Clear context, specific requirements, links to references, defines success.

---

### Iterative Prompting Strategy

**Don't ask for everything at once.** Break complex features into steps:

#### Example: Building the Game Simulation

**Step 1: Design**
```
"Design the game simulation algorithm for Pomodoro Cafe.
Define: input parameters, calculation steps, output structure.
Return: Pseudocode + data flow diagram."
```

**Step 2: Implementation**
```
"Implement the simulation algorithm from the design (see above).
Create pure functions in /src/game/simulation.js.
Include JSDoc comments, clear variable names."
```

**Step 3: Testing**
```
"Write comprehensive unit tests for simulation.js.
Cover: edge cases (zero inventory, bankruptcy), typical days, events.
Use Vitest, aim for >90% coverage."
```

**Step 4: Optimization**
```
"Review simulation.js for performance bottlenecks.
Should run <10ms on mid-range devices.
Suggest optimizations without changing behavior."
```

---

### Providing Context Efficiently

#### Use Project Context Files
```
"See project overview: /docs/08-agent-context/agent-guide.md
Design system: /docs/08-agent-context/design-tokens.json
Code patterns: /docs/08-agent-context/codebase-overview.md"
```

#### Link Specific Docs
```
"Game balance details: /docs/05-game-design/balance-spreadsheet.xlsx
Current implementation: /src/game/economy.js
Related test: /tests/unit/game/economy.test.js"
```

#### Use Inline Context When Necessary
If docs don't exist yet:
```
"The game uses a reputation system (0-100 scale):
- Starts at 50
- +5 for satisfied customer, -10 for stock-out
- Affects customer volume: base_customers * (reputation / 50)"
```

---

## Context Management

### For Long Development Sessions

**Problem:** Agent loses context after many turns.
**Solution:** Periodically re-ground with project summary.

**Mid-Session Refresh Prompt:**
```
"Quick context refresh:
- Project: Pomodoro Cafe (productivity + cafe sim game)
- Phase: MVP Week 3, building UI components
- Last completed: Landing page, now working on Plan Phase
- Tech stack: React + Vite + Zustand + Canvas
- Design: Isometric Habbo Hotel style, Lively palette

Continue with [next task]."
```

### Managing Multiple Features

**Use Feature Branches in Mind:**
```
"We're now working on Feature: Audio System (separate from timer work).
Context: /docs/03-technical/audio-implementation.md
Current status: Basic structure done, need cross-fade logic."
```

### Handling Breaking Changes

**Alert Agent to Impacts:**
```
"⚠️ We refactored game state management from Context API to Zustand.
Update your imports: import useGameStore from '@/store/gameStore'
See new patterns: /src/store/gameStore.js"
```

---

## Common Pitfalls & Solutions

### Pitfall 1: Agent Hallucinates Non-Existent Files
**Symptom:** Agent references files that don't exist yet.
**Solution:** 
```
"Current codebase structure:
/src/components/ - [list actual files]
/src/game/ - [list actual files]

Only reference existing files. If you need new files, explicitly state 'Create new file: [path]'."
```

### Pitfall 2: Agent Suggests Overengineering
**Symptom:** Recommends complex patterns for simple MVP features.
**Solution:**
```
"Remember: We're in MVP phase. Prefer simple solutions.
Example: Use React Context, not Redux (for now).
We can refactor later if needed."
```

### Pitfall 3: Agent Ignores Design System
**Symptom:** Generated components don't match visual style.
**Solution:**
```
"CRITICAL: All components MUST use design tokens from design-tokens.json.
No hardcoded colors, spacing, or fonts.
Import: import './styles/variables.css' or use styled-components with theme."
```

### Pitfall 4: Agent Writes Untestable Code
**Symptom:** Tight coupling, side effects everywhere.
**Solution:**
```
"Code requirements:
- Pure functions for game logic (no side effects)
- Separate UI from business logic
- Dependency injection for testability
- Example: Pass game state as parameter, not global access."
```

### Pitfall 5: Inconsistent Code Style
**Symptom:** Different patterns across features.
**Solution:**
```
"Follow existing patterns in codebase.
Example component structure: /src/components/game/PlanPhase.jsx
Example game logic: /src/game/simulation.js
Consistency > cleverness."
```

---

## Advanced Agent Techniques

### Technique 1: Self-Review Prompting
**After agent generates code:**
```
"Review the code you just wrote for:
1. Edge cases missed
2. Performance issues
3. Accessibility concerns
4. Potential bugs

Suggest improvements."
```

### Technique 2: Incremental Complexity
**For complex features:**
```
"Let's build this in stages:
Stage 1: Basic functionality (no edge cases)
Stage 2: Error handling
Stage 3: Optimizations
Stage 4: Polish

Start with Stage 1. I'll prompt for each stage."
```

### Technique 3: Rubber Duck Debugging
**When stuck:**
```
"Explain the bug I'm experiencing as if teaching someone.
Walk through: expected behavior, actual behavior, hypothesis for cause.
Then suggest debugging steps."
```

### Technique 4: Code Archaeology
**Understanding existing code:**
```
"Analyze /src/game/simulation.js:
1. What's the high-level purpose?
2. What are the key functions and their roles?
3. What are the implicit assumptions?
4. Where are potential bugs or improvements?

Help me understand before we modify."
```

---

## Agent-Specific Tips

### Claude Sonnet 4
**Strengths:**
- Fast iterations for UI components
- Excellent at following patterns
- Great for documentation
- Cost-effective for high-volume tasks

**Best for:**
- Creating multiple similar components
- Writing tests based on existing patterns
- Refactoring for DRY
- Documentation updates

**Prompting tip:** Provide clear examples, it learns patterns quickly.

### Claude Opus 4
**Strengths:**
- Deep reasoning for complex logic
- Better at anticipating edge cases
- Excellent architecture decisions
- Handles ambiguity well

**Best for:**
- Core game simulation logic
- Complex integrations (OAuth, external APIs)
- Performance optimization
- Security-sensitive code

**Prompting tip:** Give it harder problems, don't over-specify, let it think.

---

## Checklist: Before Asking Agent for Help

- [ ] Have I clearly defined the task?
- [ ] Have I linked relevant documentation?
- [ ] Have I specified constraints (performance, design, patterns)?
- [ ] Have I provided examples or references?
- [ ] Have I indicated which existing code to integrate with?
- [ ] Have I specified the output format?
- [ ] Is this the right agent for this task (Sonnet vs Opus)?

---

## Measuring Agent Effectiveness

Track these metrics to improve your agent usage:
- **First-try success rate:** How often does generated code work without modification?
- **Iteration count:** How many back-and-forth turns to complete a task?
- **Bug rate:** How many bugs in agent-generated code make it to production?
- **Time saved:** Estimated time saved vs hand-coding

**Goal:** Increase success rate, decrease iterations, maintain low bug rate.

---

## Conclusion

Effective use of AI agents is a skill. Key principles:

1. **Right agent for right task:** Sonnet for speed, Opus for complexity
2. **Context is king:** Always link relevant docs
3. **Iterate incrementally:** Build complex features in stages
4. **Follow patterns:** Maintain consistency with existing code
5. **Review critically:** AI is a tool, not a replacement for judgment

By following these guidelines, you'll maximize productivity while maintaining code quality throughout Pomodoro Cafe's development.

---

**Last Updated:** November 22, 2025  
**Next Review:** After MVP completion  
**Maintainer:** Development Team
