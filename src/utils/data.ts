import type { PlayerData, CountryCodes } from '../types/data';

const select = {
  dataRows: (template: HTMLTemplateElement) =>
    template.content.querySelectorAll('.wikitable tbody tr'),
  dataAnchor: (tableDataElement: HTMLElement) =>
    tableDataElement.querySelector('a'),
};

export const extractPlayerData = (htmlString: string) => {
  const template = document.createElement('template');
  template.innerHTML = htmlString.replace(/\n/g, '');

  const tableData = Array.from(
    select.dataRows(template) as NodeListOf<Element>
  ).slice(1);

  const data = tableData.reduce(
    (result: PlayerData[], tableRowElement, tableRowIndex) => {
      let id, country, race, nickname, total, won, lost, winrate;

      (Array.from(tableRowElement?.children) as HTMLElement[]).forEach(
        (tableDataElement, index) => {
          const text = tableDataElement?.innerText.replace(/,/g, '');
          const titleData = select
            .dataAnchor(tableDataElement)
            ?.getAttribute('title');

          switch (index) {
            case 0:
              id = ++tableRowIndex;
              break;
            case 1:
              country = titleData;
              break;
            case 2:
              race = titleData;
              break;
            case 3:
              nickname = titleData;
              break;
            case 4:
              total = parseInt(text);
              break;
            case 5:
              won = parseInt(text);
              break;
            case 6:
              lost = parseInt(text);
              break;
            default:
              winrate = text;
              break;
          }
        }
      );

      result.push({ id, nickname, race, country, won, lost, total, winrate });
      return result;
    },
    []
  );

  return data;
};

export const invert = (obj: CountryCodes) =>
  Object.entries(obj).reduce((acc: CountryCodes, [key, value]) => {
    acc[value] = key;
    return acc;
  }, {});
