import React from 'react';

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
        <a
          href="https://www.twitch.tv/zzzeropl"
          target="_blank"
          rel="noopener noreferrer"
        >
          ZZZeroPL
        </a>{' '}
        and the people he has been working with throughout the years to create
        so much content and keep the foreign bw competitive scene alive! Please
        feel free to support him in any way you can by following him on twitch
        or consider{' '}
        <a
          href="https://www.patreon.com/Bombastic"
          target="_blank"
          rel="noopener noreferrer"
        >
          becoming a patreon here.
        </a>
      </p>
      <p>
        Second it's very important to give credit to Liquipedia's development
        team for exposing and maintaining a free public API from where this data
        can be accessed from. For Brood War there are two API's available and
        the one i'm using for this project is{' '}
        <a
          href="https://liquipedia.net/starcraft/api.php"
          target="_blank"
          rel="noopener noreferrer"
        >
          Liquipedia's Starcraft Brood War MediaWiki API.
        </a>
      </p>
      <p>
        This data is under a CC BY-SA 3.0 license. For more information see:{' '}
        <a
          href="https://creativecommons.org/licenses/by-sa/3.0/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://creativecommons.org/licenses/by-sa/3.0/
        </a>
        .
      </p>
    </div>
  );
};

export default About;
