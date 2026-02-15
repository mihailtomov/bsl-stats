import { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { fetchJsonData } from '../api/fetch';
import {
  TournamentStatistics,
  TournamentMatchListResponse
} from '../types/data';
import {
  getSortedTournamentStatisticsFromMatchListResponse,
  getTournamentPageId
} from '../utils/data';
import { DataContext } from '../store/data-context';

const useTournamentStatisticsData = () => {
  const storedTournamentStatisticsData = useLocation().state as
    | TournamentStatistics[]
    | null;
  const [tournamentStatisticsData, setTournamentStatisticsData] = useState<
    TournamentStatistics[]
  >(storedTournamentStatisticsData || []);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const { tournamentsList } = useContext(DataContext);
  const { tournamentNumber } = useParams();

  const fetchData = useCallback(async () => {
    setDataLoading(true);
    const pageId = getTournamentPageId(
      tournamentsList,
      Number(tournamentNumber)
    );
    const tournamentMatchListResponse: TournamentMatchListResponse =
      await fetchJsonData(`/matchlist/${pageId as number}`);
    const sortedTournamentStatistics =
      getSortedTournamentStatisticsFromMatchListResponse(
        tournamentMatchListResponse
      );
    setDataLoading(false);
    setTournamentStatisticsData(sortedTournamentStatistics);
  }, [tournamentNumber, tournamentsList]);

  useEffect(() => {
    if (
      tournamentsList.length > 0 &&
      tournamentsList.some(
        (tour) => tour.number === Number(tournamentNumber)
      ) &&
      !storedTournamentStatisticsData
    ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTournamentStatisticsData([]);
      fetchData();
    }
  }, [
    tournamentNumber,
    tournamentsList,
    storedTournamentStatisticsData,
    setTournamentStatisticsData,
    fetchData
  ]);

  return { tournamentStatisticsData, setTournamentStatisticsData, dataLoading };
};

export default useTournamentStatisticsData;
