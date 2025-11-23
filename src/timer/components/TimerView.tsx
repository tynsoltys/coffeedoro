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
