import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { DataContext } from '../store/data-context';

const Home = () => {
  const { fetchDataError } = useContext(DataContext);

  if (fetchDataError) return <p>Unexpected error occurred on the server.</p>;

  return (
    <>
      <NavLink className="text-primary text-decoration-none fs-5" to="bsl">
        Check all available results from the BSL tournament series as entered in
        Liquipedia.
      </NavLink>
    </>
  );
};

export default Home;
