import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { TournamentsDataContext } from '../store/tournaments-data-context';

const Tournaments = () => {
  const { tournamentsList } = useContext(TournamentsDataContext);

  return (
    <>
      <h2>BSL Tournaments</h2>
      <div className="justify-content-center nav">
        {tournamentsList?.map((tournament) => (
          <div className="nav-item" key={tournament.number}>
            <NavLink
              className={({ isActive }) =>
                ['nav-link', isActive ? 'fw-bold' : ''].join(' ')
              }
              to={`${tournament.pageId}`}
            >{`BSL ${tournament.number}`}</NavLink>
          </div>
        ))}
      </div>
      <Outlet />
    </>
  );
};

export default Tournaments;
