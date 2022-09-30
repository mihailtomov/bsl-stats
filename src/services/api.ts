import { extractPlayerData } from '../utils/data';

const apiUrl = 'https://liquipedia.net/starcraft/api.php?';
const headers = {
  'User-Agent': `bw-stats app (local development;${process.env.REACT_APP_EMAIL})`,
  'Accept-Encoding': 'gzip',
};

export const getPlayerMatches = async () => {
  const response = await fetch(
    `${apiUrl}origin=*&maxage=604800&action=parse&format=json&page=Portal:Statistics/Player_matches`,
    { headers }
  );

  const {
    parse: {
      text: { '*': htmlString },
    },
  } = await response.json();

  return extractPlayerData(htmlString);
};

export const getCountryCodes = async () => {
  const response = await fetch('https://flagcdn.com/en/codes.json');
  const data = await response.json();
  return data;
};
