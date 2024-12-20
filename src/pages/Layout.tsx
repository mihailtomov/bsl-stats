import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import Link from '../components/Link';
import ScrollToTop from '../components/ScrollToTop';

const Layout = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="text-center container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#app-navbar"
            aria-controls="app-navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="justify-content-center navbar-collapse collapse"
            id="app-navbar"
          >
            <div className="navbar-nav">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
              <NavLink className="nav-link" to="/bsl">
                BSL Tournaments
              </NavLink>
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
      <div className="d-flex justify-content-center flex-column text-center container-sm container-height py-4">
        <ScrollToTop />
        <Outlet />
      </div>
      <div className="card-footer bg-dark w-100 bottom-0 text-center text-white py-3">
        Created by{' '}
        <Link url="https://github.com/mihailtomov" text="Mihail Tomov" /> aka
        React
      </div>
    </>
  );
};

export default Layout;
