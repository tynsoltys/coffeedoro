# Documentation Structure & Context Organization
**Pomodoro Cafe Project**

---

## Overview

This document outlines the recommended folder structure and documentation approach for organizing the Pomodoro Cafe project. Proper organization ensures that AI agents, developers, and team members can quickly find relevant context and maintain consistency across development phases.

---

## Recommended Directory Structure

```
pomodoro-cafe/
│
├── docs/                           # All documentation
│   ├── 01-product/                 # Product documentation
│   │   ├── PRD.md                  # Product Requirements (main)
│   │   ├── user-personas.md        # Target audience profiles
│   │   ├── competitive-analysis.md # Similar products analysis
│   │   ├── feature-specs/          # Detailed feature specifications
│   │   │   ├── timer-system.md
│   │   │   ├── game-simulation.md
│   │   │   ├── audio-system.md
│   │   │   └── steamy-mode.md
│   │   └── roadmap.md              # Phase-by-phase plan
│   │
│   ├── 02-design/                  # Design documentation
│   │   ├── design-system.md        # Design principles, tokens
│   │   ├── visual-style-guide.md   # Color, typography, spacing
│   │   ├── ui-components.md        # Component specifications
│   │   ├── wireframes/             # Low-fidelity layouts
│   │   ├── mockups/                # High-fidelity designs
│   │   │   ├── landing-page.png
│   │   │   ├── plan-phase.png
│   │   │   ├── timer-view.png
│   │   │   └── results-phase.png
│   │   ├── isometric-assets/       # Game art assets
│   │   │   ├── cafe-interior/
│   │   │   ├── characters/
│   │   │   └── items/
│   │   └── animation-specs.md      # Micro-interaction details
│   │
│   ├── 03-technical/               # Technical documentation
│   │   ├── architecture.md         # System architecture overview
│   │   ├── tech-stack.md           # Technology decisions & rationale
│   │   ├── data-models.md          # Game state schema, localStorage structure
│   │   ├── api-specs/              # API documentation (future)
│   │   ├── game-logic/             # Game mechanics documentation
│   │   │   ├── simulation-algorithm.md
│   │   │   ├── balance-tuning.md
│   │   │   └── random-events.md
│   │   ├── audio-implementation.md # Web Audio API usage
│   │   ├── performance.md          # Performance targets & optimization
│   │   └── security.md             # Security considerations
│   │
│   ├── 04-development/             # Development guides
│   │   ├── setup-guide.md          # How to set up dev environment
│   │   ├── coding-standards.md     # Style guide, conventions
│   │   ├── git-workflow.md         # Branching, commits, PRs
│   │   ├── testing-strategy.md     # Testing approach & frameworks
│   │   └── deployment.md           # Build & deployment process
│   │
│   ├── 05-game-design/             # Game design documentation
│   │   ├── core-loop.md            # Detailed gameplay loop
│   │   ├── progression-system.md   # How players advance
│   │   ├── balance-spreadsheet.xlsx # Game balance calculations
│   │   ├── difficulty-curve.md     # How game gets harder
│   │   ├── events-library.md       # All possible random events
│   │   └── narrative-beats.md      # Story elements (future)
│   │
│   ├── 06-research/                # Research & references
│   │   ├── user-research.md        # User interviews, surveys
│   │   ├── playtesting-notes/      # Feedback from testing sessions
│   │   ├── competitor-notes.md     # Notes on similar apps
│   │   └── inspiration/            # Screenshots, references
│   │       ├── habbo-hotel/
│   │       ├── lively-app/
│   │       └── game-references/
│   │
│   ├── 07-project-management/      # PM documentation
│   │   ├── sprint-plans/           # Sprint-by-sprint plans
│   │   ├── meeting-notes/          # Decision logs
│   │   ├── changelog.md            # Version history
│   │   └── retrospectives/         # Sprint retrospectives
│   │
│   └── 08-agent-context/           # AI agent instructions
│       ├── agent-guide.md          # This document
│       ├── common-tasks.md         # Frequent development tasks
│       ├── codebase-overview.md    # High-level code structure
│       └── design-tokens.json      # Colors, spacing for quick reference
│
├── src/                            # Source code
│   ├── components/                 # React components
│   │   ├── common/                 # Shared UI components
│   │   ├── game/                   # Game-specific components
│   │   │   ├── PlanPhase.jsx
│   │   │   ├── Timer.jsx
│   │   │   ├── Results.jsx
│   │   │   └── IsometricCafe.jsx
│   │   └── layout/                 # Layout components
│   │
│   ├── game/                       # Game logic (separate from UI)
│   │   ├── simulation.js           # Core game simulation
│   │   ├── economy.js              # Pricing, costs, revenue
│   │   ├── events.js               # Random events system
│   │   ├── reputation.js           # Reputation calculations
│   │   └── balance.js              # Game balance constants
│   │
│   ├── audio/                      # Audio system
│   │   ├── SoundManager.js         # Web Audio API wrapper
│   │   ├── ambient-tracks/         # Audio files
│   │   └── audio-config.js         # Volume, mixing settings
│   │
│   ├── utils/                      # Utility functions
│   │   ├── storage.js              # LocalStorage wrapper
│   │   ├── timer.js                # Pomodoro timer logic
│   │   ├── steamyMode.js           # Debug feature
│   │   └── helpers.js              # General utilities
│   │
│   ├── styles/                     # Global styles
│   │   ├── variables.css           # CSS custom properties
│   │   ├── typography.css          # Font styles
│   │   └── animations.css          # Shared animations
│   │
│   ├── assets/                     # Static assets
│   │   ├── images/
│   │   ├── sprites/
│   │   └── audio/
│   │
│   └── App.jsx                     # Main app component
│
├── tests/                          # Test files
│   ├── unit/                       # Unit tests
│   │   ├── game/
│   │   └── utils/
│   ├── integration/                # Integration tests
│   └── e2e/                        # End-to-end tests
│
├── public/                         # Public assets
│   └── index.html
│
├── .github/                        # GitHub-specific files
│   ├── workflows/                  # CI/CD workflows
│   └── ISSUE_TEMPLATE.md
│
├── README.md                       # Project overview
├── CONTRIBUTING.md                 # How to contribute
├── package.json
└── .gitignore
```

