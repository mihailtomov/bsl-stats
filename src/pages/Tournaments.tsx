import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import classNames from 'clsx';

import { DataContext } from '../store/data-context';

const Tournaments = () => {
  const { tournamentsList } = useContext(DataContext);

  return (
    <>
      <div className="justify-content-center nav">
        {tournamentsList.length > 0 ? (
          tournamentsList.map((tournament) => (
            <div className="nav-item" key={tournament.number}>
              <NavLink
                className={({ isActive }) =>
                  classNames('nav-link', { 'fw-bold': isActive })
                }
                to={`${tournament.number}`}
              >{`BSL ${tournament.number}`}</NavLink>
            </div>
          ))
        ) : (
          <p>
            There are no tournaments to display. Something went wrong with
            obtaining the list from the server.
          </p>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Tournaments;
