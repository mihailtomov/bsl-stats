import React from 'react';
import { Outlet } from 'react-router-dom';

import ScrollToTop from '../ScrollToTop';

const MainContent = () => {
  return (
    <div className="d-flex justify-content-center flex-column flex-grow-1 text-center container-sm py-4">
      <ScrollToTop />
      <Outlet />
    </div>
  );
};

export default MainContent;