---

## Documentation Standards

### File Naming Conventions
- Use kebab-case for files: `user-personas.md`, `game-simulation.md`
- Date-stamp meeting notes: `2025-11-22-sprint-planning.md`
- Version mockups: `plan-phase-v2.png`, `timer-view-final.png`

### Markdown Best Practices
- Use headers hierarchically (H1 → H2 → H3)
- Include a table of contents for docs >500 words
- Link between related documents liberally
- Use code blocks with language specification
- Include last-updated date at top of document
- Use admonition blocks for important notes:
  ```markdown
  > **⚠️ Warning:** This feature is not yet implemented
  > **💡 Tip:** Consider using X instead of Y
  > **📝 Note:** Remember to update Z when changing this
  ```

### Document Templates

#### Feature Specification Template
```markdown
# Feature Name

**Status:** Draft | In Review | Approved | Implemented  
**Owner:** [Name]  
**Last Updated:** [Date]

## Overview
Brief description of the feature.

## User Stories
- As a [user type], I want [goal] so that [benefit]

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Design
[Link to mockups, wireframes]

## Technical Approach
High-level implementation plan

## Dependencies
What must be built first?

## Open Questions
- Question 1?
- Question 2?

## References
Links to related docs
```

#### Decision Record Template
```markdown
# Decision: [Title]

**Date:** [Date]  
**Status:** Proposed | Accepted | Deprecated

## Context
What problem are we solving?

## Options Considered
1. Option A: [pros/cons]
2. Option B: [pros/cons]

## Decision
We chose [option] because [rationale]

## Consequences
- Positive: [benefits]
- Negative: [tradeoffs]
- Neutral: [other impacts]
```

