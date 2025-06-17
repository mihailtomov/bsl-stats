import React from 'react';
import { NavLink } from 'react-router-dom';

const NavMenu = () => {
  return (
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
            <NavLink className="nav-link" to="/privacy-section">
              Privacy Section
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
