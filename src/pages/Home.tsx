import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <h2>Welcome to BSL stats!</h2>
      <NavLink className="text-primary text-decoration-none" to="bsl">
        Check all available results from the BSL tournament series as entered in
        Liquipedia.
      </NavLink>
    </>
  );
};

export default Home;
