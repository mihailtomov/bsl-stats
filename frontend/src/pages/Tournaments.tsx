import classNames from 'clsx';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet } from 'react-router-dom';

import { DataContext } from '../store/data-context';

const Tournaments = () => {
  const { tournamentsList } = useContext(DataContext);
  const { t } = useTranslation();

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
                to={`${tournament.number}`}>{`BSL ${tournament.number}`}</NavLink>
            </div>
          ))
        ) : (
          <p>{t('page.tournaments.error.listUnavailable')}</p>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Tournaments;
