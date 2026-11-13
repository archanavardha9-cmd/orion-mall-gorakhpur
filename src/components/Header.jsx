import { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ROUTES, useRouter } from '../utils/router';
import { useTheme } from '../utils/themeContext';

export function Header() {
  const { currentPath, navigate } = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[var(--glass-panel)] border-b border-[var(--border-hairline)] transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNav('/');
          }}
          className="font-display text-2xl md:text-[1.75rem] font-semibold tracking-tight text-[var(--text-primary)] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--accent-coral)]"
        >
          ORION
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-7"
        >
          {ROUTES.map((route) => {
            const active = currentPath === route.path;
            return (
              <a
                key={route.path}
                href={route.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(route.path);
                }}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--accent-coral)] ${
                  active
                    ? 'text-[var(--accent-coral)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {route.label}
                {active && (
                  <motion.span
                    layoutId="nav-active-underline"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[var(--accent-coral)]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single primary theme action + mobile menu button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] rounded-xl text-xs md:text-sm font-medium border border-[var(--border-hairline)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] hover:border-[var(--accent-coral)] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Light Theme</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[var(--accent-plum)]" />
                <span>Dark Theme</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            aria-label="Mobile navigation"
            className="lg:hidden border-t border-[var(--border-hairline)] bg-[var(--bg-surface-elevated)] px-5 py-4 flex flex-col gap-2"
          >
            {ROUTES.map((route) => {
              const active = currentPath === route.path;
              return (
                <a
                  key={route.path}
                  href={route.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(route.path);
                  }}
                  className={`py-2.5 px-3 rounded-lg text-base font-medium transition-colors ${
                    active
                      ? 'bg-[var(--bg-tint-peach)] dark:bg-[var(--bg-tint-lavender)] text-[var(--accent-coral)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {route.label}
                </a>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
