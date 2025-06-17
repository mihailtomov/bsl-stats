import React from 'react';

import { getCookieByName, getAYearFromNowDate } from '../utils/utils';

import Link from '../components/Link';

declare global {
  interface Window {
    clarity: (type: string, consent?: boolean) => void;
  }
}

const PrivacySection = () => {
  const consentCookieValue = getCookieByName('consent')?.value;
  const hasConsentBeenGranted = consentCookieValue === 'yes';

  const toggleHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const consentGranted = e.currentTarget.checked;

    if (consentCookieValue === 'yes' && !consentGranted) {
      document.cookie = `consent=no;expires=${getAYearFromNowDate()}`;
      window.clarity('consent', false);
    } else {
      document.cookie = `consent=yes;expires=${getAYearFromNowDate()}`;
    }

    window.location.reload();
  };

  return (
    <div className="text-start">
      <p>
        I use a tool called Microsoft Clarity to better understand how people
        use this website. By default it is disabled until user consent is
        provided. When enabled, Clarity shows me things like:
      </p>
      <ul>
        <li>Which pages are the most visited</li>
        <li>What visitors click on</li>
        <li>How far down the page someone scrolls</li>
        <li>
          If anything on the site seems confusing or isn't working properly
        </li>
      </ul>
      <p>
        To do this, Clarity may record how you interact with the site, kind of
        like a video of your visit, and collects basic info about your device
        and browser.
      </p>
      <p>
        <b>Just so you know:</b>
      </p>
      <ul>
        <li>
          This helps me improve the website and make it more user-friendly.
        </li>
        <li>
          Clarity doesn’t collect personal details like your name or email.
        </li>
        <li>
          Microsoft may also use some of this data to improve their own
          services.
        </li>
      </ul>
      <p>
        Clarity uses cookies to remember if you've been here before. These
        cookies are set by Microsoft and might also track your activity on other
        websites that use Clarity. For more information about how Microsoft
        collects and uses your data, visit the{' '}
        {
          <Link
            url="https://www.microsoft.com/privacy/privacystatement"
            text="Microsoft Privacy Statement"
          />
        }
        . I also use a functional cookie to remember your choice. This cookie
        stores your answer so I don't bother you with my cookie banner on every
        visit.
      </p>
      <p>
        You are in complete control whether I or Microsoft can collect this data
        or not. In order to do this simply move the toggle switch below to
        allow/disallow tracking:
      </p>
      <div className="d-flex gap-2 justify-content-center mt-4 form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="consent-granted"
          checked={hasConsentBeenGranted}
          onChange={toggleHandler}
        />
        <label className="form-check-label" htmlFor="consent-granted">
          Tracking is {hasConsentBeenGranted ? 'enabled' : 'disabled'}
        </label>
      </div>
    </div>
  );
};

export default PrivacySection;
