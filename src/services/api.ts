import { constructQueryParams } from '../utils/format';

const apiUrl = 'https://liquipedia.net/starcraft/api.php?';
const headers = {
  'User-Agent': `bw-stats app (local development;${process.env.REACT_APP_EMAIL})`,
  'Accept-Encoding': 'gzip',
};
const defaultSearchParams = constructQueryParams({
  format: 'json',
  maxage: 604800,
  origin: '*',
});
const tournamentsListParams = constructQueryParams({
  list: 'prefixsearch',
  pssearch: 'Bombastic_StarLeague%2F',
  pslimit: 200,
});
const tournamentsDataParams = constructQueryParams({
  prop: 'revisions',
  rvprop: 'content',
  rvslots: '*',
});

export const getTournamentsList = () =>
  fetch(
    `${apiUrl}action=query&${defaultSearchParams}&${tournamentsListParams}`,
    { headers }
  );

export const getTournamentsData = (pageIds: number[]) =>
  fetch(
    `${apiUrl}action=query&${defaultSearchParams}&${tournamentsDataParams}&pageids=${pageIds.join(
      '%7C'
    )}`,
    { headers }
  );

export const getCountryCodes = async () => {
  const response = await fetch('https://flagcdn.com/en/codes.json');
  const data = await response.json();
  return data;
};
