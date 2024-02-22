import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

import { TournamentsDataContext } from '../store/tournaments-data-context';

const Tournaments = () => {
  const { tournamentsList } = useContext(TournamentsDataContext);

  return (
    <>
      <h2>BSL Tournaments</h2>
      <Nav className="justify-content-center">
        {tournamentsList?.map((tournament) => (
          <Nav.Item key={tournament.number}>
            <NavLink
              style={({ isActive }) =>
                isActive ? { fontWeight: 'bold' } : undefined
              }
              className="nav-link"
              to={`${tournament.pageId}`}
            >{`BSL ${tournament.number}`}</NavLink>
          </Nav.Item>
        ))}
      </Nav>
      <Outlet />
    </>
  );
};

export default Tournaments;
