import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import Link from '../components/Link';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="my-3 text-start">
      <p>{t('page.about.introduction')}</p>
      <p>
        <Trans
          i18nKey="page.about.links.zzzero"
          components={{
            zzzero: (
              <Link url="https://www.twitch.tv/zzzeropl" text="ZZZeroPL" />
            )
          }}
        />
        <Trans
          i18nKey="page.about.links.patreon"
          components={{
            patreon: (
              <Link
                url="https://www.patreon.com/Bombastic"
                text="becoming a patreon here."
              />
            )
          }}
        />
      </p>
      <p>
        <Trans
          i18nKey="page.about.links.liquipedia"
          components={{
            liquipediadb: (
              <Link
                url="https://api.liquipedia.net/"
                text="Liquipedia's DB API."
              />
            )
          }}
        />
      </p>
      <p>
        <Trans
          i18nKey="page.about.links.dataAttribution"
          components={{
            license: (
              <Link
                url="https://creativecommons.org/licenses/by-sa/3.0/"
                text="https://creativecommons.org/licenses/by-sa/3.0/"
              />
            )
          }}
        />
      </p>
      <p>
        <Trans
          i18nKey="page.about.links.iconsAttribution"
          components={{
            icons: (
              <Link
                url="https://www.flaticon.com/free-icons/growth"
                title="growth icons"
                text="Growth icons created by Freepik - Flaticon"
              />
            ),
            br: <br />
          }}
        />
      </p>
    </div>
  );
};

export default About;
