import type {
  TournamentsList,
  TournamentsListResponse,
  TournamentMatchListResponse,
  MatchData,
  RawPlayerData,
  RawGameData,
  TournamentStatistics,
  MatchResultData,
} from '../types/data';

let identifier = 1;

const extractPlayerData = ({
  name,
  flag,
  extradata: { faction },
}: RawPlayerData) => ({ name, flag, race: faction });

const extractGameData = ({
  map,
  participants,
  winner,
  walkover,
  date,
}: RawGameData) => ({
  map,
  participants,
  winner,
  walkover,
  date,
});

const getMatchResults = (games: RawGameData[], stage: string) => {
  const matchResults = games
    .reverse()
    .map(({ map, participants, winner: winnerId, date }) => {
      const { player: firstPlayer, faction: firstPlayerRace } =
        participants['1_1'];
      const { player: secondPlayer, faction: secondPlayerRace } =
        participants['2_1'];
      let winner, loser, winnerRace, loserRace;

      if (Number(winnerId) === 1) {
        winner = firstPlayer;
        loser = secondPlayer;
        winnerRace = firstPlayerRace.toUpperCase();
        loserRace = secondPlayerRace.toUpperCase();
      } else {
        winner = secondPlayer;
        loser = firstPlayer;
        winnerRace = secondPlayerRace.toUpperCase();
        loserRace = firstPlayerRace.toUpperCase();
      }

      return {
        id: identifier++,
        firstPlayer,
        secondPlayer,
        winner,
        loser,
        winnerRace,
        loserRace,
        stage,
        map,
        datePlayed: date,
      };
    });

  return matchResults as MatchResultData[];
};

const formatRecord = (record: { won: number; lost: number }) => {
  return Object.values(record).join(' - ');
};

/** Extract the BSL proleague series tournaments fetched via the /v3/tournament endpoint. */
export const extractProleagueTournaments = (data: TournamentsListResponse) => {
  const tournamentsList = data.result;
  const tournamentsPattern = /StarLeague\/\d{1,2}$/;
  const tournamentsPageData = tournamentsList
    .filter((pageData) => pageData.pagename.match(tournamentsPattern))
    .map(({ pageid, pagename }) => ({
      number: Number(pagename.split('/')[1]),
      pageId: pageid,
    }));

  return tournamentsPageData;
};

/** Extract the match data of the queried tournament fetched via the /v3/match endpoint. */
export const extractMatchData = (data: TournamentMatchListResponse) => {
  let stage, date, playerOne, playerTwo, games;

  const matchData = data.result
    .filter((match) => match.winner)
    .map((match) => {
      const inheritedheaderWithData =
        match.match2bracketdata?.inheritedheader?.includes('(Bo')
          ? match.match2bracketdata?.inheritedheader
          : '';
      stage =
        inheritedheaderWithData ||
        match.match2bracketdata?.sectionheader ||
        match?.section;
      date = match.date;
      const [playerOneData, playerTwoData] = match.match2opponents;
      playerOne = extractPlayerData(playerOneData.match2players[0]);
      playerTwo = extractPlayerData(playerTwoData.match2players[0]);
      games = match.match2games
        .map((gameData) => extractGameData(gameData))
        .filter((gameData) => gameData.winner.length === 1);

      return { stage, date, playerOne, playerTwo, games };
    });

  return matchData as MatchData[];
};

