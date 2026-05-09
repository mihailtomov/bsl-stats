/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'clsx';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import PlayerInfo from '../components/PlayerInfo';
import ResponsiveTable from '../components/ResponsiveTable';
import useTournamentStatisticsData from '../hooks/useTournamentStatisticsData';
import { DataContext } from '../store/data-context';

const TABLE_HEADINGS_CONFIG = [
  { fieldLabel: 'nickname', textLabel: 'Player' },
  { fieldLabel: 'race', textLabel: 'Race' },
  { fieldLabel: 'gamesWon', textLabel: 'Wins' },
  { fieldLabel: 'gamesLost', textLabel: 'Losses' },
  { fieldLabel: 'winrate', textLabel: 'Winrate' }
];

type SortState = { isSortedDescending: boolean; isUnsorted: boolean };
type HeadingsState = Record<string, SortState>;

const initialHeadingsState = {
  nickname: { isSortedDescending: false, isUnsorted: true },
  race: { isSortedDescending: false, isUnsorted: true },
  gamesWon: { isSortedDescending: false, isUnsorted: true },
  gamesLost: { isSortedDescending: false, isUnsorted: true },
  winrate: { isSortedDescending: true, isUnsorted: false }
};

const getFontAwesomeArrowIcon = ({
  isSortedDescending,
  isUnsorted
}: SortState) => {
  switch (true) {
    case isSortedDescending && !isUnsorted:
      return 'fa-arrow-down';
    case !isSortedDescending && !isUnsorted:
      return 'fa-arrow-up';
    default:
      return 'fa-arrows-up-down';
  }
};

const TournamentStats = () => {
  const navigate = useNavigate();
  const { tournamentsList } = useContext(DataContext);
  const { tournamentNumber } = useParams();
  const { tournamentStatisticsData, setTournamentStatisticsData, dataLoading } =
    useTournamentStatisticsData();
  const { t } = useTranslation();
  const [headingsState, setHeadingsState] =
    useState<HeadingsState>(initialHeadingsState);

  const sortTable = (e: React.BaseSyntheticEvent) => {
    const sortByValue: string = e.currentTarget.dataset.field;
    const isColumnDescending = headingsState[sortByValue].isSortedDescending;

    setTournamentStatisticsData((prevData) =>
      [...prevData].sort((a, b) => {
        const curr = (a as any)[sortByValue];
        const next = (b as any)[sortByValue];

        if (typeof curr === 'string' && typeof next === 'string') {
          return isColumnDescending
            ? curr.localeCompare(next)
            : next.localeCompare(curr);
        } else {
          return isColumnDescending
            ? Number(curr) - Number(next)
            : Number(next) - Number(curr);
        }
      })
    );
    setHeadingsState((prevHeadingsState) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [sortByValue]: omitted, ...rest } = prevHeadingsState;
      const sortableDataExcludingCurrentField = {} as HeadingsState;
      for (const key in rest) {
        sortableDataExcludingCurrentField[key] = {
          isSortedDescending: false,
          isUnsorted: true
        };
      }
      return {
        ...sortableDataExcludingCurrentField,
        [sortByValue]: {
          isSortedDescending: !isColumnDescending,
          isUnsorted: false
        }
      };
    });
  };

  useEffect(() => {
    setHeadingsState(initialHeadingsState);
  }, [tournamentNumber]);

  if (
    !tournamentsList.some((tour) => tour.number === Number(tournamentNumber))
  ) {
    return (
      <p className="mt-4">
        {t('page.tournamentStats.error.invalidTournamentNumber')}
      </p>
    );
  }

  return (
    <>
      {dataLoading && <p>Data loading..</p>}
      {tournamentStatisticsData.length > 0 && (
        <ResponsiveTable containerClassName="text-start mt-3">
          <thead className="table-dark">
            <tr>
              {TABLE_HEADINGS_CONFIG.map(({ fieldLabel, textLabel }) => (
                <th
                  key={fieldLabel}
                  className="hover-pointer"
                  onClick={sortTable}
                  data-field={fieldLabel}>
                  {textLabel}
                  <div className="d-inline ms-1">
                    <i
                      className={classNames(
                        'fa-solid fa-sm',
                        getFontAwesomeArrowIcon(headingsState[fieldLabel])
                      )}></i>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tournamentStatisticsData.map(
              ({ nickname, race, flag, gamesWon, gamesLost, winrate }) => (
                <tr
                  className="hover-pointer"
                  key={nickname}
                  onClick={() =>
                    navigate(`/bsl/${tournamentNumber}/${nickname}`, {
                      state: tournamentStatisticsData
                    })
                  }>
                  <td>
                    <PlayerInfo {...{ nickname, flag }} />
                  </td>
                  <td>{race}</td>
                  <td>{gamesWon}</td>
                  <td>{gamesLost}</td>
                  <td>{winrate}%</td>
                </tr>
              )
            )}
          </tbody>
        </ResponsiveTable>
      )}
      {tournamentStatisticsData.length === 0 && !dataLoading && (
        <p>{t('page.tournamentStats.error.emptyMatchData')}</p>
      )}
    </>
  );
};

export default TournamentStats;
