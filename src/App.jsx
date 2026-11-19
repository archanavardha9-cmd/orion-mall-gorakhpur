import { Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ThemeProvider } from './utils/themeContext';
import { RouterProvider, useRouter } from './utils/router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
// HomePage loaded eagerly — it is the LCP page and must render immediately
import { HomePage } from './pages/HomePage';

// All other pages are lazy-loaded so they don't block the initial bundle
const ExplorePage = lazy(() =>
  import('./pages/ExplorePage').then((m) => ({ default: m.ExplorePage }))
);
const ShoppingPage = lazy(() =>
  import('./pages/ShoppingPage').then((m) => ({ default: m.ShoppingPage }))
);
const DiningPage = lazy(() =>
  import('./pages/DiningPage').then((m) => ({ default: m.DiningPage }))
);
const EntertainmentPage = lazy(() =>
  import('./pages/EntertainmentPage').then((m) => ({ default: m.EntertainmentPage }))
);
const VisitPage = lazy(() =>
  import('./pages/VisitPage').then((m) => ({ default: m.VisitPage }))
);

/** Minimal full-height loading placeholder shown while a lazy page chunk loads */
function PageFallback() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[var(--bg-canvas,#fbf7f0)]"
      aria-hidden="true"
    />
  );
}

function PageStage() {
  const { currentPath } = useRouter();

  const renderPage = () => {
    switch (currentPath) {
      case '/explore':
        return <ExplorePage />;
      case '/shopping':
        return <ShoppingPage />;
      case '/dining':
        return <DiningPage />;
      case '/entertainment':
        return <EntertainmentPage />;
      case '/visit':
        return <VisitPage />;
      case '/':
      default:
        return <HomePage />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentPath}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <Suspense fallback={<PageFallback />}>
          {renderPage()}
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <PageStage />
          </main>
          <Footer />
        </div>
      </RouterProvider>
    </ThemeProvider>
  );
}