---

## AI Agent Context Files

To help AI agents work effectively, maintain these special context files:

### `/docs/08-agent-context/agent-guide.md`
```markdown
# Agent Working Guide

## Project Overview
[2-3 sentence summary of what Pomodoro Cafe is]

## Current Phase
MVP - [Brief status update]

## Quick Reference
- **Tech Stack:** React, [Canvas library], Web Audio API
- **Design System:** Isometric, Habbo-inspired, Lively palette
- **Key Feature:** Steamy mode activated by typing "pshhhhh"

## Common Tasks
1. **Adding a new game event:** See `/docs/05-game-design/events-library.md`
2. **Adjusting game balance:** Edit `/src/game/balance.js`
3. **Styling a component:** Reference `/docs/02-design/design-system.md`

## Code Patterns
[Examples of common patterns used in the codebase]

## Things to Remember
- Always use deterministic random events (seeded)
- Timer must continue running when tab is backgrounded
- Respect localStorage limits (keep game state lean)
- Maintain 60fps for animations
```

### `/docs/08-agent-context/codebase-overview.md`
```markdown
# Codebase Overview

## Architecture Pattern
[e.g., Component-based with separated game logic]

## Key Modules

### Game Logic (`/src/game/`)
- `simulation.js`: Core turn processor
- `economy.js`: Revenue, costs, pricing
- `events.js`: Random event system
- Purpose: Pure functions, no UI dependencies, fully testable

### UI Components (`/src/components/`)
- `PlanPhase.jsx`: Pre-pomodoro decision making
- `Timer.jsx`: Pomodoro countdown with audio
- `Results.jsx`: Post-pomodoro results screen
- Purpose: Presentational, call game logic for calculations

### State Management
[Describe approach: Context API, Redux, Zustand, etc.]

## Data Flow
User Action → Component → Game Logic → State Update → Re-render

## Important Files
- `/src/game/balance.js`: All game balance constants
- `/src/utils/storage.js`: Save/load game state
- `/src/styles/variables.css`: Design tokens
```

### `/docs/08-agent-context/design-tokens.json`
```json
{
  "colors": {
    "primary": "#E89B7B",
    "secondary": "#C88770",
    "background": "#FFF9F5",
    "text": "#4A3326",
    "success": "#A8C686",
    "warning": "#F4A460",
    "error": "#D97373"
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px"
  },
  "typography": {
    "fontFamily": "Inter, -apple-system, sans-serif",
    "fontSizeBase": "16px",
    "lineHeight": "1.5"
  },
  "borderRadius": {
    "sm": "4px",
    "md": "8px",
    "lg": "12px"
  },
  "animations": {
    "durationFast": "150ms",
    "durationNormal": "300ms",
    "durationSlow": "500ms",
    "easingDefault": "cubic-bezier(0.4, 0.0, 0.2, 1)"
  }
}
```

---

## Version Control Strategy

### Branch Naming
- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/[name]`: New features (e.g., `feature/steamy-mode`)
- `fix/[name]`: Bug fixes (e.g., `fix/timer-accuracy`)
- `docs/[name]`: Documentation updates
- `refactor/[name]`: Code refactoring

### Commit Message Format
```
type(scope): Brief description

- Detailed change 1
- Detailed change 2