/** Construct tournament statistics for participating players from the extracted match data. */
export const getTournamentStatistics = (matchData: MatchData[]) => {
  const tournamentStatistics = matchData.reduce((result, currentEntry) => {
    const {
      playerOne: {
        name: firstPlayerName,
        race: firstPlayerRace,
        flag: firstPlayerFlag,
      },
    } = currentEntry;
    const {
      playerTwo: {
        name: secondPlayerName,
        race: secondPlayerRace,
        flag: secondPlayerFlag,
      },
    } = currentEntry;
    const { games, stage } = currentEntry;

    if (!result.some(({ nickname }) => nickname === firstPlayerName)) {
      result.push({
        nickname: firstPlayerName,
        race: firstPlayerRace.toUpperCase(),
        flag: firstPlayerFlag,
        matches: [],
        gamesWon: 0,
        gamesLost: 0,
        get winrate() {
          let calculatedWinrate;

          if (this.gamesWon === 0 && this.gamesLost === 0) {
            calculatedWinrate = 0;
          } else {
            calculatedWinrate =
              (this.gamesWon / (this.gamesWon + this.gamesLost)) * 100;
          }

          return calculatedWinrate.toFixed(2);
        },
      });
    }

    if (!result.some(({ nickname }) => nickname === secondPlayerName)) {
      result.push({
        nickname: secondPlayerName,
        race: secondPlayerRace.toUpperCase(),
        flag: secondPlayerFlag,
        matches: [],
        gamesWon: 0,
        gamesLost: 0,
        get winrate() {
          let calculatedWinrate;

          if (this.gamesWon === 0 && this.gamesLost === 0) {
            calculatedWinrate = 0;
          } else {
            calculatedWinrate =
              (this.gamesWon / (this.gamesWon + this.gamesLost)) * 100;
          }

          return calculatedWinrate.toFixed(2);
        },
      });
    }

    const firstPlayerData = result.find(
      (data) => data.nickname === firstPlayerName
    ) as TournamentStatistics;
    const secondPlayerData = result.find(
      (data) => data.nickname === secondPlayerName
    ) as TournamentStatistics;

    const matchResults = getMatchResults(games, stage);

    firstPlayerData.gamesWon += matchResults.filter(
      (result) => result.winner === firstPlayerName
    ).length;
    firstPlayerData.gamesLost += matchResults.filter(
      (result) => result.loser === firstPlayerName
    ).length;
    secondPlayerData.gamesWon += matchResults.filter(
      (result) => result.winner === secondPlayerName
    ).length;
    secondPlayerData.gamesLost += matchResults.filter(
      (result) => result.loser === secondPlayerName
    ).length;

    firstPlayerData.matches = firstPlayerData.matches.concat(matchResults);
    secondPlayerData.matches = secondPlayerData.matches.concat(matchResults);

    return result;
  }, [] as TournamentStatistics[]);

  return tournamentStatistics;
};

/** Get the tournament matchlist response data in the form of tournament statistics sorted by winrate. */
export const getSortedTournamentStatisticsFromMatchListResponse = (
  tournamentMatchListResponse: TournamentMatchListResponse
) => {
  const tournamentStatistics = getTournamentStatistics(
    extractMatchData(tournamentMatchListResponse)
  );
  const sortedTournamentStatistics = tournamentStatistics.sort(
    (a, b) => Number(b.winrate) - Number(a.winrate)
  );

  return sortedTournamentStatistics;
};

/** Get constructed tournament statistics for a specified player. */
export const getIndividualPlayerStats = (
  nickname: string,
  data: TournamentStatistics[]
) => {
  const result = data.find((entry) => entry.nickname === nickname);

  return result as TournamentStatistics;
};

/** Get per matchup record for a specified player. */
export const getPlayerMatchupData = (
  nickname: string,
  matches: MatchResultData[]
) => {
  let vsZergRecord = { won: 0, lost: 0 };
  let vsTerranRecord = { won: 0, lost: 0 };
  let vsProtossRecord = { won: 0, lost: 0 };
  let vsRandomRecord = { won: 0, lost: 0 };

  matches.forEach((result) => {
    const { winner, winnerRace, loserRace } = result;

    if (nickname === winner) {
      switch (loserRace) {
        case 'Z':
          vsZergRecord.won++;
          break;
        case 'T':
          vsTerranRecord.won++;
          break;
        case 'P':
          vsProtossRecord.won++;
          break;
        case 'R':
          vsRandomRecord.won++;
          break;
      }
    } else {
      switch (winnerRace) {
        case 'Z':
          vsZergRecord.lost++;
          break;
        case 'T':
          vsTerranRecord.lost++;
          break;
        case 'P':
          vsProtossRecord.lost++;
          break;
        case 'R':
          vsRandomRecord.lost++;
          break;
      }
    }
  });

  return {
    vsZerg: formatRecord(vsZergRecord),
    vsTerran: formatRecord(vsTerranRecord),
    vsProtoss: formatRecord(vsProtossRecord),
    vsRandom: formatRecord(vsRandomRecord),
  };
};

/** Get the page id of a specified tournament by the tournament number. */
export const getTournamentPageId = (
  tournamentsList: TournamentsList[],
  tournamentNumber: number
) =>
  tournamentsList.find((tour) => tour.number === tournamentNumber)
    ?.pageId as number;
