import { Pause, Play, RotateCcw, Square } from 'lucide-react';
import { useAutoScroll } from '../utils/autoScrollContext';

export function AutoScrollBar() {
  const {
    status,
    progress,
    speedMultiplier,
    setSpeedMultiplier,
    startAutoScroll,
    pauseAutoScroll,
    resumeAutoScroll,
    stopAutoScroll
  } = useAutoScroll();

  return (
    <div
      role="region"
      aria-label="Auto-scroll playback controls"
      className="sticky top-16 z-40 w-full backdrop-blur-md bg-[var(--glass-panel)] border-b border-[var(--border-hairline)] transition-colors duration-300"
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-1.5 flex items-center justify-between gap-3 overflow-x-auto">
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <span className="text-xs font-medium text-[var(--text-muted)] whitespace-nowrap hidden sm:inline">
            Guided Auto-Scroll
          </span>

          {status === 'idle' && (
            <button
              type="button"
              onClick={startAutoScroll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-lg text-xs font-semibold bg-[var(--accent-coral)] text-white hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start Auto Scroll</span>
            </button>
          )}

          {status === 'playing' && (
            <button
              type="button"
              onClick={pauseAutoScroll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-lg text-xs font-semibold bg-[var(--accent-turquoise)] text-white hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause</span>
            </button>
          )}

          {status === 'paused' && (
            <button
              type="button"
              onClick={resumeAutoScroll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-lg text-xs font-semibold bg-[var(--accent-plum)] text-white hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          )}

          <button
            type="button"
            onClick={stopAutoScroll}
            disabled={status === 'idle'}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
              status === 'idle'
                ? 'border-[var(--border-hairline)] text-[var(--text-muted)] opacity-50 cursor-not-allowed'
                : 'border-[var(--border-strong)] text-[var(--text-primary)] hover:border-[var(--accent-coral)] cursor-pointer'
            }`}
          >
            <Square className="w-3 h-3 fill-current" />
            <span>Stop</span>
          </button>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-1 p-0.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)]">
            {[0.8, 1, 1.5].map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => setSpeedMultiplier(spd)}
                className={`px-2 py-0.5 text-[11px] font-mono-tabular rounded-md transition-colors cursor-pointer ${
                  speedMultiplier === spd
                    ? 'bg-[var(--text-primary)] text-[var(--bg-canvas)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 min-w-[96px]">
            <div className="w-16 sm:w-24 h-1.5 rounded-full bg-[var(--border-hairline)] overflow-hidden">
              <div
                className="h-full bg-[var(--accent-coral)] transition-all duration-150"
                style={{ width: `${Math.round(progress)}%` }}
              />
            </div>
            <span className="text-[11px] font-mono-tabular text-[var(--text-muted)] w-8 text-right">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
