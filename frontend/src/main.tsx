import './i18n/init';

import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import DataProvider from './store/data-context';

createRoot(document.getElementById('root')!).render(
  <DataProvider>
    <App />
  </DataProvider>
);
