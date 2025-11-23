# ☕ Coffeedoro

> *Brew focus, serve success*

A cozy coffee shop management game integrated with a Pomodoro timer. Work hard, play hard, and build your dream café during your breaks!

---

## 🎯 What is Coffeedoro?

Coffeedoro combines productivity and play by integrating a business simulation game with the proven Pomodoro Technique. Each work session earns you rewards in the game, and each break period becomes a fun game day where you run your coffee shop.

### Key Features

- ⏱️ **Customizable Pomodoro Timer** - Focus sessions with smart break management
- ☕ **Cozy Coffee Shop Game** - Run your own café, serve customers, unlock recipes
- 💰 **Reward Integration** - Work sessions earn in-game currency and bonuses
- 🎨 **Customization** - Decorate your shop, create signature drinks
- 📊 **Progress Tracking** - Statistics for both productivity and gameplay
- 🎵 **Ambient Audio** - Relaxing café sounds and lo-fi music
- 💾 **Local-First** - Your data stays on your machine, works offline

---

## 📚 Documentation

This repository contains comprehensive documentation for building Coffeedoro:

### Core Documents

| Document | Description |
|----------|-------------|
| **[PRD.md](./PRD.md)** | Product Requirements Document - What we're building and why |
| **[GAME_DESIGN.md](./GAME_DESIGN.md)** | Complete game mechanics, systems, and content |
| **[ROADMAP.md](./ROADMAP.md)** | Phased development plan from MVP to launch |
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** | Technical stack, architecture, and implementation details |

### Quick Navigation

**🤔 Want to understand the vision?** → Start with [PRD.md](./PRD.md)

**🎮 Curious about game mechanics?** → Read [GAME_DESIGN.md](./GAME_DESIGN.md)

**📅 Planning development?** → Check [ROADMAP.md](./ROADMAP.md)

