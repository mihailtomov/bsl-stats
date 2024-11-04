import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './pages/Layout';
import Home from './pages/Home';
import Tournaments from './pages/Tournaments';
import TournamentStats from './pages/TournamentStats';
import PlayerStats from './pages/PlayerStats';
import About from './pages/About';

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
            path: ':tournamentNumber',
            element: <TournamentStats />,
          },
          {
            path: ':tournamentNumber/:player',
            element: <PlayerStats />,
          },
        ],
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: '*',
        element: (
          <p>
            Looks like there is nothing here. Try one of the links from the menu
            above.
          </p>
        ),
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
