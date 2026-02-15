import React from 'react';

import ConsentBanner from '../components/layout/ConsentBanner';
import Footer from '../components/layout/Footer';
import MainContent from '../components/layout/MainContent';
import NavMenu from '../components/layout/NavMenu';

const Layout = () => (
  <>
    <NavMenu />
    <MainContent />
    <Footer />
    <ConsentBanner />
  </>
);

export default Layout;