**💻 Ready to code?** → Review [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## 🚀 Quick Start Guide

### For Players (Future)
Once released, you'll be able to:
1. Download Coffeedoro for your platform (Windows, macOS, Linux)
2. Install and launch the app
3. Start your first Pomodoro session
4. Build your coffee shop empire during breaks!

### For Developers

#### Prerequisites
- Node.js 18+ and npm
- Rust (for Tauri)
- Git

#### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/coffeedoro.git
cd coffeedoro

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run tauri build
```

---

## 🎯 Development Status

**Current Phase**: Phase 0 - Foundation & Planning ✅

- [x] Product Requirements Document
- [x] Game Design Document
- [x] Development Roadmap
- [x] Technical Architecture
- [ ] Technology stack implementation
- [ ] Core timer functionality
- [ ] Game prototype
- [ ] MVP launch

See [ROADMAP.md](./ROADMAP.md) for detailed milestones and timeline.

---

## 🎨 Design Philosophy

### What Makes Coffeedoro Special

1. **Respect for Time** - Designed around real break lengths, no time wasted
2. **Positive Reinforcement** - Work and play reward each other
3. **No Stress** - No fail states, no punishment, just progress
4. **Cozy Aesthetic** - Warm, inviting, relaxing atmosphere
5. **Privacy-First** - Local data, no tracking, you own your progress

### What We Avoid

- ❌ Manipulative mechanics or dark patterns
- ❌ Time pressure or stress-inducing gameplay
- ❌ Grinding or repetitive busywork
- ❌ Required internet connection
- ❌ Data collection or telemetry (without explicit opt-in)

---

## 📖 Game Overview

### The Timer Side

- **Work sessions** (default 25 minutes) - Focus on your tasks
- **Short breaks** (5 minutes) - Quick coffee shop game sessions
- **Long breaks** (15-30 minutes) - Extended gameplay and upgrades
- **Statistics** - Track your productivity and growth

### The Game Side

- **Daily Cycles** - Each break period = one game day
- **Resource Management** - Buy ingredients, manage inventory
- **Customer Service** - Serve drinks, earn money, build reputation
- **Shop Building** - Upgrade equipment, unlock recipes, customize décor
- **Progression** - Level up from neighborhood secret to renowned café

---

## 🛠️ Technology Stack

- **Desktop Framework**: Tauri (Rust + Web)
- **Frontend**: React 18+ with TypeScript
- **Game Rendering**: PixiJS v7
- **State Management**: Zustand
- **Styling**: Tailwind CSS + Framer Motion
- **Build Tool**: Vite
- **Audio**: Howler.js

See [ARCHITECTURE.md](./ARCHITECTURE.md) for complete technical details.

---

## 🤝 Contributing

**Status**: Not yet accepting contributions

Once we reach MVP and open-source the codebase, we'd love contributions! Areas we'll need help:

- 🎨 Art & Design (sprites, UI elements, themes)
- 🎵 Audio (music tracks, sound effects)
- 🌍 Translations (i18n support)
- 🐛 Bug reports and testing
- 💡 Feature ideas and feedback
- 📝 Documentation improvements

---

## 📝 License

**Status**: To be determined

Considering MIT or GPL-3.0 for open-source release.

---

## 🗺️ Roadmap Highlights

### MVP (Weeks 1-15)
- ✅ Complete documentation
- ⏳ Core timer functionality
- ⏳ Basic game loop (buy → sell → upgrade)
- ⏳ 15 recipes, 10 upgrades
- ⏳ Save/load system
- ⏳ Polish and testing

### Version 1.1+ (Post-MVP)
- Enhanced customization (themes, décor)
- Regular customers with stories
- Seasonal events and challenges
- Advanced statistics and analytics

### Version 2.0+ (Future)
- Achievement system
- Recipe creation
- Mod support
- Mobile companion app
- Cloud sync (optional, encrypted)

See [ROADMAP.md](./ROADMAP.md) for complete timeline.

---

## 💭 Philosophy & Inspiration

Coffeedoro is inspired by:

- **Lemonade Stand** (1973) - The classic resource management game
- **Coffee Talk** (2020) - Cozy coffee shop vibes
- **Stardew Valley** - Meaningful progression without pressure
- **Animal Crossing** - Daily engagement, personalization
- **Forest App** - Gamifying focus time
- **Pomodoro Technique** - Proven productivity method

We believe productivity tools should be delightful, not demanding. Work hard, rest well, and enjoy the journey.

---

## 📬 Contact & Community

**Project Status**: Early development, documentation phase

**Future plans**:
- Discord community
- Newsletter for updates
- Social media (@coffeedoro)
- Developer blog

---

## 🙏 Acknowledgments

Created with love for:
- Productivity enthusiasts who need engaging breaks
- Cozy game fans looking for bite-sized experiences
- Anyone who wants their work and play to coexist harmoniously

Special thanks to the creators of the Pomodoro Technique and all the indie game developers who inspired this project.

---

## 📚 Additional Resources

### For Product Planning
- [User Personas](./PRD.md#target-audience) - Who we're building for
- [Success Metrics](./PRD.md#success-metrics) - How we measure success
- [Feature Prioritization](./PRD.md#core-features) - What's essential vs. nice-to-have

### For Game Design
- [Gameplay Loop](./GAME_DESIGN.md#gameplay-loop) - Core game mechanics
- [Progression System](./GAME_DESIGN.md#progression-systems) - How players advance
- [Content Breakdown](./GAME_DESIGN.md#content--features) - All recipes, upgrades, etc.

### For Development
- [Phase Breakdown](./ROADMAP.md#development-phases) - Week-by-week plan
- [Tech Stack Decisions](./ARCHITECTURE.md#technology-stack) - Why we chose each tool
- [Data Models](./ARCHITECTURE.md#data-models) - Complete TypeScript interfaces

---

**Happy brewing! ☕**

*This project is in active development. Star the repo to follow our progress!*
