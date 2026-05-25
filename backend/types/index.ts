// Fetched match data from api
interface Game {
  map: string;
  match2gameid: number;
  winner: string;
  walkover: string;
}

interface Opponent {
  id: number;
  name: string;
  score: number;
  match2players: [
    {
      id: number;
      name: string;
      flag: string;
      extradata: {
        faction: string;
      };
    },
  ];
}

interface Match {
  match2id: string;
  winner: string;
  walkover: string;
  section: string;
  date: string;
  match2bracketdata: {
    type: string;
    title: string;
    next: string;
    matchIndex: number;
    bracketindex: number;
    sectionheader: string;
  };
  match2opponents: Opponent[];
  match2games: Game[];
}

export interface MatchDataResponse {
  result: Match[];
}

// Transformed match data from api
interface Participant {
  playerId: number;
  playerName: string;
  score: number;
  flag: string;
  race: string;
}

type TransformedGame = Pick<Game, 'map' | 'walkover'> & {
  gameNumber: number;
  winnerId: number;
};

export interface TransformedMatchData {
  matchId: string;
  winnerId: number;
  walkover: string;
  stage: string;
  date: string;
  participants: Participant[];
  games: TransformedGame[];
}
