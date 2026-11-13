import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const AutoScrollContext = createContext({
  status: 'idle',
  progress: 0,
  speedMultiplier: 1,
  setSpeedMultiplier: () => {},
  startAutoScroll: () => {},
  pauseAutoScroll: () => {},
  resumeAutoScroll: () => {},
  stopAutoScroll: () => {}
});

export function AutoScrollProvider({ children }) {
  const [status, setStatus] = useState('idle'); // 'idle' | 'playing' | 'paused'
  const [progress, setProgress] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const pausedScrollYRef = useRef(0);
  const speedRef = useRef(speedMultiplier);
  const programmaticScrollRef = useRef(false);

  useEffect(() => {
    speedRef.current = speedMultiplier;
  }, [speedMultiplier]);

  const computeProgress = useCallback(() => {
    const maxScroll = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );
    const pct = Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100));
    setProgress(pct);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      computeProgress();
      if (!programmaticScrollRef.current && status === 'playing') {
        pausedScrollYRef.current = window.scrollY;
        setStatus('paused');
      }
    };

    const interruptOnUserInput = () => {
      if (status === 'playing') {
        pausedScrollYRef.current = window.scrollY;
        setStatus('paused');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', interruptOnUserInput, { passive: true });
    window.addEventListener('touchstart', interruptOnUserInput, { passive: true });
    window.addEventListener('keydown', (e) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(e.key)) {
        interruptOnUserInput();
      }
    });

    computeProgress();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', interruptOnUserInput);
      window.removeEventListener('touchstart', interruptOnUserInput);
    };
  }, [status, computeProgress]);

  useEffect(() => {
    if (status !== 'playing') {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimeRef.current = null;
      return;
    }

    const basePxPerSecond = 72;

    const step = (timestamp) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }
      const deltaSeconds = Math.min(0.05, (timestamp - lastTimeRef.current) / 1000);
      lastTimeRef.current = timestamp;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentY = window.scrollY;

      if (currentY >= maxScroll - 2) {
        setStatus('idle');
        setProgress(100);
        return;
      }

      const nextY = Math.min(
        maxScroll,
        currentY + basePxPerSecond * speedRef.current * deltaSeconds
      );

      programmaticScrollRef.current = true;
      window.scrollTo(0, nextY);
      pausedScrollYRef.current = nextY;
      requestAnimationFrame(() => {
        programmaticScrollRef.current = false;
      });

      computeProgress();
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimeRef.current = null;
    };
  }, [status, computeProgress]);

  const startAutoScroll = useCallback(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (window.scrollY >= maxScroll - 4) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      pausedScrollYRef.current = 0;
    } else {
      pausedScrollYRef.current = window.scrollY;
    }
    setStatus('playing');
  }, []);

  const pauseAutoScroll = useCallback(() => {
    if (status === 'playing') {
      pausedScrollYRef.current = window.scrollY;
      setStatus('paused');
    }
  }, [status]);

  const resumeAutoScroll = useCallback(() => {
    if (status === 'paused') {
      window.scrollTo(0, pausedScrollYRef.current || window.scrollY);
      setStatus('playing');
    } else if (status === 'idle') {
      setStatus('playing');
    }
  }, [status]);

  const stopAutoScroll = useCallback(() => {
    pausedScrollYRef.current = window.scrollY;
    setStatus('idle');
  }, []);

  return (
    <AutoScrollContext.Provider
      value={{
        status,
        progress,
        speedMultiplier,
        setSpeedMultiplier,
        startAutoScroll,
        pauseAutoScroll,
        resumeAutoScroll,
        stopAutoScroll
      }}
    >
      {children}
    </AutoScrollContext.Provider>
  );
}

export function useAutoScroll() {
  return useContext(AutoScrollContext);
}
