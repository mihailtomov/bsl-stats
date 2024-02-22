import React, { useState, useEffect, createContext } from 'react';

import {
  TournamentsListResponse,
  TournamentsList,
  TournamentsPages,
  TournamentsData,
} from '../types/data';
import { getTournamentsList, getTournamentsData } from '../services/api';
import { extractTournamentsPageData } from '../utils/data';

export const TournamentsDataContext = createContext<{
  tournamentsData?: TournamentsPages;
  tournamentsList?: TournamentsList[];
}>({ tournamentsData: undefined, tournamentsList: undefined });

const TournamentsDataProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [tournamentsList, setTournamentsList] = useState<TournamentsList[]>([]);
  const [tournamentsData, setTournamentsData] = useState<TournamentsPages>();

  const fetchData = async () => {
    const tournamentsListResponse = await getTournamentsList();
    const tournamentsListResponseData: TournamentsListResponse =
      await tournamentsListResponse.json();
    const tournamentsPageData = extractTournamentsPageData(
      tournamentsListResponseData
    );
    setTournamentsList(tournamentsPageData.sort((a, b) => a.number - b.number));

    setTimeout(async () => {
      const tournamentsDataResponse = await getTournamentsData(
        tournamentsPageData.map((data) => data.pageId)
      );
      const tournamentsData: TournamentsData =
        await tournamentsDataResponse.json();
      setTournamentsData(tournamentsData.query);
    }, 2000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TournamentsDataContext.Provider
      value={{ tournamentsData, tournamentsList }}
    >
      {props.children}
    </TournamentsDataContext.Provider>
  );
};

export default TournamentsDataProvider;
