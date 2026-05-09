import React from 'react';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';

import Link from '../components/Link';
import enTranslations from '../i18n/locales/en';
import { getAYearFromNowDate, getCookieByName } from '../utils/utils';

declare global {
  interface Window {
    clarity: (type: string, consent?: boolean) => void;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { tool, ...filteredClarityIntroductionKeys } =
  enTranslations.translation.page.privacySection.clarity.introduction;

type ClarityIntroductionKeys = keyof typeof filteredClarityIntroductionKeys;
const CLARITY_INTRODUCTION_KEYS = Object.keys(
  filteredClarityIntroductionKeys
) as ClarityIntroductionKeys[];

const PrivacySection = () => {
  const { t } = useTranslation();

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
      <p>{t('page.privacySection.clarity.introduction.tool')}</p>
      <ul>
        {CLARITY_INTRODUCTION_KEYS.map((translationKey) => (
          <li key={translationKey}>
            {t(`page.privacySection.clarity.introduction.${translationKey}`)}
          </li>
        ))}
      </ul>
      <p>{t('page.privacySection.clarity.functionality.recording')}</p>
      <p>
        <b>{t('page.privacySection.clarity.functionality.statement')}</b>
      </p>
      <ul>
        <li>{t('page.privacySection.clarity.functionality.userFriendly')}</li>
        <li>
          {t('page.privacySection.clarity.functionality.personalDetails')}
        </li>
        <li>
          {t('page.privacySection.clarity.functionality.microsoftServices')}
        </li>
      </ul>
      <p>
        <Trans
          i18nKey="page.privacySection.clarity.cookies"
          components={{
            microsoftprivacystatement: (
              <Link
                url="https://www.microsoft.com/privacy/privacystatement"
                text="Microsoft Privacy Statement"
              />
            )
          }}
        />
      </p>
      <p>{t('page.privacySection.clarity.consent.statement')}</p>
      <div className="d-flex gap-2 justify-content-center mt-4 form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="consent-granted"
          checked={hasConsentBeenGranted}
          onChange={toggleHandler}
        />
        <label className="form-check-label" htmlFor="consent-granted">
          {t('page.privacySection.clarity.consent.toggle', {
            trackingStatus: hasConsentBeenGranted ? 'enabled' : 'disabled'
          })}
        </label>
      </div>
    </div>
  );
};

export default PrivacySection;
