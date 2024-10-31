export interface TournamentsListResponse {
  result: TournamentPageData[];
}

interface TournamentPageData {
  pagename: string;
  pageid: number;
}

export interface TournamentMatchListResponse {
  result: RawMatchData[];
}

interface RawMatchData {
  section: string;
  date: string;
  winner: string;
  match2bracketdata: { sectionheader: string; inheritedheader?: string };
  match2opponents: { score: number; match2players: RawPlayerData[] }[];
  match2games: RawGameData[];
}

export interface TournamentsList {
  number: number;
  pageId: number;
}

export interface RawPlayerData {
  name: string;
  flag: string;
  extradata: {
    faction: string;
  };
}

export interface RawGameData {
  map: string;
  participants: {
    [key: string]: { player: string; faction: string };
  };
  winner: string;
  walkover: string;
  date: string;
}

export interface MatchData {
  stage: string;
  date: string;
  playerOne: PlayerData;
  playerTwo: PlayerData;
  games: RawGameData[];
}

interface PlayerData {
  id: number;
  name: string;
  flag: string;
  race: string;
  score: number;
}

export interface TournamentStatistics {
  nickname: string;
  race: string;
  flag: string;
  matches: MatchResultData[];
  gamesWon: number;
  gamesLost: number;
  winrate: string;
}

export interface MatchResultData {
  id: number;
  firstPlayer: string;
  secondPlayer: string;
  winner: string;
  loser: string;
  winnerRace: string;
  loserRace: string;
  stage: string;
  map: string;
  datePlayed: string;
}
