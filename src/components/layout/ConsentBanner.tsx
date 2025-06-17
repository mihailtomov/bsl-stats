import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'clsx';

import { getAYearFromNowDate, getCookieByName } from '../../utils/utils';

const ConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(true);

  const consentGranted = () => {
    document.cookie = `consent=yes;expires=${getAYearFromNowDate()}`;
    setShowBanner(false);
    window.location.reload();
  };

  const consentDenied = () => {
    document.cookie = `consent=no;expires=${getAYearFromNowDate()}`;
    setShowBanner(false);
    window.location.reload();
  };

  if (getCookieByName('consent')) {
    return null;
  }

  return (
    <div
      className={classNames(
        'container-fluid position-fixed bg-dark text-white text-center',
        {
          ['show-consent-banner']: showBanner,
          ['hide-consent-banner']: !showBanner,
        }
      )}
    >
      <div className="my-2">
        I am using Microsoft Clarity to track user interaction. You can read
        more about it and opt-in or out at any point from{' '}
        {
          <>
            <NavLink to="privacy-section">here</NavLink>
          </>
        }
        . Would you like to help me understand how you use this website so I can
        improve it?
      </div>
      <div className="d-flex justify-content-center gap-1 my-2">
        <button
          type="button"
          className="btn btn-primary"
          onClick={consentGranted}
        >
          Yes
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={consentDenied}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default ConsentBanner;
