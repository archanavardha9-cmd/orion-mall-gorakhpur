import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export const ROUTES = [
  { path: '/', id: 'home', label: 'Home' },
  { path: '/explore', id: 'explore', label: 'Explore' },
  { path: '/shopping', id: 'shopping', label: 'Shopping' },
  { path: '/dining', id: 'dining', label: 'Dining' },
  { path: '/entertainment', id: 'entertainment', label: 'Entertainment' },
  { path: '/visit', id: 'visit', label: 'Visit' }
];

function normalizePath(rawPath) {
  if (!rawPath || rawPath === '/') return '/';
  const cleaned = rawPath.replace(/\/+$/, '');
  const matched = ROUTES.find((r) => r.path === cleaned);
  return matched ? matched.path : '/';
}

const RouterContext = createContext({
  currentPath: '/',
  navigate: () => {}
});

export function RouterProvider({ children }) {
  const [currentPath, setCurrentPath] = useState(() =>
    normalizePath(window.location.pathname)
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((nextPath) => {
    const target = normalizePath(nextPath);
    if (target !== window.location.pathname) {
      window.history.pushState({}, '', target);
    }
    setCurrentPath(target);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}
