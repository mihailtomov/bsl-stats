import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import {
  extractData,
  getIndividualPlayerStats,
  getPlayerRace,
} from '../utils/data';
import { getFormattedDate } from '../utils/format';
import type { ResultsDataCollection, IndividualStats } from '../types/data';
import { TournamentsDataContext } from '../store/tournaments-data-context';

import protossSrc from '../assets/protoss.png';
import terranSrc from '../assets/terran.png';
import zergSrc from '../assets/zerg.png';
import randomSrc from '../assets/random.png';

const raceSrc: Record<string, string> = {
  Protoss: protossSrc,
  Terran: terranSrc,
  Zerg: zergSrc,
  Random: randomSrc,
};

const PlayerStats = () => {
  const [playerMatchResults, setPlayerMatchResults] =
    useState<ResultsDataCollection>([]);
  const [playerStats, setPlayerStats] = useState<IndividualStats>();
  const { tournamentsData, tournamentsList } = useContext(
    TournamentsDataContext
  );
  const { pageId, player } = useParams();
  const playerRace = getPlayerRace(player as string);

  useEffect(() => {
    if (pageId) {
      const dataString =
        tournamentsData?.pages[pageId].revisions[0].slots.main['*'];
      if (dataString) {
        const { results } = extractData(dataString);
        const playerMatchResults = results.filter(
          (result) =>
            result.firstPlayer === player || result.secondPlayer === player
        );
        const playerStats = getIndividualPlayerStats(
          player as string,
          playerMatchResults
        );
        setPlayerMatchResults(playerMatchResults);
        setPlayerStats(playerStats);
      }
    }
  }, []);

  return (
    <>
      <h3 className="my-4">{`BSL ${
        tournamentsList?.find((tour) => tour.pageId === Number(pageId))?.number
      } ${player}`}</h3>
      <table className="table table-bordered table-responsive mb-5">
        <thead>
          <tr>
            <th>
              <img src={raceSrc[playerRace]} alt="Player's race icon" /> v{' '}
              <img src={raceSrc['Protoss']} alt="Protoss icon" />
            </th>
            <th>
              <img src={raceSrc[playerRace]} alt="Player's race icon" /> v{' '}
              <img src={raceSrc['Terran']} alt="Terran icon" />
            </th>
            <th>
              <img src={raceSrc[playerRace]} alt="Player's race icon" /> v{' '}
              <img src={raceSrc['Zerg']} alt="Zerg icon" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{playerStats?.vsProtoss}</td>
            <td>{playerStats?.vsTerran}</td>
            <td>{playerStats?.vsZerg}</td>
          </tr>
        </tbody>
      </table>
      <table className="table table-bordered table-hover table-responsive">
        <thead className="table-dark">
          <tr>
            <th>Date</th>
            <th>Map</th>
            <th>Opponent</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {playerMatchResults
            .sort((a, b) => +new Date(b.datePlayed) - +new Date(a.datePlayed))
            .map(({ id, winner, loser, map, datePlayed }) => {
              const isWinner = player === winner;
              const opponent = isWinner ? loser : winner;
              const result = isWinner ? 'Win' : 'Loss';
              const resultClass = `text-${
                isWinner ? 'success' : 'danger'
              } fw-bold`;
              const date = datePlayed.trim();

              return (
                <tr key={id}>
                  <td>{date !== 'Unknown' ? getFormattedDate(date) : date}</td>
                  <td>{map}</td>
                  <td>{opponent}</td>
                  <td className={resultClass}>{result}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default PlayerStats;
