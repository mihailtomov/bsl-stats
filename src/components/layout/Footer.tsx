import React from 'react';

import Link from '../Link';

const Footer = () => {
  return (
    <div className="card-footer bg-dark w-100 bottom-0 text-center text-white py-3">
      Created by{' '}
      <Link url="https://github.com/mihailtomov" text="Mihail Tomov" /> aka
      React
    </div>
  );
};

export default Footer;
