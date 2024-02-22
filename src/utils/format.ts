export const getFormattedDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export const constructQueryParams = (source: object) => {
  return Object.entries(source)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};
