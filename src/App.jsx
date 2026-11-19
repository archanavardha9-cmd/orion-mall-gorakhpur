import { AnimatePresence, motion } from 'motion/react';
import { ThemeProvider } from './utils/themeContext';
import { RouterProvider, useRouter } from './utils/router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { ShoppingPage } from './pages/ShoppingPage';
import { DiningPage } from './pages/DiningPage';
import { EntertainmentPage } from './pages/EntertainmentPage';
import { VisitPage } from './pages/VisitPage';

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
        {renderPage()}
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
