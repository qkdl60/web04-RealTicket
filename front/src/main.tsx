import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { worker } from '@/mocks/browser.ts';

import App from './app';
import './app/styles/index.css';

async function initMockWorker() {
  if (import.meta.env.DEV) return worker.start();
  return;
}

initMockWorker().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
