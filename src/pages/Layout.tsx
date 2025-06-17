import React from 'react';

import NavMenu from '../components/layout/NavMenu';
import MainContent from '../components/layout/MainContent';
import Footer from '../components/layout/Footer';
import ConsentBanner from '../components/layout/ConsentBanner';

const Layout = () => (
  <>
    <NavMenu />
    <MainContent />
    <Footer />
    <ConsentBanner />
  </>
);

export default Layout;
