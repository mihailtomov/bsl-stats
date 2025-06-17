import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'clsx';

import { getIndividualPlayerStats, getPlayerMatchupData } from '../utils/data';
import { getFormattedDate } from '../utils/utils';
import { DataContext } from '../store/data-context';
import useTournamentStatisticsData from '../hooks/useTournamentStatisticsData';

import PlayerInfo from '../components/PlayerInfo';
import ResponsiveTable from '../components/ResponsiveTable';

import protossSrc from '../assets/protoss.png';
import terranSrc from '../assets/terran.png';
import zergSrc from '../assets/zerg.png';
import randomSrc from '../assets/random.png';

const raceSrc: Record<string, string> = {
  P: protossSrc,
  T: terranSrc,
  Z: zergSrc,
  R: randomSrc,
};

const renderMatchupWinrate = (matchupResult: string) => {
  const [wonStr, lostStr] = matchupResult.split(' - ');
  const won = Number(wonStr);
  const lost = Number(lostStr);
  let matchupWinrate = '(';

  if (won || lost) {
    matchupWinrate += `${(
      (Number(won) / (Number(won) + Number(lost))) *
      100
    ).toFixed(2)}`;
  } else {
    matchupWinrate += (0).toFixed(2);
  }

  matchupWinrate += '%)';

  return matchupWinrate;
};

const PlayerStats = () => {
  const { tournamentStatisticsData } = useTournamentStatisticsData();
  const { tournamentsList } = useContext(DataContext);
  const { tournamentNumber, player } = useParams();

  if (tournamentStatisticsData.length === 0) {
    return null;
  }

  if (
    !tournamentStatisticsData.some(
      (tourData) => tourData.nickname.toLowerCase() === player?.toLowerCase()
    )
  ) {
    return (
      <p className="mt-4">
        Player with nickname <b>{player}</b> did not participate in BSL{' '}
        {tournamentNumber}. Click on a tournament number above to view the list
        with participating players.
      </p>
    );
  }

  const playerNickname = tournamentStatisticsData.find(
    (tourData) => tourData.nickname.toLowerCase() === player?.toLowerCase()
  )?.nickname;

  const { race, matches, gamesWon, gamesLost, winrate } =
    getIndividualPlayerStats(
      playerNickname as string,
      tournamentStatisticsData
    );
  const { vsProtoss, vsTerran, vsZerg, vsRandom } = getPlayerMatchupData(
    playerNickname as string,
    matches
  );

  return (
    <>
      <h3 className="my-4">{`BSL ${
        tournamentsList.find((tour) => tour.number === Number(tournamentNumber))
          ?.number
      } ${playerNickname} (${race})`}</h3>
      <div className="mb-4 fw-bold">{`${gamesWon} - ${gamesLost} (${winrate}%)`}</div>
      <ResponsiveTable tableClassName="mb-5" hover={false}>
        <thead>
          <tr>
            <th>
              <img src={raceSrc[race]} alt="Player's race icon" /> v{' '}
              <img src={raceSrc['P']} alt="Protoss icon" />
            </th>
            <th>
              <img src={raceSrc[race]} alt="Player's race icon" /> v{' '}
              <img src={raceSrc['T']} alt="Terran icon" />
            </th>
            <th>
              <img src={raceSrc[race]} alt="Player's race icon" /> v{' '}
              <img src={raceSrc['Z']} alt="Zerg icon" />
            </th>
            <th>
              <img src={raceSrc[race]} alt="Player's race icon" /> v{' '}
              <img src={raceSrc['R']} alt="Random icon" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {vsProtoss} {renderMatchupWinrate(vsProtoss)}
            </td>
            <td>
              {vsTerran} {renderMatchupWinrate(vsTerran)}
            </td>
            <td>
              {vsZerg} {renderMatchupWinrate(vsZerg)}
            </td>
            <td>
              {vsRandom} {renderMatchupWinrate(vsRandom)}
            </td>
          </tr>
        </tbody>
      </ResponsiveTable>
      <ResponsiveTable containerClassName="text-start">
        <thead className="table-dark">
          <tr>
            <th>Stage</th>
            <th>Opponent</th>
            <th>Race</th>
            <th>Result</th>
            <th>Map</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {matches.map(({ id, winner, loser, stage, map, datePlayed }) => {
            const isWinner = playerNickname === winner;
            const opponentNickname = isWinner ? loser : winner;
            const { flag: opponentFlag, race: opponentRace } =
              getIndividualPlayerStats(
                opponentNickname,
                tournamentStatisticsData
              );
            const result = isWinner ? 'Win' : 'Loss';

            return (
              <tr key={id} className="text-nowrap">
                <td>{stage}</td>
                <td>
                  <PlayerInfo
                    nickname={opponentNickname}
                    flag={opponentFlag}
                    shouldNavigate
                    tournamentStatisticsData={tournamentStatisticsData}
                  />
                </td>
                <td>
                  <img src={raceSrc[opponentRace]} alt="Opponent race icon" />
                </td>
                <td
                  className={classNames('fw-bold', {
                    'text-success': isWinner,
                    'text-danger': !isWinner,
                  })}
                >
                  {result}
                </td>
                <td>{map ? map : 'N/A'}</td>
                <td>{getFormattedDate(datePlayed)}</td>
              </tr>
            );
          })}
        </tbody>
      </ResponsiveTable>
    </>
  );
};

export default PlayerStats;
