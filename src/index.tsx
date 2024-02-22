import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TournamentsDataProvider from './store/tournaments-data-context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <TournamentsDataProvider>
    <App />
  </TournamentsDataProvider>
);
