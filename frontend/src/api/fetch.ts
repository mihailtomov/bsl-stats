const baseUrl = 'https://bsl-stats-server.onrender.com';

export const fetchJsonData = async (url: string) => {
  const fetchUrl =
    url.startsWith('/') && process.env.NODE_ENV === 'production'
      ? baseUrl + url
      : url;
  const response = await fetch(fetchUrl);
  const data = await response.json();

  return data;
};
