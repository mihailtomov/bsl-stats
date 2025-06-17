export const getFormattedDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export const getAYearFromNowDate = () => {
  const now = new Date();
  const aYearFromNow = now.setFullYear(now.getFullYear() + 1);
  return new Date(aYearFromNow).toUTCString();
};

export const getCookieByName = (cookieName: string) => {
  const cookiesList = document.cookie.split(';').map((cookie) => {
    const match = cookie.trim().match(/(.+)=(.*)/);
    return { name: match?.[1], value: match?.[2] };
  });

  return cookiesList.find((cookie) => cookie.name === cookieName);
};
