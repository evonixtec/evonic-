import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

// Restore redirected path from static 404 fallback if applicable
if (typeof window !== 'undefined' && sessionStorage.redirect) {
  const redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  window.history.replaceState(null, '', redirect);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);

// Register service worker for fast mobile caching & offline support
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Non-blocking registration
    });
  });
}

