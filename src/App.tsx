import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './pages/Layout';
import Home from './pages/Home';
import Tournaments from './pages/Tournaments';
import TournamentStats from './pages/TournamentStats';
import PlayerStats from './pages/PlayerStats';

import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <p>Something went wrong!</p>,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'bsl',
        element: <Tournaments />,
        children: [
          {
            path: ':pageId',
            element: <TournamentStats />,
          },
          {
            path: ':pageId/:player',
            element: <PlayerStats />,
          },
        ],
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
