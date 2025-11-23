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
