import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classNames from 'clsx';

import { TournamentStatistics } from '../types/data';
import { DataContext } from '../store/data-context';

interface Props {
  nickname: string;
  flag: string;
  shouldNavigate?: boolean;
  tournamentStatisticsData?: TournamentStatistics[];
}

const noop = () => {};

const PlayerInfo: React.FC<Props> = ({
  tournamentStatisticsData,
  nickname,
  flag,
  shouldNavigate = false,
}) => {
  const navigate = useNavigate();
  const { tournamentNumber } = useParams();
  const { countryCodes } = useContext(DataContext);

  const navigateToPlayerStats = () =>
    navigate(`/bsl/${tournamentNumber}/${nickname}`, {
      state: tournamentStatisticsData,
    });

  return (
    <div
      className={classNames(
        'd-flex justify-content-center align-items-baseline gap-1 hover-pointer',
        { 'hover-underline': shouldNavigate }
      )}
      onClick={shouldNavigate ? navigateToPlayerStats : noop}
    >
      <img
        src={`https://flagcdn.com/16x12/${Object.keys(countryCodes).find(
          (key) => countryCodes[key] === flag
        )}.png`}
        width={16}
        height={12}
      />
      <span>{nickname}</span>
    </div>
  );
};

export default PlayerInfo;
