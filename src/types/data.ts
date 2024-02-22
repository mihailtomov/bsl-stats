export type MatchDataCollection = MatchData[];
export type ResultsDataCollection = ResultsData[];
export type StatsDataCollection = StatsData[];

export interface StatsData {
  nickname: string;
  race: string;
  won: number;
  lost: number;
  winrate: number;
}

export interface ResultsData {
  id: number;
  firstPlayer: string;
  secondPlayer: string;
  winner: string;
  loser: string;
  winnerRace: string;
  loserRace: string;
  map: string;
  datePlayed: string;
}

export interface MatchData {
  players: Player[];
  matches: Match[];
}

export interface Player {
  playerId: string;
  nickname: string;
}

export interface Match {
  mapId: string;
  wasPlayed: boolean;
  datePlayed: string;
  map: string;
  winner: string;
}

export interface TournamentData {
  parse: {
    wikitext: {
      '*': string;
    };
  };
}

export interface TournamentsData {
  query: TournamentsPages;
}

export interface TournamentsPages {
  pages: {
    [key: string]: {
      revisions: [
        {
          slots: {
            main: {
              '*': string;
            };
          };
        }
      ];
    };
  };
}

export interface TournamentsListResponse {
  query: {
    prefixsearch: TournamentPageData[];
  };
}

export interface TournamentPageData {
  title: string;
  pageid: number;
}

export interface TournamentsList {
  number: number;
  pageId: number;
}

export interface IndividualStats {
  vsZerg: string;
  vsTerran: string;
  vsProtoss: string;
}

export type Nullable<T> = T | null;
