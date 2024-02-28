import React from 'react';

import Link from '../components/Link';

const About = () => {
  return (
    <div className="my-3">
      <p>
        First and foremost i've developed this app out of love for the bw
        community and the game itself. I know all of this data is already
        available on Liquipedia, but i found combining these stats in a simple
        UI may be useful to some people to get an idea of player's overall
        results.
      </p>
      <p>
        Second but just as foremost, big respect to{' '}
        <Link url="https://www.twitch.tv/zzzeropl" text="ZZZeroPL" /> and the
        people he has been working with throughout the years to create so much
        content and keep the foreign bw competitive scene alive! Please feel
        free to support him in any way you can by following him on twitch or
        consider{' '}
        <Link
          url="https://www.patreon.com/Bombastic"
          text="becoming a patreon here."
        />
      </p>
      <p>
        Last but not least it's very important to give credit to Liquipedia's
        development team for exposing and maintaining a free public API from
        where this data can be accessed from. For Brood War there are two API's
        available and the one i'm using for this project is{' '}
        <Link
          url="https://liquipedia.net/starcraft/api.php"
          text="Liquipedia's Starcraft Brood War MediaWiki API."
        />
      </p>
      <p>
        This data is under a CC BY-SA 3.0 license. For more information see:{' '}
        <Link
          url="https://creativecommons.org/licenses/by-sa/3.0/"
          text="https://creativecommons.org/licenses/by-sa/3.0/"
        />
        .
      </p>
    </div>
  );
};

export default About;
