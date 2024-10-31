import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import DataProvider from './store/data-context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <DataProvider>
    <App />
  </DataProvider>
);
