import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { DataContext } from '../store/data-context';

const Home = () => {
  const { fetchDataError } = useContext(DataContext);
  const { t } = useTranslation();

  if (fetchDataError) return <p>{t('error.fetchDataError')}</p>;

  return (
    <>
      <NavLink className="text-primary text-decoration-none fs-5" to="bsl">
        Click to view results from the BSL ProLeague tournament series as
        entered in Liquipedia.
      </NavLink>
    </>
  );
};

export default Home;
