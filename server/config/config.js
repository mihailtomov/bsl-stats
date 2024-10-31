export const config = {
  apiUrl: 'https://api.liquipedia.net/api',
  apiParams: {
    tournament: {
      wiki: 'starcraft',
      conditions: '[[seriespage::Bombastic_StarLeague]]',
      query: 'pageid, pagename',
      limit: 200,
    },
    match: {
      wiki: 'starcraft',
      query:
        'pageid, pagename, winner, section, date, match2bracketdata, match2opponents, match2games',
      limit: 500,
      order: 'date DESC',
    },
  },
  apiAuthorizationHeader: {
    headers: { Authorization: `Apikey ${process.env.API_KEY}` },
  },
};
