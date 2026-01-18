import '@radix-ui/themes/styles.css';

import { Theme } from '@radix-ui/themes';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { StoreProvider } from './store/StoreProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <Theme>
          <App />
        </Theme>
      </StoreProvider>
    </BrowserRouter>
  </StrictMode>,
);
