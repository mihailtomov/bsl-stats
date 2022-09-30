import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Layout.module.scss';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = (props) => {
  return (
    <>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/koreans">South Korea</Link>
          </li>
          <li>
            <Link to="/foreigners">Foreigners</Link>
          </li>
        </ul>
      </nav>
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
