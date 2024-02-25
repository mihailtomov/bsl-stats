import React from 'react';
import { NavLink, Outlet, ScrollRestoration } from 'react-router-dom';

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
      <div className="text-center container-sm">
        <Outlet />
      </div>
      <ScrollRestoration />
    </>
  );
};

export default Layout;
