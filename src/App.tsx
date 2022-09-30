import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { getPlayerMatches } from './services/api';
import type { PlayerData } from './types/data';

import Table from './components/Table/Table';
import Layout from './components/layout/Layout';

const App = () => {
  const [playerData, setPlayerData] = useState<PlayerData[]>([]);
  const koreans = playerData.filter((data) => data?.country === 'South Korea');
  const foreigners = playerData.filter(
    (data) => data?.country !== 'South Korea'
  );

  console.log('APP RUNNING!');

  useEffect(() => {
    fetchPlayerData();
  }, []);

  const fetchPlayerData = async () => {
    const data = await getPlayerMatches();
    setPlayerData(data);
  };

  return (
    <Layout>
      <Routes>
        <Route path="/koreans" element={<Table playerData={koreans} />} />
        <Route
          path="/foreigners"
          element={<Table playerData={foreigners} countryFilter />}
        />
      </Routes>
    </Layout>
  );
};

export default App;
