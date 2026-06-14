const baseUrl = 'https://bsl-stats-server.onrender.com';

export const fetchJsonData = async (url: string) => {
  const fetchUrl =
    url.startsWith('/') && import.meta.env.PROD ? baseUrl + url : url;
  const response = await fetch(fetchUrl);
  const data = await response.json();

  return data;
};
