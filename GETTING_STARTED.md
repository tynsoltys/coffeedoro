# Getting Started with Coffeedoro Development

Welcome! This guide will help you go from the current documentation phase to actually building Coffeedoro.

---

## 📋 Where You Are Now

You've completed **Phase 0: Foundation & Planning** ✅

You have:
- ✅ Complete Product Requirements Document
- ✅ Detailed Game Design Document
- ✅ Development Roadmap with milestones
- ✅ Technical Architecture specification

**Next up**: Phase 1 - Core Timer Implementation

---

## 🎯 Your Next Steps

### Step 1: Set Up Your Development Environment

#### Install Required Tools

1. **Node.js and npm**
   ```bash
   # Check if installed
   node --version  # Should be 18 or higher
   npm --version

   # If not installed, download from: https://nodejs.org/
   ```

2. **Rust (for Tauri)**
   ```bash
   # macOS/Linux
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

   # Windows
   # Download from: https://www.rust-lang.org/tools/install

   # Verify installation
   rustc --version
   cargo --version
   ```

3. **Tauri Prerequisites**

   **macOS:**
   ```bash
   xcode-select --install
   ```

   **Linux (Ubuntu/Debian):**
   ```bash
   sudo apt update
   sudo apt install libwebkit2gtk-4.0-dev \
     build-essential \
     curl \
     wget \
     file \
     libssl-dev \
     libgtk-3-dev \
     libayatana-appindicator3-dev \
     librsvg2-dev
   ```

   **Windows:**
   - Install Microsoft Visual Studio C++ Build Tools
   - Install WebView2 (usually pre-installed on Windows 11)

#### Initialize the Project

```bash
# You're already in the coffeedoro directory
cd /home/user/coffeedoro

# Initialize a new Tauri + React + TypeScript project
npm create tauri-app@latest . -- --template react-ts

# This will scaffold the project structure
# Choose:
# - Package manager: npm
# - Template: react-ts
```

**Alternative if directory conflicts occur:**
```bash
# Create in a temp directory first
npm create tauri-app@latest coffeedoro-temp -- --template react-ts

# Move files to current directory
mv coffeedoro-temp/* .
mv coffeedoro-temp/.* .  # Move hidden files
rm -rf coffeedoro-temp
```

#### Install Dependencies

```bash
# Install project dependencies
npm install

# Install additional dependencies we'll need
npm install zustand
npm install @pixi/react pixi.js
npm install tailwindcss postcss autoprefixer
npm install framer-motion
npm install howler
npm install @types/howler -D

# Initialize Tailwind CSS
npx tailwindcss init -p
```

---

### Step 2: Configure Your Project

#### Update `package.json`

Add these scripts:
```json
{
  "scripts": {
    "dev": "tauri dev",
    "build": "tauri build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\""
  }
}
```

#### Set Up Tailwind CSS

Edit `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cozy coffee shop palette
        'coffee': {
          50: '#f8f5f2',
          100: '#e8dfd6',
          200: '#d4c2b0',
          300: '#bfa589',
          400: '#a88968',
          500: '#8b6f47',
          600: '#6f5939',
          700: '#54432c',
          800: '#3a2e1f',
          900: '#211a12',
        },
        'cream': '#faf7f2',
        'espresso': '#2d1b12',
      },
      fontFamily: {
        'display': ['Poppins', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
```

Add to `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-cream text-espresso font-body;
  }
}
```

---

### Step 3: Create Initial Project Structure

```bash
# Create directory structure
mkdir -p src/timer/{components,hooks,store}
mkdir -p src/game/{components,engine,store}
mkdir -p src/shared/{components,hooks,utils,types,services}
mkdir -p src/stores
mkdir -p public/assets/{images,audio,fonts}
```

---

### Step 4: Start with Phase 1 - Core Timer

#### Create the Timer Store

Create `src/stores/timerStore.ts`:
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TimerSettings {
  workDuration: number;      // in seconds
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
  autoStartBreaks: boolean;
  autoStartWork: boolean;
}

