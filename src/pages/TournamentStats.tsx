import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { StatsDataCollection } from '../types/data';
import { extractData } from '../utils/data';
import { TournamentsDataContext } from '../store/tournaments-data-context';

let filtered = false;

const TournamentStats = () => {
  const navigate = useNavigate();
  const { tournamentsData, tournamentsList } = useContext(
    TournamentsDataContext
  );
  const [data, setData] = useState<StatsDataCollection>([]);
  const { pageId } = useParams();

  const sortTable = (e: React.BaseSyntheticEvent) => {
    const sortByValue: string = e.target.dataset.field;

    setData((prevData) =>
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

  useEffect(() => {
    if (pageId) {
      const dataString =
        tournamentsData?.pages[pageId].revisions[0].slots.main['*'];
      if (dataString) {
        const { statistics } = extractData(dataString);
        setData(statistics.sort((a, b) => b.winrate - a.winrate));
      }
    }
  }, [pageId, tournamentsData]);

  return (
    <>
      <h2>{`BSL ${
        tournamentsList?.find((tour) => tour.pageId === Number(pageId))?.number
      } player statistics`}</h2>
      <table className="table table-bordered table-hover table-responsive">
        <thead className="table-dark">
          <tr>
            <th
              className="hover-pointer"
              onClick={sortTable}
              data-field="nickname"
            >
              Player
            </th>
            <th className="hover-pointer" onClick={sortTable} data-field="race">
              Race
            </th>
            <th className="hover-pointer" onClick={sortTable} data-field="won">
              Wins
            </th>
            <th className="hover-pointer" onClick={sortTable} data-field="lost">
              Losses
            </th>
            <th
              className="hover-pointer"
              onClick={sortTable}
              data-field="winrate"
            >
              Winrate
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ nickname, race, won, lost, winrate }) => (
            <tr
              className="hover-pointer"
              key={nickname}
              onClick={() => navigate(`/bsl/${pageId}/${nickname}`)}
            >
              <td>{nickname}</td>
              <td>{race}</td>
              <td>{won}</td>
              <td>{lost}</td>
              <td>{winrate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TournamentStats;
