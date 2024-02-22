import type {
  TournamentsListResponse,
  MatchDataCollection,
  MatchData,
  Match,
  ResultsDataCollection,
  StatsDataCollection,
} from '../types/data';
import playersList from '../data/players.json';

const GROUP_STAGE_REGEX = /group start.*(Playoffs|group end)}}/s;
const MATCH_SPLIT_REGEX = /{{Match\n|{{Match\|bestof/g;
const MATCH_DATA_REGEX = /(\w+(\d))=({{[^\\\n]+}})/g;
const PROPERTY_VALUES_REGEX = /(\w+)=([\w\s-'`]*)/g;
const MATCH_DATE_REGEX = /[\w ]+\d{1,2},[\w ]+|\d{4}-\d{2}-\d{2}/;
const NICKNAME_REGEX = /{{1v?1?Opponent\|([\w\s-'`.]+)[\|=\w]*}}/;

const formatRecord = (record: { won: number; lost: number }) => {
  return Object.values(record).join(' - ');
};

export const getPlayerRace = (searchedPlayer: string) => {
  return (
    playersList.find((player) => {
      const normalizedSearchedPlayer = searchedPlayer.toLowerCase();
      const normalizedPlayerNickname = player.nickname.toLowerCase();

      return (
        normalizedPlayerNickname === normalizedSearchedPlayer ||
        normalizedSearchedPlayer.includes(normalizedPlayerNickname) ||
        normalizedPlayerNickname.includes(normalizedSearchedPlayer)
      );
    })?.race || '?'
  );
};

export const extractData = (dataString: string) => {
  const groupStageStringArray = dataString
    .match(GROUP_STAGE_REGEX)?.[0]
    .split('Box|break');
  const matchesStringArray = dataString.split(MATCH_SPLIT_REGEX);

  const matchDataCollection: MatchDataCollection = matchesStringArray
    .slice(1)
    .map((matchString) => {
      let matchObject: MatchData = { players: [], matches: [] },
        dataMatch;

      while ((dataMatch = MATCH_DATA_REGEX.exec(matchString))) {
        // extract key value pairs for each match in capture groups
        const dataKey = dataMatch[1];
        const dataKeyNumber = dataMatch[2];
        const dataValue = dataMatch[3];

        let valueParamsObject: Record<string, string> = {},
          propsMatch;

        while ((propsMatch = PROPERTY_VALUES_REGEX.exec(dataValue))) {
          valueParamsObject[propsMatch[1]] = propsMatch[2];
        }

        const deriveNickname = (
          valueParamsObject.p1 || dataValue.replace(NICKNAME_REGEX, '$1')
        ).trim();

        if (dataKey.startsWith('opp')) {
          matchObject.players.push({
            playerId: dataKeyNumber,
            nickname: deriveNickname,
          });
        } else {
          const gameWasPlayed =
            valueParamsObject.winner !== 'skip' &&
            valueParamsObject.winner.length > 0;
          let datePlayed;
          const indexOfPlayoffs = matchString.indexOf('Playoffs}}');
          const trimmedMatchString =
            indexOfPlayoffs !== -1
              ? matchString.substring(0, indexOfPlayoffs)
              : matchString;

          groupStageStringArray?.forEach((groupStageString) => {
            if (groupStageString.includes(trimmedMatchString)) {
              datePlayed = groupStageString.match(MATCH_DATE_REGEX)?.[0];
              return;
            }
          });

          if (!datePlayed) {
            datePlayed = matchString.match(MATCH_DATE_REGEX)?.[0] || 'Unknown';
          }

          matchObject.matches.push({
            mapId: dataKeyNumber,
            wasPlayed: gameWasPlayed,
            datePlayed,
            ...valueParamsObject,
          } as Match);
        }
      }

      return matchObject;
    });

  const getParticipants = (data: MatchDataCollection) => {
    let participantsList: string[] = [];

    data.forEach((matchData) => {
      const playersArray = matchData.players;

      playersArray.forEach((player) => {
        const { nickname } = player;

        if (!participantsList.some((participant) => participant === nickname)) {
          participantsList.push(nickname);
        }
      });
    });

    return participantsList;
  };

  const getResults = (data: MatchDataCollection) => {
    const results: ResultsDataCollection = [];
    let id = 1;

    data.forEach((matchData) => {
      const { players, matches } = matchData;
      const [playerOne, playerTwo] = players;
      const firstPlayerNickname = playerOne.nickname;
      const secondPlayerNickname = playerTwo.nickname;
      const firstPlayerRace = getPlayerRace(firstPlayerNickname);
      const secondPlayerRace = getPlayerRace(secondPlayerNickname);

      const playedMatches = matches.filter((match) => match.wasPlayed);

      playedMatches.forEach((match) => {
        const winner =
          match.winner === playerOne.playerId
            ? firstPlayerNickname
            : secondPlayerNickname;
        const loser =
          winner === firstPlayerNickname
            ? secondPlayerNickname
            : firstPlayerNickname;

        let winnerRace, loserRace;

        if (winner === firstPlayerNickname) {
          winnerRace = firstPlayerRace;
          loserRace = secondPlayerRace;
        } else {
          winnerRace = secondPlayerRace;
          loserRace = firstPlayerRace;
        }

        results.push({
          id,
          firstPlayer: firstPlayerNickname,
          secondPlayer: secondPlayerNickname,
          winner,
          loser,
          winnerRace,
          loserRace,
          map: match.map || 'Unknown',
          datePlayed: match.datePlayed,
        });

        id++;
      });
    });

    return results;
  };

  const getStatistics: (
    participants: string[],
    resultsData: ResultsDataCollection
  ) => StatsDataCollection = (participants, resultsData) => {
    const statistics: StatsDataCollection = [];

    participants.forEach((participant) => {
      const matchesWon = resultsData.filter(
        (data) => data.winner === participant
      ).length;
      const matchesLost = resultsData.filter(
        (data) => data.loser === participant
      ).length;
      const totalPlayed = matchesWon + matchesLost;
      const winrate = +((matchesWon / totalPlayed) * 100).toFixed(2);
      const race = getPlayerRace(participant);

      if (matchesWon > 0 || matchesLost > 0) {
        statistics.push({
          nickname: participant,
          race,
          won: matchesWon,
          lost: matchesLost,
          winrate,
        });
      }
    });

    return statistics;
  };

  const participants = getParticipants(matchDataCollection);
  const results = getResults(matchDataCollection);
  const statistics = getStatistics(participants, results);

  return {
    participants,
    results,
    statistics,
  };
};

export const extractTournamentsPageData = (data: TournamentsListResponse) => {
  const tournamentData = data.query.prefixsearch;
  const tournamentsPattern = /StarLeague\/\d{1,2}$/;
  const tournamentsPageData = tournamentData
    .filter((data) => data.title.match(tournamentsPattern))
    .map((data) => ({
      number: Number(data.title.split('/')[1]),
      pageId: data.pageid,
    }));

  return tournamentsPageData;
};

export const getIndividualPlayerStats = (
  player: string,
  playerResults: ResultsDataCollection
) => {
  let vsZergRecord = { won: 0, lost: 0 };
  let vsTerranRecord = { won: 0, lost: 0 };
  let vsProtossRecord = { won: 0, lost: 0 };

  playerResults.forEach((result) => {
    const { winner, winnerRace, loserRace } = result;

    if (player === winner) {
      switch (loserRace) {
        case 'Zerg':
          vsZergRecord.won++;
          break;
        case 'Terran':
          vsTerranRecord.won++;
          break;
        case 'Protoss':
          vsProtossRecord.won++;
          break;
      }
    } else {
      switch (winnerRace) {
        case 'Zerg':
          vsZergRecord.lost++;
          break;
        case 'Terran':
          vsTerranRecord.lost++;
          break;
        case 'Protoss':
          vsProtossRecord.lost++;
          break;
      }
    }
  });

  return {
    vsZerg: formatRecord(vsZergRecord),
    vsTerran: formatRecord(vsTerranRecord),
    vsProtoss: formatRecord(vsProtossRecord),
  };
};