interface TimerState {
  mode: 'work' | 'shortBreak' | 'longBreak' | 'idle';
  duration: number;
  elapsed: number;
  isRunning: boolean;
  sessionCount: number;
  settings: TimerSettings;
}

interface TimerActions {
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  tick: () => void;
  updateSettings: (settings: Partial<TimerSettings>) => void;
}

const DEFAULT_SETTINGS: TimerSettings = {
  workDuration: 25 * 60,
  shortBreakDuration: 5 * 60,
  longBreakDuration: 15 * 60,
  longBreakInterval: 4,
  autoStartBreaks: false,
  autoStartWork: false,
};

export const useTimerStore = create<TimerState & TimerActions>()(
  persist(
    (set, get) => ({
      mode: 'idle',
      duration: DEFAULT_SETTINGS.workDuration,
      elapsed: 0,
      isRunning: false,
      sessionCount: 0,
      settings: DEFAULT_SETTINGS,

      start: () => set({ isRunning: true, mode: 'work' }),
      pause: () => set({ isRunning: false }),
      resume: () => set({ isRunning: true }),
      reset: () => set({ elapsed: 0, isRunning: false, mode: 'idle' }),

      tick: () => {
        const state = get();
        if (!state.isRunning) return;

        const newElapsed = state.elapsed + 1;

        if (newElapsed >= state.duration) {
          // Session complete!
          set({ elapsed: 0, isRunning: false });
          // TODO: Handle session completion, notifications, etc.
        } else {
          set({ elapsed: newElapsed });
        }
      },

      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        })),
    }),
    {
      name: 'coffeedoro-timer',
      partialize: (state) => ({
        sessionCount: state.sessionCount,
        settings: state.settings,
      }),
    }
  )
);
```

#### Create the Timer Component

Create `src/timer/components/TimerView.tsx`:
```typescript
import { useEffect } from 'react';
import { useTimerStore } from '../../stores/timerStore';

export function TimerView() {
  const { mode, duration, elapsed, isRunning, start, pause, resume, reset, tick } = useTimerStore();

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, tick]);

  const remaining = duration - elapsed;
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-coffee-50 to-coffee-100">
      <div className="text-center">
        <h1 className="text-4xl font-display font-bold mb-8 text-coffee-800">
          ☕ Coffeedoro
        </h1>

        <div className="bg-white rounded-3xl shadow-2xl p-12 mb-8">
          <div className="text-6xl font-bold text-coffee-700 mb-4">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>

          <div className="text-sm text-coffee-500 uppercase tracking-wider mb-6">
            {mode === 'work' ? '🎯 Focus Time' : mode === 'idle' ? 'Ready to Start' : '☕ Break Time'}
          </div>

          <div className="w-64 h-2 bg-coffee-200 rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-coffee-500 transition-all duration-1000"
              style={{ width: `${(elapsed / duration) * 100}%` }}
            />
          </div>

          <div className="flex gap-4 justify-center">
            {!isRunning && elapsed === 0 && (
              <button
                onClick={start}
                className="px-8 py-3 bg-coffee-600 text-white rounded-lg hover:bg-coffee-700 transition"
              >
                Start
              </button>
            )}

            {isRunning && (
              <button
                onClick={pause}
                className="px-8 py-3 bg-coffee-400 text-white rounded-lg hover:bg-coffee-500 transition"
              >
                Pause
              </button>
            )}

            {!isRunning && elapsed > 0 && (
              <>
                <button
                  onClick={resume}
                  className="px-8 py-3 bg-coffee-600 text-white rounded-lg hover:bg-coffee-700 transition"
                >
                  Resume
                </button>
                <button
                  onClick={reset}
                  className="px-8 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                >
                  Reset
                </button>
              </>
            )}
          </div>
        </div>

        <div className="text-coffee-600">
          Sessions today: {useTimerStore.getState().sessionCount}
        </div>
      </div>
    </div>
  );
}
```

#### Update `src/App.tsx`

```typescript
import { TimerView } from './timer/components/TimerView';

