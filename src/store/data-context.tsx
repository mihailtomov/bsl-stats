import React, { useState, useEffect, createContext } from 'react';

import { TournamentsListResponse, TournamentsList } from '../types/data';
import { fetchJsonData } from '../api/fetch';
import { extractProleagueTournaments } from '../utils/data';

type CountryCodes = Record<string, string>;

interface DataContext {
  tournamentsList: TournamentsList[];
  countryCodes: CountryCodes;
  fetchDataError: boolean;
}

const defaultState = {
  tournamentsList: [],
  countryCodes: {},
  fetchDataError: false,
};

export const DataContext = createContext<DataContext>(defaultState);

const DataProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [tournamentsList, setTournamentsList] = useState<TournamentsList[]>([]);
  const [countryCodes, setCountryCodes] = useState<CountryCodes>({});
  const [fetchDataError, setFetchDataError] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const tournamentsData: TournamentsListResponse = await fetchJsonData(
        '/tournaments'
      );
      const countryCodes: CountryCodes = await fetchJsonData(
        'https://flagcdn.com/en/codes.json'
      );
      const proleagueTournaments = extractProleagueTournaments(tournamentsData);
      const sortedProleagueTournaments = proleagueTournaments.sort(
        (a, b) => a.number - b.number
      );
      setTournamentsList(sortedProleagueTournaments);
      setCountryCodes(countryCodes);
    } catch (error) {
      setFetchDataError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{ tournamentsList, countryCodes, fetchDataError }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