[Optional: Closes #issue-number]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat(game): Add random weather events

- Implement weather system with rain/sun/cloudy
- Rain increases cafe visits by 20%
- Update results phase to show weather
- Add weather icons to UI

Closes #42
```

---

## Maintenance & Updates

### Regular Review Cycle
- **Weekly:** Update sprint plans, meeting notes
- **Sprint End:** Update roadmap, retrospectives
- **Post-Release:** Update changelog, version numbers
- **Monthly:** Review and archive outdated docs

### Documentation Debt
Track documentation needs in a `DOCS-TODO.md`:
```markdown
# Documentation TODO

## High Priority
- [ ] Complete game balance spreadsheet
- [ ] Document audio implementation details

## Medium Priority
- [ ] Add more code examples to agent guide
- [ ] Create video walkthrough of gameplay

## Low Priority
- [ ] Expand competitive analysis
- [ ] Document edge cases in simulation
```

### Keeping Context Fresh
- Archive old decisions to `/docs/archive/`
- Mark deprecated features clearly
- Update "last modified" dates
- Link to new docs from old ones with redirects

---

## Tools & Automation

### Recommended Tools
- **Markdown Preview:** VS Code with Markdown All in One extension
- **Diagramming:** Excalidraw, Mermaid, or Draw.io for architecture diagrams
- **Spreadsheets:** Google Sheets for game balance tuning
- **Screenshots:** Annotated screenshots for design feedback
- **Version Control:** Git with clear commit messages

### Documentation Generators
Consider adding:
- JSDoc for code documentation
- Storybook for component documentation
- API documentation generator (future, when backend exists)

---

## Tips for Working with AI Agents

### What to Include in Prompts
1. **Link to relevant docs:** "See `/docs/05-game-design/core-loop.md` for gameplay details"
2. **Specify phase:** "We're in MVP phase, keep it simple"
3. **Point to examples:** "Follow the pattern in `PlanPhase.jsx`"
4. **Reference design system:** "Use colors from `/docs/08-agent-context/design-tokens.json`"

### What Makes Good Context
- ✅ **Specific:** "The cafe ambiance should use Web Audio API's GainNode for volume control"
- ❌ **Vague:** "Make the sounds work"

- ✅ **Linked:** "This builds on the simulation algorithm described in `/docs/03-technical/game-logic/simulation-algorithm.md`"
- ❌ **Orphaned:** "Here's some code"

- ✅ **Rationale:** "We chose Canvas over CSS because [reason]"
- ❌ **Just facts:** "We use Canvas"

### Saving Agent Time
Maintain these quick-reference files so agents don't need to search:
- `design-tokens.json`: Colors, spacing, fonts
- `codebase-overview.md`: High-level code structure
- `common-tasks.md`: Step-by-step guides for frequent tasks

---

## Examples of Well-Organized Context

### Example 1: Game Balance Change
```
Agent needs to: Increase difficulty of Day 5+

Context files to reference:
1. /docs/05-game-design/difficulty-curve.md (understand intent)
2. /src/game/balance.js (make the change)
3. /docs/05-game-design/balance-spreadsheet.xlsx (validate math)
4. /tests/unit/game/economy.test.js (update tests)
```

### Example 2: New UI Component
```
Agent needs to: Create "Customer Feedback" component

Context files to reference:
1. /docs/02-design/mockups/results-phase.png (visual reference)
2. /docs/02-design/design-system.md (styling guidelines)
3. /src/components/common/ (existing component patterns)
4. /docs/08-agent-context/design-tokens.json (colors, spacing)
```

### Example 3: Bug Fix
```
Agent needs to: Fix timer not pausing on tab switch

Context files to reference:
1. /docs/03-technical/architecture.md (timer architecture)
2. /src/utils/timer.js (timer implementation)
3. /docs/07-project-management/known-issues.md (check if documented)
4. /tests/e2e/timer.test.js (write regression test)
```

---

## Conclusion

Good documentation structure is an investment that pays dividends across the project lifecycle. By organizing context logically and maintaining it consistently, you enable faster development, better collaboration, and more effective use of AI agents.

**Key Principles:**
1. **Findable:** Logical folder structure, clear naming
2. **Fresh:** Regular updates, archived old content
3. **Actionable:** Enough detail to implement, not just describe
4. **Connected:** Linked docs form a knowledge graph
5. **Agent-Friendly:** Special context files for AI assistance

---

**Last Updated:** November 22, 2025  
**Owner:** Project Team  
**Review Frequency:** Monthly or after major milestones
