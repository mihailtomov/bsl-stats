import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { fetchJsonData } from '../api/fetch';
import {
  TournamentStatistics,
  TournamentMatchListResponse,
} from '../types/data';
import {
  getSortedTournamentStatisticsFromMatchListResponse,
  getTournamentPageId,
} from '../utils/data';
import { DataContext } from '../store/data-context';

const useTournamentStatisticsData = () => {
  const [tournamentStatisticsData, setTournamentStatisticsData] = useState<
    TournamentStatistics[]
  >(useLocation().state || []);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const { tournamentsList } = useContext(DataContext);
  const { tournamentNumber } = useParams();

  const fetchData = async () => {
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
  };

  useEffect(() => {
    if (tournamentsList.length > 0) {
      setTournamentStatisticsData([]);
      fetchData();
    }
  }, [tournamentNumber, tournamentsList]);

  return { tournamentStatisticsData, setTournamentStatisticsData, dataLoading };
};

export default useTournamentStatisticsData;
