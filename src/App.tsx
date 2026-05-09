import './App.css';

import i18next from 'i18next';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import About from './pages/About';
import Home from './pages/Home';
import Layout from './pages/Layout';
import PlayerStats from './pages/PlayerStats';
import PrivacySection from './pages/PrivacySection';
import Tournaments from './pages/Tournaments';
import TournamentStats from './pages/TournamentStats';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <p>{i18next.t('error.general')}</p>,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'bsl',
        element: <Tournaments />,
        children: [
          {
            path: ':tournamentNumber',
            element: <TournamentStats />
          },
          {
            path: ':tournamentNumber/:player',
            element: <PlayerStats />
          }
        ]
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'privacy-section',
        element: <PrivacySection />
      },
      {
        path: '*',
        element: <p>{i18next.t('error.pageNotFound')}</p>
      }
    ]
  }
]);

const App = () => <RouterProvider router={router} />;

export default App;