function App() {
  return <TimerView />;
}

export default App;
```

#### Test Your Timer!

```bash
npm run dev
```

You should see your timer with a cozy coffee shop theme!

---

### Step 5: Continue Development

Once your timer is working, follow the roadmap:

1. **Week 3-4**: Complete Phase 1 (Timer features)
   - Add settings panel
   - Implement notifications
   - Add session tracking
   - Create statistics view

2. **Week 5-7**: Phase 2 (Game Loop)
   - Build basic game state
   - Create inventory system
   - Implement customer service
   - Design simple shop view

3. **Week 8+**: Continue following [ROADMAP.md](./ROADMAP.md)

---

## 🎨 Design Assets You'll Need

### Immediate (MVP)
- App icon (512x512px)
- Coffee cup icon (for tray)
- Basic UI elements (buttons, panels)
- Customer sprites (simple, can start with colored circles)
- Ingredient icons (coffee beans, milk, etc.)

### Later
- Shop backgrounds
- Animated sprites
- Decorative items
- Seasonal themes

**Tip**: Start with simple geometric shapes and placeholder art. Polish later!

---

## 🧪 Testing as You Go

```bash
# Install testing dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom

# Create a test
# src/stores/__tests__/timerStore.test.ts
```

Run tests:
```bash
npm run test
```

---

## 📝 Documentation as You Build

Keep updating:
- **CHANGELOG.md** - Track what you've completed
- **DECISIONS.md** - Record important technical decisions
- **BUGS.md** - Known issues and their status

---

## 🆘 Troubleshooting

### Tauri won't start
- Verify Rust installation: `rustc --version`
- Check Tauri prerequisites for your OS
- Try: `cargo install tauri-cli`

### Build errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Tauri cache: `rm -rf src-tauri/target`

### Hot reload not working
- Restart dev server
- Check Vite configuration

---

## 🎯 Milestone Checklist

Use this to track your progress:

### Phase 1: Core Timer ⏳
- [ ] Project scaffolding complete
- [ ] Timer counts down accurately
- [ ] Start/pause/resume/reset buttons work
- [ ] Visual progress indicator
- [ ] Session counter
- [ ] Settings panel (duration customization)
- [ ] Basic notifications

### Phase 2: Core Game Loop ⏳
- [ ] Game state management
- [ ] Basic shop view
- [ ] Inventory system
- [ ] 5 recipes implemented
- [ ] Customer generation
- [ ] Serve customer flow
- [ ] Day cycle (start → serve → end)
- [ ] Save/load works

### Phase 3: Polish & MVP ⏳
- [ ] 15 recipes
- [ ] 10 upgrades
- [ ] Progression balanced
- [ ] UI/UX polished
- [ ] Audio implemented
- [ ] Tutorial/onboarding
- [ ] Testing complete

---

## 💡 Tips for Success

1. **Start Small**: Get the timer working perfectly before touching the game
2. **Commit Often**: Use git to save your progress frequently
3. **Test Continuously**: Don't wait until the end to test
4. **Playtest Early**: Have friends try it even when it's rough
5. **Stay Flexible**: The roadmap is a guide, not a law
6. **Take Breaks**: Use your own Pomodoro timer! (once it works 😊)

---

## 🚀 Ready to Build!

You have everything you need to start building Coffeedoro. The documentation provides the vision, design, and technical blueprint. Now it's time to bring it to life!

**Your first command:**
```bash
npm create tauri-app@latest . -- --template react-ts
```

**Questions?** Refer back to:
- [ARCHITECTURE.md](./ARCHITECTURE.md) for technical decisions
- [GAME_DESIGN.md](./GAME_DESIGN.md) for game mechanics
- [ROADMAP.md](./ROADMAP.md) for what to build when

**Good luck, and happy coding! ☕**
