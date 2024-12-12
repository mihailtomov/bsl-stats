import React from 'react';

import Link from '../components/Link';

const About = () => {
  return (
    <div className="my-3 text-start">
      <p>
        I've developed this app out of love for the foreign BW community and the
        game itself. I know all of this data is already available on Liquipedia,
        but i found combining these stats in a simpler UI makes it easier to
        gain an overview of players performance.
      </p>
      <p>
        Big respect to{' '}
        <Link url="https://www.twitch.tv/zzzeropl" text="ZZZeroPL" /> and the
        people he has been working with throughout the years to create so much
        content and keep the foreign BW competitive scene alive! Please feel
        free to support them in any way you can by following the streaming
        channels or consider{' '}
        <Link
          url="https://www.patreon.com/Bombastic"
          text="becoming a patreon here."
        />
      </p>
      <p>
        It's very important to give credit to Liquipedia's development team for
        exposing and maintaining a free public API from where this data can be
        accessed from. Special thanks to Nydra for providing me with the API
        key, top man! For Brood War there are two API's available and the one
        i'm using for this project is{' '}
        <Link url="https://api.liquipedia.net/" text="Liquipedia's DB API." />
      </p>
      <p>
        This data is under a CC BY-SA 3.0 license. For more information see:{' '}
        <Link
          url="https://creativecommons.org/licenses/by-sa/3.0/"
          text="https://creativecommons.org/licenses/by-sa/3.0/"
        />
        .
      </p>
      <p>
        App icons attribution below:
        <div>
          <Link
            url="https://www.flaticon.com/free-icons/growth"
            title="growth icons"
            text="Growth icons created by Freepik - Flaticon"
          />
        </div>
      </p>
    </div>
  );
};

export default About;
