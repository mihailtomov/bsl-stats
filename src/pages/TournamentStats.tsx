import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { DataContext } from '../store/data-context';
import useTournamentStatisticsData from '../hooks/useTournamentStatisticsData';

import PlayerInfo from '../components/PlayerInfo';
import ResponsiveTable from '../components/ResponsiveTable';

let filtered = false;

const TABLE_HEADINGS_CONFIG = [
  { fieldLabel: 'nickname', textLabel: 'Player' },
  { fieldLabel: 'race', textLabel: 'Race' },
  { fieldLabel: 'gamesWon', textLabel: 'Wins' },
  { fieldLabel: 'gamesLost', textLabel: 'Losses' },
  { fieldLabel: 'winrate', textLabel: 'Winrate' },
];

const TournamentStats = () => {
  const navigate = useNavigate();
  const { tournamentsList } = useContext(DataContext);
  const { tournamentNumber } = useParams();
  const { tournamentStatisticsData, setTournamentStatisticsData, dataLoading } =
    useTournamentStatisticsData();

  const sortTable = (e: React.BaseSyntheticEvent) => {
    const sortByValue: string = e.target.dataset.field;

    setTournamentStatisticsData((prevData) =>
      [...prevData].sort((a, b) => {
        const curr = (a as any)[sortByValue];
        const next = (b as any)[sortByValue];

        if (typeof curr === 'string' && typeof next === 'string') {
          if (!filtered) {
            return curr.localeCompare(next);
          } else {
            return next.localeCompare(curr);
          }
        } else {
          if (!filtered) {
            return Number(next) - Number(curr);
          } else {
            return Number(curr) - Number(next);
          }
        }
      })
    );

    filtered = !filtered;
  };

  if (
    !tournamentsList.some((tour) => tour.number === Number(tournamentNumber))
  ) {
    return (
      <p className="mt-4">
        Tournament number doesn't exist yet. Try a different one from the links
        above.
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
                  data-field={fieldLabel}
                >
                  {textLabel}
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
                      state: tournamentStatisticsData,
                    })
                  }
                >
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
        <p>No match data available.</p>
      )}
    </>
  );
};

export default TournamentStats;
